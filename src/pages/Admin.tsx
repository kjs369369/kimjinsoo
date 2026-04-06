import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, Download, LogOut, Users, MessageSquare, BarChart3, Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course: string;
  message: string | null;
  status: string;
  created_at: string;
};

type ChatMessage = {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"dashboard" | "applications" | "chats" | "settings">("dashboard");
  const [applications, setApplications] = useState<Application[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Password settings
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const login = async () => {
    setLoading(true);
    try {
      const resp = await supabase.functions.invoke("admin", {
        body: { action: "verify_password", password },
      });
      if (resp.data?.valid) {
        setAuthenticated(true);
        toast({ title: "로그인 성공" });
      } else {
        toast({ title: "비밀번호가 틀렸습니다.", variant: "destructive" });
      }
    } catch {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const [appsRes, chatsRes] = await Promise.all([
      supabase.from("applications").select("*").order("created_at", { ascending: false }),
      supabase.from("chat_messages").select("*").order("created_at", { ascending: false }).limit(200),
    ]);
    if (appsRes.data) setApplications(appsRes.data as Application[]);
    if (chatsRes.data) setChatMessages(chatsRes.data as ChatMessage[]);
  };

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.functions.invoke("admin", {
      body: { action: "update_status", applicationId: id, status },
    });
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast({ title: "상태가 업데이트되었습니다." });
  };

  const changePassword = async () => {
    if (newPw !== confirmPw) {
      toast({ title: "새 비밀번호가 일치하지 않습니다.", variant: "destructive" });
      return;
    }
    if (!newPw.trim()) {
      toast({ title: "새 비밀번호를 입력해주세요.", variant: "destructive" });
      return;
    }
    const resp = await supabase.functions.invoke("admin", {
      body: { action: "change_password", password: currentPw, newPassword: newPw },
    });
    if (resp.data?.success) {
      toast({ title: "비밀번호가 변경되었습니다." });
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } else {
      toast({ title: resp.data?.error || "비밀번호 변경 실패", variant: "destructive" });
    }
  };

  const downloadCSV = () => {
    const headers = ["이름", "이메일", "전화번호", "관심과정", "문의사항", "상태", "신청일"];
    const rows = applications.map((a) => [
      a.name, a.email, a.phone || "", a.course, a.message || "", 
      a.status === "pending" ? "대기" : a.status === "contacted" ? "연락완료" : a.status,
      new Date(a.created_at).toLocaleDateString("ko-KR"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `신청자목록_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-card rounded-2xl p-8 border border-border shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full gradient-navy flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-gold" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">관리자 로그인</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(); }} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full bg-muted rounded-lg px-4 py-3 text-foreground text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-gold/50"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-gold text-primary py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "확인 중..." : "로그인"}
            </button>
          </form>
          <Link to="/" className="flex items-center gap-1 justify-center mt-4 text-sm text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft size={14} /> 홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const contactedCount = applications.filter((a) => a.status === "contacted").length;
  const uniqueSessions = new Set(chatMessages.map((m) => m.session_id)).size;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">관리자 대시보드</h1>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> 홈
          </Link>
          <button onClick={() => setAuthenticated(false)} className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1">
            <LogOut size={14} /> 로그아웃
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-56 min-h-[calc(100vh-52px)] bg-card border-r border-border p-4 space-y-1 hidden md:block">
          {([
            { id: "dashboard", icon: BarChart3, label: "대시보드" },
            { id: "applications", icon: Users, label: "신청자 관리" },
            { id: "chats", icon: MessageSquare, label: "챗봇 문의" },
            { id: "settings", icon: Settings, label: "설정" },
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                tab === item.id ? "bg-gold/10 text-gold font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-50">
          {([
            { id: "dashboard", icon: BarChart3, label: "대시보드" },
            { id: "applications", icon: Users, label: "신청" },
            { id: "chats", icon: MessageSquare, label: "문의" },
            { id: "settings", icon: Settings, label: "설정" },
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs transition-colors ${
                tab === item.id ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-6 pb-20 md:pb-6">
          {tab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">대시보드</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-5 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">총 신청자</p>
                  <p className="text-3xl font-bold text-foreground">{applications.length}</p>
                </div>
                <div className="bg-card rounded-xl p-5 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">대기 중</p>
                  <p className="text-3xl font-bold text-gold">{pendingCount}</p>
                </div>
                <div className="bg-card rounded-xl p-5 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">챗봇 세션</p>
                  <p className="text-3xl font-bold text-foreground">{uniqueSessions}</p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">최근 신청</h3>
                  <button onClick={downloadCSV} className="text-sm text-gold flex items-center gap-1 hover:underline">
                    <Download size={14} /> CSV 다운로드
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="text-left py-2 px-2">이름</th>
                        <th className="text-left py-2 px-2">과정</th>
                        <th className="text-left py-2 px-2">상태</th>
                        <th className="text-left py-2 px-2">날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.slice(0, 5).map((a) => (
                        <tr key={a.id} className="border-b border-border/50">
                          <td className="py-2 px-2 text-foreground">{a.name}</td>
                          <td className="py-2 px-2 text-muted-foreground">{a.course}</td>
                          <td className="py-2 px-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              a.status === "pending" ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"
                            }`}>
                              {a.status === "pending" ? "대기" : "연락완료"}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-muted-foreground">{new Date(a.created_at).toLocaleDateString("ko-KR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === "applications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">신청자 관리</h2>
                <button onClick={downloadCSV} className="gradient-gold text-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                  <Download size={14} /> CSV 다운로드
                </button>
              </div>
              <div className="space-y-3">
                {applications.map((a) => (
                  <div key={a.id} className="bg-card rounded-xl p-5 border border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{a.name}</p>
                        <p className="text-sm text-muted-foreground">{a.email} {a.phone && `· ${a.phone}`}</p>
                      </div>
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a.id, e.target.value)}
                        className="bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground border-none focus:ring-2 focus:ring-gold/50"
                      >
                        <option value="pending">대기</option>
                        <option value="contacted">연락완료</option>
                        <option value="cancelled">취소</option>
                      </select>
                    </div>
                    <p className="text-sm text-gold font-medium mb-1">{a.course}</p>
                    {a.message && <p className="text-sm text-muted-foreground">{a.message}</p>}
                    <p className="text-xs text-muted-foreground/60 mt-2">{new Date(a.created_at).toLocaleString("ko-KR")}</p>
                  </div>
                ))}
                {applications.length === 0 && <p className="text-center text-muted-foreground py-10">아직 신청이 없습니다.</p>}
              </div>
            </div>
          )}

          {tab === "chats" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">챗봇 문의 내역</h2>
              {(() => {
                const sessions = Array.from(new Set(chatMessages.map((m) => m.session_id)));
                return sessions.map((sid) => {
                  const msgs = chatMessages.filter((m) => m.session_id === sid).sort(
                    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                  );
                  return (
                    <div key={sid} className="bg-card rounded-xl p-5 border border-border">
                      <p className="text-xs text-muted-foreground mb-3">세션: {sid.slice(0, 8)}... · {new Date(msgs[0].created_at).toLocaleString("ko-KR")}</p>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {msgs.map((m) => (
                          <div key={m.id} className={`text-sm ${m.role === "user" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            <span className="text-xs text-gold mr-1">{m.role === "user" ? "👤" : "🤖"}</span>
                            {m.content.slice(0, 200)}{m.content.length > 200 && "..."}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
              {chatMessages.length === 0 && <p className="text-center text-muted-foreground py-10">아직 챗봇 문의가 없습니다.</p>}
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-6 max-w-md">
              <h2 className="text-xl font-bold text-foreground">비밀번호 변경</h2>
              <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">현재 비밀번호</label>
                  <input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">새 비밀번호</label>
                  <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                    className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">새 비밀번호 확인</label>
                  <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                    className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <button onClick={changePassword} className="w-full gradient-gold text-primary py-3 rounded-lg font-semibold">
                  비밀번호 변경
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
