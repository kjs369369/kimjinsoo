import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const keywords = [
  "GEO(Generative Engine Optimization)",
  "AI 리터러시",
  "프롬프트 엔지니어링",
  "업무 자동화 (n8n, GPTs)",
  "콘텐츠 전략",
  "바이브 코딩",
  "강사 양성",
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-24 bg-background">
      <div ref={ref} className={`max-w-[1200px] mx-auto px-5 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          About <span className="text-gold">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Story */}
          <div className="space-y-5">
            <p className="text-foreground leading-relaxed">
              유아교육(유치원 교사, 연구소, 영어학원 원장) 분야에서 쌓은 교육 경험을 바탕으로
              AI 교육 분야로 전환하여 현재 <strong className="text-gold">GEO마케팅 전문가</strong>이자{" "}
              <strong>AI 교육 강사</strong>로 활동하고 있습니다.
            </p>
            <blockquote className="border-l-4 border-gold pl-5 py-2 text-foreground/90 italic font-display">
              "개별 도구가 아닌 구조적 사고와 워크플로우 시스템을 가르칩니다"
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              40~60대 비전공자가 주 교육 대상이며, 누구나 바로 실행할 수 있는 실전 교육을 지향합니다.
              메이랜드AI비즈랩 CEO, AICLab(AI콘텐츠융합연구소) 소장, 디지털융합교육원 부원장으로서
              AI 교육의 대중화에 기여하고 있습니다.
            </p>
          </div>

          {/* Keywords */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-5">핵심 전문 키워드</h3>
            <div className="flex flex-wrap gap-3">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-xl bg-surface border border-border">
              <p className="text-sm text-muted-foreground mb-1">학력</p>
              <p className="text-foreground font-medium">숙명여대 인적자원개발대학원</p>
              <p className="text-muted-foreground text-sm">리더십교육전공 석사과정 수료</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
