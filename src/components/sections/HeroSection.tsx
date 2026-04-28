import { ChevronDown, Award } from "lucide-react";
import profileImg from "@/assets/profile.png";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const typingTexts = [
  "GEO마케팅 전문가",
  "AI 교육 강사",
  "콘텐츠 전략가",
  "25권+ 저서 저자",
];

export default function HeroSection() {
  const typedText = useTypingEffect(typingTexts, 100, 50, 2000);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-20 text-center">
        {/* Profile Photo */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-gold shadow-2xl overflow-hidden">
              <img src={profileImg} alt="김진수 프로필 사진" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gold rounded-full p-2.5">
              <Award size={22} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="font-number text-5xl md:text-7xl font-bold text-white mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
          김진수
        </h1>

        {/* Typing effect title */}
        <div className="h-10 md:h-12 mb-8">
          <p className="text-white text-xl md:text-2xl font-semibold tracking-wide" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            {typedText}
            <span className="inline-block w-0.5 h-6 bg-gold ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Slogan */}
        <p className="font-display text-xl md:text-2xl text-gold max-w-2xl mx-auto mb-12 leading-relaxed font-semibold" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
          "AI가 고객을 데려오는 시대,<br />GEO마케팅으로 비즈니스의 언어를 바꾸다"
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#contact"
            className="gradient-gold text-primary px-10 py-4 rounded-lg font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl"
          >
            강의 문의하기
          </a>
          <a
            href="#expertise"
            className="border-2 border-white/60 text-white px-10 py-4 rounded-lg font-bold text-lg hover:border-gold hover:text-gold transition-colors backdrop-blur-sm"
          >
            포트폴리오 보기
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <span className="bg-black/40 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full text-base font-medium flex items-center gap-2" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            <Award size={16} className="text-gold" /> Google Certified Educator
          </span>
          <span className="bg-black/40 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full text-base font-medium flex items-center gap-2" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            <Award size={16} className="text-gold" /> Gemini Certified Educator
          </span>
          <span className="bg-black/40 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full text-base font-medium flex items-center gap-2" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            <Award size={16} className="text-gold" /> Anthropic Certified
          </span>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" })}
          className="animate-bounce-gentle text-white/60"
        >
          <ChevronDown size={36} />
        </button>
      </div>
    </section>
  );
}
