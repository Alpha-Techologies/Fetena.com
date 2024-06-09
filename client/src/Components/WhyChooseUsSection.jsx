import * as React from "react";
import { Icon } from '@iconify/react';


function WhyChooseUsSection() {
  const reasons = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b60da799b4359ad9e95668c90a82d4d959ba6e8d5b590b67104a6daa6d8a57fc?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Easy Exam Creation.",
      description: "Examiners can quickly set up exams with a user-friendly interface.",
      backgroundColor: "bg-blue-700",
      textColor: "text-white",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2e975f819e950a9d7409b2cbe28d0cca15e8f7a7479cd5e5d1490cf3d9d7b293?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Secure Exam Environment.",
      description: "Advanced security features prevent cheating and ensure exam integrity.",
      backgroundColor: "bg-gray-100",
      textColor: "text-black",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b382afd15571a1f2458e421c5d43ebfa2a1a6835e8b90dec73e65d8748c82e39?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Convenient Online Access.",
      description:
        "Examinees can take exams from anywhere with an internet connection.",
      backgroundColor: "bg-gray-100",
      textColor: "text-black",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/613f829920de2ef8aa89abd17d7ece20b353d8877b85dd421b00adb699b4fd3b?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Streamlined Process.",
      description: "Reduces administrative workload and eliminates the hassle of managing paper exams.",
      backgroundColor: "bg-gray-100",
      textColor: "text-black",
    },
  ];

  return (
<>

   
    <section className="py-16 px-16 md:px-32 ">
    <h2 className="text-4xl font-bold leading-9 text-black max-md:max-w-full text-left">
    Simplify Exam Management and Enhance Accessibility
            </h2>

            <p className="my-8 text-gray-600 text-left">
            Fetena.com offers a straightforward solution for transitioning from traditional paper-based exams to a modern, online platform.              </p>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">


      
      <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
          
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48e3d108b9d904937772f8ee36146b2ca7a1c3e35e85d728b09fa347f835ca55?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
            alt="Talenthub Ethiopia"
            className="self-end mt-12 w-full aspect-square max-md:mt-10 max-md:max-w-full"
          />
  
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {reasons.map((reason, index) => (
                <ReasonCard key={index} reason={reason} />
              ))}




      </div>

      </div>
    </section>
    </>
  );
}

function ReasonCard({ reason }) {
  return (
  

<article className="group flex flex-col justify-center items-start py-7 pr-12 pl-6 leading-5 text-black bg-gray-100 rounded-xl max-w-[304px] transition-all duration-300 hover:bg-blue-900 hover:text-white hover:scale-105">
  <div className=" border aspect-square w-[55px] h-[55px] bg-blue-900 rounded-full flex justify-center items-center text-white group-hover:border-white group-hover:text-white ">
    <Icon icon="mdi-light:home" className="text-3xl font-bold transition-colors duration-300" />
  </div>
  <h3 className="mt-6 text-base font-semibold">
    {reason.title}
  </h3>
  <p className="mt-6 text-[0.9rem]">
    {reason.description}
  </p>
</article>

  );
}

export default WhyChooseUsSection;