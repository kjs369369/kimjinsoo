import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const courses = [
  "GEO 전략 컨설팅",
  "AI활용 코칭·큐레이션",
  "AI 교육·강사 양성",
  "AI 업무 자동화",
  "AI 아트 & 전시",
  "기타",
];

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.course) {
      toast({ title: "필수 항목을 입력해주세요.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("applications").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        course: form.course,
        message: form.message.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({ title: "신청 중 오류가 발생했습니다.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply" className="py-20 md:py-24 bg-surface">
        <div className="max-w-lg mx-auto px-5 text-center">
          <div className="bg-card rounded-2xl p-10 border border-border shadow-lg">
            <CheckCircle size={56} className="text-gold mx-auto mb-5" />
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">신청이 완료되었습니다!</h3>
            <p className="text-muted-foreground leading-relaxed">
              감사합니다. 과정이 오픈되면 입력하신 연락처로 안내드리겠습니다.
              <br /><br />
              <span className="text-sm text-muted-foreground/70">
                ※ 빠른 시간 내의 개별 답변은 어려울 수 있습니다. 양해 부탁드립니다.
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-20 md:py-24 bg-surface">
      <div className="max-w-lg mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            과정 <span className="text-gold">신청하기</span>
          </h2>
          <p className="text-muted-foreground">관심 있는 과정을 선택하고 신청해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border shadow-lg space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">이름 *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="홍길동"
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">이메일 *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="email@example.com"
              maxLength={255}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">전화번호</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="010-0000-0000"
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">관심 과정 *</label>
            <select
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              required
            >
              <option value="">선택해주세요</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">문의 사항</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[100px] resize-y"
              placeholder="추가 문의 사항이 있으시면 입력해주세요"
              maxLength={1000}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-gold text-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? "신청 중..." : "신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}
