import CustomNavbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutUs from "../components/AboutUs";
import CallToAction from "../components/CallToAction";

function HomePage() {
  return (
    <>
      <CustomNavbar />
      <HeroSection />
      <BenefitsSection />
      <WhyChooseUs />
      <AboutUs />
      <CallToAction />
    </>
  );
}

export default HomePage;
