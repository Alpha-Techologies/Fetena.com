import HeroSection from "../Components/HeroSection";
import WhyTalenthubEthiopia from "../Components/WhyTalenthubEthiopia";
import Feature1 from "../Components/Feature1";
import Feature2 from "../Components/Feature2";
import HowItWorks from "../Components/HowItWorks";
import Cta from "../Components/Cta";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import TestimonySection from "../Components/TestimonySection";

const Home = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <WhyTalenthubEthiopia />
      <Feature1 />
      <Feature2 />
      <Feature1 />
      <Feature2 />
      <TestimonySection />
      <HowItWorks />
      <Cta />
      <Footer />
    </>
  );
};
export default Home;
