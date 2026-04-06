import { Youtube, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function MediaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-24 bg-background">
      <div ref={ref} className={`max-w-[1200px] mx-auto px-5 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          미디어 <span className="text-gold">Media</span>
        </h2>

        <div className="max-w-lg mx-auto bg-card border border-border rounded-xl p-8 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5">
            <Youtube size={32} className="text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">메이TV</h3>
          <p className="text-muted-foreground text-sm mb-1">@AI_coach_May</p>
          <p className="text-muted-foreground text-sm mb-6">AI 교육 콘텐츠 & GEO마케팅 실전 가이드</p>
          <a
            href="https://youtube.com/@AI_coach_May"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-gold text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition"
          >
            채널 바로가기 <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
