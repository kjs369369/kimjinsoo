import { useState, useEffect } from "react";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { id: "hero", label: "홈" },
  { id: "expertise", label: "전문분야" },
  { id: "about", label: "소개" },
  { id: "achievements", label: "성과" },
  { id: "publications", label: "저서" },
  { id: "career", label: "경력" },
  { id: "awards", label: "수상" },
  { id: "contact", label: "문의" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "gradient-navy shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-sm md:text-lg font-bold text-primary-foreground">
            김진수 <span className="text-gold">AI활용교육전문가 · GEO마케팅전문가</span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm transition-colors ${
                  activeSection === item.id
                    ? "text-gold font-semibold"
                    : "text-primary-foreground/80 hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-primary-foreground/80 hover:text-gold transition-colors p-2 rounded-lg"
              title={theme === "dark" ? "라이트 모드" : "다크 모드"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="gradient-gold text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              강의 문의
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 gradient-navy transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-xl transition-colors ${
                activeSection === item.id ? "text-gold font-bold" : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile FAB */}
      <a
        href="tel:010-8921-9536"
        className="fixed bottom-6 right-6 z-50 md:hidden gradient-gold text-primary rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
      >
        <Phone size={24} />
      </a>
    </>
  );
}
