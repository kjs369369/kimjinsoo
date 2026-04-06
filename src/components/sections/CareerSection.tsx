import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const tabs = ["현재 활동", "주요 출강", "자격·인증"];

const currentActivities = [
  { period: "2025~현재", org: "한국AI전문가교육협회", role: "협회장", desc: "총괄, 교육" },
  { period: "2026~현재", org: "GEO마케팅연구원", role: "부원장", desc: "연구, 운영" },
  { period: "2023~현재", org: "AI콘텐츠융합연구소", role: "소장", desc: "운영 총괄" },
  { period: "2023~현재", org: "메이랜드AI비즈랩", role: "대표(CEO)", desc: "운영 총괄" },
  { period: "2023~현재", org: "디지털융합교육원", role: "지도교수/부원장", desc: "AI강사양성교육" },
  { period: "2024~현재", org: "AI영상제작연구소", role: "선임연구원", desc: "연구, 교육" },
  { period: "2023~현재", org: "AI프롬프트연구소", role: "책임연구원", desc: "연구, 교육" },
  { period: "2023~현재", org: "파이낸스투데이", role: "지국장", desc: "운영" },
];

const lectureHistory = [
  "농림축산식품부 AGRI TED U 심사 (생성형AI 활용 미래 농업 콘텐츠 공모전)",
  "SIAFF 서울국제AI영화제 2~4회 심사",
  "한국여성수련원 - 춘천시 7급이하 실무전문가 역량강화교육",
  "화성시 명품 사관학교 CEO강의",
  "세종사이버대학교 인공지능학부 AI교수법 강의",
  "단국대학교 프롬프트 자격과정 / 인덕대 프롬프트 자격과정",
  "부경대학교 인공지능 생성형AI 이론 및 실제",
  "질병관리청 정보화 연구회 생성형 AI강의",
  "서울시 중부교육지원청 교원연수",
  "배재대학교 대학교육혁신원 생성형AI역량강화 부트캠프",
  "숙명여대 미래교육원 AI교육",
  "통일부 정보화 연구회 챗GPT강의",
  "제주산학융합원 제주지역 관광 크리에이터 역량강화교육",
];

const credentials = [
  { date: "2026.03", name: "인공지능(AI) 활용 전문가", issuer: "한국지식콘텐츠협회" },
  { date: "2026", name: "GEO마케팅컨설턴트", issuer: "한국메타버스ESG연구원" },
  { date: "2026.01", name: "AI콘텐츠전문가", issuer: "한국콘텐츠능률협회" },
  { date: "2025.09", name: "Gemini Certified Educator", issuer: "Google for Education" },
  { date: "2025.06", name: "Google 공인 교육 전문가 (레벨1)", issuer: "Google for Education" },
  { date: "2025.03", name: "AI마케팅지도사 1급", issuer: "한국소상공인마케팅협회" },
  { date: "2025.01", name: "AI챗봇강사컨설턴트", issuer: "디지털융합교육원" },
  { date: "2024.06", name: "Prompt Engineer", issuer: "한국미래교육연구소" },
  { date: "2024.02", name: "인공지능(AI) 활용 마스터 1급", issuer: "뉴미디어교육연구소" },
  { date: "2023.10", name: "인공지능콘텐츠강사 1급", issuer: "디지털융합교육원" },
  { date: "2025", name: "Certificate of completion: Claude 101", issuer: "Anthropic" },
];

export default function CareerSection() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="career" className="py-20 md:py-24 bg-background">
      <div ref={ref} className={`max-w-[1200px] mx-auto px-5 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          경력 & <span className="text-gold">자격</span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === i
                  ? "gradient-navy text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-opacity duration-300">
          {activeTab === 0 && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {currentActivities.map((item) => (
                <div key={item.org} className="flex gap-4 items-start border-l-2 border-gold pl-5 py-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap min-w-[80px]">{item.period}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.org}</p>
                    <p className="text-muted-foreground text-xs">{item.role} · {item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {lectureHistory.map((item) => (
                <div key={item} className="bg-card border border-border rounded-lg p-4 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {credentials.map((item) => (
                <div key={item.name} className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{item.name}</p>
                  <p className="text-muted-foreground text-xs">{item.issuer} · {item.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
