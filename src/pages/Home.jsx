import Navbar from "../components/navigation/Navbar.jsx";
import HeroSection from "../components/sections/HeroSection.jsx";
import EcosystemSection from "../components/sections/EcosystemSection.jsx";
import CredibilitySection from "../components/sections/CredibilitySection.jsx";
import PainSection from "../components/sections/PainSection.jsx";
import JourneySection from "../components/sections/JourneySection.jsx";
import MobileAppSection from "../components/sections/MobileAppSection.jsx";
import RolesSection from "../components/sections/RolesSection.jsx";
import ModulesSection from "../components/sections/ModulesSection.jsx";
import StoriesSection from "../components/sections/StoriesSection.jsx";
import LaunchSection from "../components/sections/LaunchSection.jsx";
import ImplementationSection from "../components/sections/ImplementationSection.jsx";
import BlogSection from "../components/sections/BlogSection.jsx";
import FaqSection from "../components/sections/FaqSection.jsx";
import ProjectInviteSection from "../components/sections/ProjectInviteSection.jsx";
import ClosingSection from "../components/sections/ClosingSection.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";

const Home = () => (
  <>
    <Navbar />
    <main className="sales-home">
      <HeroSection />
      <EcosystemSection />
      <CredibilitySection />
      <PainSection />
      <JourneySection />
      <MobileAppSection />
      <RolesSection />
      <ModulesSection />
      <StoriesSection />
      <LaunchSection />
      <ImplementationSection />
      <BlogSection />
      <FaqSection />
      <ProjectInviteSection />
      <ClosingSection />
    </main>
    <FooterSection />
  </>
);

export default Home;
