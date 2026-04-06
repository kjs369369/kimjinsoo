import { BookOpen, Building, Trophy, Palette, GraduationCap, Tv } from "lucide-react";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

const stats = [
  { icon: BookOpen, value: 25, suffix: "+", label: "저서" },
  { icon: Building, value: 50, suffix: "+", label: "출강 기관" },
  { icon: Trophy, value: 5, suffix: "", label: "수상" },
  { icon: Palette, value: 6, suffix: "", label: "ART 전시회 주최" },
  { icon: GraduationCap, value: 20, suffix: "+", label: "자격·인증" },
  { icon: Tv, value: 0, suffix: "", label: "유튜브 메이TV", isText: true, text: "운영중" },
];

function StatCard({ icon: Icon, value, suffix, label, isText, text, isVisible, delay }: any) {
  const count = useCountUp(value, 1500, isVisible);

  return (
    <div
      className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon size={28} className="text-gold mx-auto mb-3" />
      <div className="font-number text-4xl md:text-5xl font-bold text-primary-foreground mb-1">
        {isText ? text : `${count}${suffix}`}
      </div>
      <p className="text-primary-foreground/70 text-sm">{label}</p>
    </div>
  );
}

export default function AchievementsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="achievements" className="py-20 md:py-24 gradient-navy">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-14 text-center">
          숫자로 보는 <span className="text-gold">성과</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} isVisible={isVisible} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
