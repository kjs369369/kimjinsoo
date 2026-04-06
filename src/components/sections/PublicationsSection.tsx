import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  {
    name: "GEO마케팅",
    color: "from-navy to-navy-light",
    books: [
      { title: "AI가 고객을 데려오는 시대 - GEO마케팅 완전정복", publisher: "미디어북", year: "2026" },
      { title: "이것이 GEO 마케팅이다", publisher: "두온교육", year: "2026" },
    ],
  },
  {
    name: "AI활용",
    color: "from-blue-accent to-navy-light",
    books: [
      { title: "AI Agent가 공무를 바꾼다", publisher: "두온교육", year: "2026" },
      { title: "프롬프트를 만드는 프롬프트 GPTs&Gems", publisher: "성안당", year: "2025" },
      { title: "전 국민이 알아야 할 AI리터러시", publisher: "미디어북", year: "2025" },
      { title: "AI와 디지털 혁명", publisher: "두온교육", year: "2025" },
      { title: "전문가들이 전하는 챗GPT와 미래교육", publisher: "미디어북", year: "2023" },
      { title: "나만 알고 싶은 챗GPT업무효율화 비법", publisher: "미디어북", year: "2023" },
      { title: "챗GPT활용 선거 홍보전략", publisher: "미디어북", year: "2024" },
      { title: "AI영상 비즈니스의 언어가 되다", publisher: "두온교육", year: "2024" },
      { title: "AI로 CF영상 제작비법", publisher: "두온교육", year: "2024" },
    ],
  },
  {
    name: "AI아트·문학",
    color: "from-gold to-gold-light",
    books: [
      { title: "인지문학(창간호) AI의 시간, 사랑의 언어로 번역하다", publisher: "고시계사", year: "" },
      { title: "캔버스 아트집 1 쉼의 온도", publisher: "두온교육", year: "" },
      { title: "캔버스 아트집 2 고요의 결", publisher: "두온교육", year: "2025" },
      { title: "캔버스 아트집 3 공존(共存)", publisher: "두온교육", year: "2026" },
      { title: "캔버스 시화집 1 바람이 머무는 자리", publisher: "두온교육", year: "" },
      { title: "캔버스 시화집 2 별이 지나는 길", publisher: "두온교육", year: "" },
      { title: "캔버스 시화집 3 꽃이 피는 순간", publisher: "두온교육", year: "" },
      { title: "캔버스 시화집 4 물의 기억", publisher: "두온교육", year: "" },
      { title: "캔버스 시화집 5 다시 마음", publisher: "두온교육", year: "2025" },
    ],
  },
  {
    name: "기타",
    color: "from-muted-foreground to-navy",
    books: [
      { title: "그림책 사과나무의 선물", publisher: "두온교육", year: "2024" },
      { title: "삶을 변화시키는 작지만 위대한 글쓰기", publisher: "지식문화원", year: "2023" },
      { title: "인문학 강의 교육 담당자를 위한 강사 편람", publisher: "한국지식문화원", year: "2024" },
    ],
  },
];

export default function PublicationsSection() {
  const [showAll, setShowAll] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const displayCategories = showAll ? categories : categories.slice(0, 2);

  return (
    <section id="publications" className="py-20 md:py-24 bg-surface">
      <div ref={ref} className={`max-w-[1200px] mx-auto px-5 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-14 text-center">
          저서 <span className="text-gold">Publications</span>
        </h2>

        {displayCategories.map((cat) => (
          <div key={cat.name} className="mb-10">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`} />
              {cat.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.books.map((book) => (
                <div
                  key={book.title}
                  className="group bg-card rounded-xl p-5 border border-border hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <p className="font-semibold text-foreground text-sm leading-snug mb-2">{book.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {book.publisher} {book.year && `· ${book.year}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold transition-colors"
          >
            {showAll ? "접기" : `더보기 (${categories.length - 2}개 카테고리)`}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
}
