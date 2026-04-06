import { Lightbulb } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const skills = [
  { name: "GEO마케팅", value: 95 },
  { name: "생성형 AI (ChatGPT, 젬스파크)", value: 92 },
  { name: "프롬프트 엔지니어링", value: 90 },
  { name: "AI 콘텐츠 제작", value: 88 },
  { name: "디지털 리터러시 교육", value: 85 },
  { name: "AI 선거전략 컨설팅", value: 80 },
];

function SkillBar({ name, value, isVisible, delay }: { name: string; value: number; isVisible: boolean; delay: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(value), delay * 1000);
      return () => clearTimeout(timer);
    } else {
      setWidth(0);
    }
  }, [isVisible, value, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-primary-foreground text-sm font-medium">{name}</span>
        <span className="text-gold font-number text-sm font-semibold">{isVisible ? value : 0}%</span>
      </div>
      <div className="h-2.5 bg-primary-foreground/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full gradient-gold transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 md:py-24 gradient-navy">
      <div ref={ref} className={`max-w-[900px] mx-auto px-5 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb size={28} className="text-gold" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              전문 <span className="text-gold">스킬</span>
            </h2>
          </div>
          <div className="w-10 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} isVisible={isVisible} delay={0.2 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
