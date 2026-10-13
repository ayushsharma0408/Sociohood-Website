import { useEffect } from "react";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import ComplaintProductHero from "../components/sections/complaint/ComplaintProductHero.jsx";
import ComplaintProductView from "../components/sections/complaint/ComplaintProductView.jsx";
import ComplaintFeatures from "../components/sections/complaint/ComplaintFeatures.jsx";
import ComplaintRoles from "../components/sections/complaint/ComplaintRoles.jsx";
import ComplaintModules from "../components/sections/complaint/ComplaintModules.jsx";
import ComplaintFinalCta from "../components/sections/complaint/ComplaintFinalCta.jsx";

const ComplaintManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Complaint Management | SocioHood";
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="product-page">
        <ComplaintProductHero />
        <ComplaintProductView />
        <ComplaintFeatures />
        <ComplaintRoles />
        <ComplaintModules />
        <ComplaintFinalCta />
      </main>
      <FooterSection />
    </>
  );
};

export default ComplaintManagement;
