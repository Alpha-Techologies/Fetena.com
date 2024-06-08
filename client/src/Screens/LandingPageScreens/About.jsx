import React from 'react'
import FeatureSection1 from "../../Components/FeatureSection1";
import FeatureSection2 from "../../Components/FeatureSection2";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import TestimonySection from "../../Components/TestimonySection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const About = () => {

  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  });

const featuresData = {
  title: "For Examiners or Examinees",
  description:
    "Our company is dedicated to helping landlords and property developers to rent and sell out their properties. If you want to save time and money, while expanding, you might want to be interested in our professional services Our company could be your ideal partner for renting or selling your property. We are committed to our customers and promoters and our main objective is to be transparent while achieving results",
  btnLink: "/search",
  btnLabel: "Get started",
  imgSrc:
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
};


const About = () => {
  
  return (
    <>
      <h1 className='text-4xl font-bold'>About</h1>

      <HeroSection />
      <WhyChooseUsSection />
      <FeatureSection1 featuresData={featuresData} />
      <FeatureSection2 featuresData={featuresData} />
      <FeatureSection1 featuresData={featuresData} />
      <FeatureSection2 featuresData={featuresData} />

      <TestimonySection />
      <HowItWorks />

      <Cta />
      <Footer />
    </>
  );
};
export default About;
