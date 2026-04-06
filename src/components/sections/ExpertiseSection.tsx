import { Search, GraduationCap, PenTool, Cog, Palette, MessageCircle, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

const cards = [
  {
    icon: Search,
    title: "GEO 전략 컨설팅",
    desc: "Generative Engine Optimization — 생성형 AI(ChatGPT, Gemini 등)가 인용하는 콘텐츠 전략 설계 및 실행",
    comingSoon: true,
    linkLabel: "AICLab 연구소",
  },
  {
    icon: MessageCircle,
    title: "AI활용 코칭 · 큐레이션",
    desc: "AI를 활용한 맞춤형 코칭과 큐레이션 서비스. 개인과 기업의 AI 역량 강화를 위한 전문 컨설팅",
    link: "https://magent-may.vercel.app/",
  },
  {
    icon: GraduationCap,
    title: "AI 교육 · 강사 양성",
    desc: "비전공자 맞춤형 AI 리터러시 교육, 프롬프트 엔지니어링, GPTs 커스텀 챗봇 과정 운영",
    link: "https://www.aiclab.kr/",
  },
  {
    icon: PenTool,
    title: "콘텐츠 크리에이터",
    desc: "저서 25권+, 블로그, 숏폼 영상, 강의 슬라이드, GEO 최적화 콘텐츠 제작. 유튜브 메이TV 운영",
  },
  {
    icon: Cog,
    title: "AI 업무 자동화",
    desc: "n8n 워크플로우, GPTs 맞춤형 챗봇 설계, Agent 기반 업무 프로세스 혁신",
  },
  {
    icon: Palette,
    title: "AI 아트 & 전시 디렉터",
    desc: "캔버스 아트 전시회 6회 주최 (돈화문갤러리), 서울국제AI영화제 심사위원, AI 아트 수상 다수",
    link: "https://canvas-art-t2k4.vercel.app/exhibition",
  },
];

export default function ExpertiseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();

  return (
    <section id="expertise" className="py-20 md:py-24 bg-surface">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            GEO마케팅 <span className="text-gold">전문가</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            생성형 AI가 인용하는 콘텐츠를 설계합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const content = (
              <>
                <div className="w-12 h-12 rounded-lg gradient-navy flex items-center justify-center mb-5">
                  <card.icon size={22} className="text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  {card.title}
                  {(card.link || (card as any).comingSoon) && <ExternalLink size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                {card.link && (
                  <span className="inline-block mt-4 text-gold text-sm font-semibold group-hover:underline">
                    {(card as any).linkLabel || "바로가기"} →
                  </span>
                )}
                {(card as any).comingSoon && (
                  <span className="inline-block mt-4 text-gold text-sm font-semibold group-hover:underline">
                    {(card as any).linkLabel} →
                  </span>
                )}
              </>
            );

            return card.link ? (
              <a
                key={card.title}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card rounded-xl p-7 shadow-sm border border-border hover:-translate-y-1 hover:shadow-lg hover:border-gold/40 transition-all duration-300 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {content}
              </a>
            ) : (card as any).comingSoon ? (
              <button
                key={card.title}
                onClick={() => toast({ title: "준비중입니다.", description: `${(card as any).linkLabel}은 현재 준비중입니다. 곧 오픈 예정입니다!` })}
                className={`group bg-card rounded-xl p-7 shadow-sm border border-border hover:-translate-y-1 hover:shadow-lg hover:border-gold/40 transition-all duration-300 text-left cursor-pointer ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {content}
              </button>
            ) : (
              <div
                key={card.title}
                className={`group bg-card rounded-xl p-7 shadow-sm border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
