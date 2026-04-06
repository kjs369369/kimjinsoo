import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import AboutSection from "@/components/sections/AboutSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import CareerSection from "@/components/sections/CareerSection";
import AwardsSection from "@/components/sections/AwardsSection";
import MediaSection from "@/components/sections/MediaSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import ApplicationForm from "@/components/ApplicationForm";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ExpertiseSection />
      <AboutSection />
      <AchievementsSection />
      <SkillsSection />
      <PublicationsSection />
      <CareerSection />
      <AwardsSection />
      <MediaSection />
      <ApplicationForm />
      <ContactSection />
      <FooterSection />
      <Chatbot />
    </div>
  );
};

export default Index;
