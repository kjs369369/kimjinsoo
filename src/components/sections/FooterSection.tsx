import { Youtube, Linkedin, Link, Settings, MessageCircle } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const links = [
  { id: "hero", label: "홈" },
  { id: "expertise", label: "전문분야" },
  { id: "publications", label: "저서" },
  { id: "career", label: "경력" },
  { id: "contact", label: "문의" },
];

export default function FooterSection() {
  return (
    <footer className="bg-foreground py-10">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-background/90 text-sm">© 2026 김진수(May) | AICLab · 메이랜드AI비즈랩</p>
            <p className="text-background/50 text-xs mt-1">
              Powered by AICLab · <RouterLink to="/admin" className="inline-flex items-center gap-1 hover:text-gold transition-colors"><Settings size={10} /> 관리자</RouterLink>
            </p>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-background/60 text-xs hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://youtube.com/@AI_coach_May"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-gold transition-colors"
              title="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/kim-jinsoo-365989294/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-gold transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://litt.ly/mayland_ai_bizlab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-gold transition-colors"
              title="멀티링크"
            >
              <Link size={20} />
            </a>
            <a
              href="http://pf.kakao.com/_kZRAX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-gold transition-colors"
              title="카카오톡 채널"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
