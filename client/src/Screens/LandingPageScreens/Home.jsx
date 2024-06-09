import HeroSection from "../../Components/HeroSection";
import WhyChooseUsSection from "../../Components/WhyChooseUsSection";

import HowItWorks from "../../Components/HowItWorks";
import Cta from "../../Components/Cta";
import FeatureSection1 from "../../Components/FeatureSection1";
import FeatureSection2 from "../../Components/FeatureSection2";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import TestimonySection from "../../Components/TestimonySection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import About  from "./About";
import Customers from "./Customers";

const Home = () => {
  const navigate = useNavigate();

  const [displayPage, setDisplayPage] = useState("home");

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  });

  const featuresData = {
    title: "For Examiners or Examinees",
    description:
    "Fetena.com offers a user-friendly interface that simplifies the exam creation and management process for examiners, making it straightforward and efficient. The platform ensures a fair testing environment with robust security measures, allowing exams to be conducted securely and without concerns about cheating. Grading is made efficient and easy, enabling examiners to grade exams quickly and provide instant results to examinees. Additionally, Fetena.com supports multiple question formats, including multiple-choice, essays, and more, catering to diverse exam needs. Real-time monitoring features keep exams secure by enabling real-time proctoring, ensuring the integrity of the examination process." ,
       btnLink: "/search",
    btnLabel: "Get started",
    imgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
  };


  
  const featuresDataa = {
    title: "For Examiners",
    description:
      "Fetena.com is dedicated to simplifying the exam process for examiners. The platform allows examiners to effortlessly create and manage exams with its intuitive interface. They can monitor examinees in real-time, ensuring the integrity of the exam, and utilize efficient grading tools to provide quick and accurate results. This seamless integration of exam management tools significantly reduces administrative workload and enhances the overall efficiency of conducting exams.",
    btnLink: "/search",
    btnLabel: "Get started",
    imgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
  };


  
  const featuresDataaa = {
    title: "For Examinees",
    description:
      "Fetena.com offers a convenient and streamlined testing experience. Students can easily access and take exams online from any location with an internet connection. The platform ensures a smooth and user-friendly process, from beginning the exam to submitting it. Moreover, examinees benefit from receiving their results quickly, allowing them to promptly understand their performance. This convenience and efficiency make Fetena.com an ideal choice for modernizing the exam process.",
    btnLink: "/search",
    btnLabel: "Get started",
    imgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
  };


  
  const featuresDataaaa = {
    title: "Fetena.com's exam tools include",
    description:
      "Fetena.com provides a comprehensive suite of exam tools designed to enhance the entire examination process. The platform features user-friendly exam creation, allowing educators to set up exams effortlessly. It ensures a secure exam environment with robust security measures to prevent cheating and maintain integrity. Automated grading tools enable quick and accurate assessment, delivering instant results to students. Real-time monitoring capabilities provide live oversight during exams, while comprehensive exam logs track all activities for transparency and review. Additionally, an intuitive dashboard offers an organized and accessible interface for managing all aspects of the examination process, making Fetena.com an indispensable tool for modern educational institutions.",
    btnLink: "/search",
    btnLabel: "Get started",
    imgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
  };

  return (
    <>
      <NavBar
        displayPage={displayPage}
        setDisplayPage={setDisplayPage}
      />
      {displayPage === "home" ? (
        <>
          <HeroSection />
          <WhyChooseUsSection />
          <FeatureSection1 featuresData={featuresData} />
          <FeatureSection2 featuresData={featuresDataa} />
          <FeatureSection1 featuresData={featuresDataaa} />
          <FeatureSection2 featuresData={featuresDataaaa} />

          <TestimonySection />
          <HowItWorks />

          <Cta />
        </>
      ) : displayPage === "customers" ? (
        <Customers />
      ) : (
        <About />
      )}

      <Footer />
    </>
  );
};
export default Home;
