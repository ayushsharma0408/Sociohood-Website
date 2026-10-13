import { useEffect } from "react";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import CompanyHero from "../components/company/CompanyHero.jsx";
import DeploymentSection from "../components/company/DeploymentSection.jsx";
import PrinciplesSection from "../components/company/PrinciplesSection.jsx";
import IncubationSection from "../components/company/IncubationSection.jsx";
import CompanyLaunch from "../components/company/CompanyLaunch.jsx";
import CompanyCta from "../components/company/CompanyCta.jsx";

const Company = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Company | SocioHood";
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="company-page">
        <CompanyHero />
        <DeploymentSection />
        <PrinciplesSection />
        <IncubationSection />
        <CompanyLaunch />
        <CompanyCta />
      </main>
      <FooterSection />
    </>
  );
};

export default Company;
