import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-24 gradient-navy">
      <div ref={ref} className={`max-w-[1200px] mx-auto px-5 text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          AI 교육 & GEO마케팅 전문가에게
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-10">지금 바로 문의하세요</p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="mailto:info@aiclab2020.com?subject=강의문의"
            className="gradient-gold text-primary px-8 py-3.5 rounded-lg font-semibold hover:scale-[1.02] transition-transform"
          >
            강의 문의
          </a>
          <a
            href="https://magent-may.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gold text-gold px-8 py-3.5 rounded-lg font-semibold hover:bg-gold hover:text-primary transition-colors"
          >
            컨설팅 상담
          </a>
          <a
            href="mailto:info@aiclab2020.com?subject=협업제안"
            className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:border-gold hover:text-gold transition-colors"
          >
            협업 제안
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-primary-foreground/70 text-sm">
          <a href="mailto:info@aiclab2020.com" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Mail size={16} /> info@aiclab2020.com
          </a>
          <a href="tel:010-8921-9536" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Phone size={16} /> 010-8921-9536
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> 서울특별시 서초구 서초중앙로2길 35
          </span>
          <a href="http://pf.kakao.com/_kZRAX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
            <MessageCircle size={16} /> 카카오톡 채널
          </a>
        </div>
      </div>
    </section>
  );
}
