import { Trophy, Eye, Image } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const awards = [
  "2025 생성형AI강사대상 (AI기술강의부문)",
  "2025 대한민국인공지능영화제 심사위원 스페셜상",
  "2024 하남 AI 뮤직 무비 영화제 AI아트 부문 국회의원 최우수상",
  "2023 인공지능컨텐츠 강사경진대회 대상",
  "2023 아시아리더대상 (아시아미래산업기술 발전부문)",
];

const judging = [
  "2024 중앙정부 통일부 프롬프톤대회 심사",
  "2025 농림수산부 생성형AI활용 미래 농업 콘텐츠 공모전 'AGRI TED U' 심사",
  "2025 SIAFF 서울국제AI영화제 심사",
];

const exhibitions = [
  "2026.3 ART전시회 '공존' / 돈화문갤러리",
  "2025.8 ART전시회 '쉼의 온도' / 돈화문갤러리",
  "2025.5 ART전시회 '사랑의 결' / 돈화문갤러리",
  "2025.2 ART전시회 '봄과 생명' / 돈화문갤러리",
  "2025.2 ART전시회 '치유' / 성수 연리단길 스페이스 큐",
  "2025.1 AI아트 공감과 소통 전시회 / 돈화문갤러리",
];

export default function AwardsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="awards" className="py-20 md:py-24 bg-surface">
      <div ref={ref} className={`max-w-[1200px] mx-auto px-5 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-14 text-center">
          수상 & <span className="text-gold">전시</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Awards */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Trophy size={20} className="text-gold" />
              <h3 className="font-semibold text-foreground text-lg">수상</h3>
            </div>
            <div className="space-y-3">
              {awards.map((a) => (
                <div key={a} className="bg-card border border-border rounded-lg p-4 text-sm text-foreground">{a}</div>
              ))}
            </div>
          </div>

          {/* Judging */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Eye size={20} className="text-gold" />
              <h3 className="font-semibold text-foreground text-lg">심사</h3>
            </div>
            <div className="space-y-3">
              {judging.map((j) => (
                <div key={j} className="bg-card border border-border rounded-lg p-4 text-sm text-foreground">{j}</div>
              ))}
            </div>
          </div>

          {/* Exhibitions */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Image size={20} className="text-gold" />
              <h3 className="font-semibold text-foreground text-lg">전시</h3>
            </div>
            <div className="space-y-3">
              {exhibitions.map((e) => (
                <div key={e} className="bg-card border border-border rounded-lg p-4 text-sm text-foreground">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
