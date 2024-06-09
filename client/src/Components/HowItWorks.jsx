import * as React from "react";
import { Icon } from '@iconify/react';

function HowItWorksStep({ imageSrc, title, description }) {
  return (
    <div  className="flex flex-col items-center text-center text-white max-md:mt-10 hover:scale-105 transition-all ease-in-out duration-300 px-4">
      <div className="border aspect-square w-[55px] h-[55px] bg-blue-900 rounded-full flex justify-center items-center text-white group-hover:border-white group-hover:text-white">
        <Icon icon="mdi-light:home" className="text-3xl font-bold transition-colors duration-300" />
      </div>
      <h3 className="mt-6 text-base font-medium leading-4">{title}</h3>
      <p className="mt-6 text-sm leading-5">{description}</p>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3cf5d5b6dab9b73a3ec6bf6b14499dce22bca21e3d993d90a6b661382912d4e?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Create an Account.",
      description: `Sign up on Fetena.com to get started.`,
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3cf5d5b6dab9b73a3ec6bf6b14499dce22bca21e3d993d90a6b661382912d4e?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Set Up Exams.",
      description: ` Use our simple interface to create and schedule exams.`,
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb04b6656f6b54cba0fcb45c425592d879ae5d9dc4171b5a3a3f05c01132ab1e?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Conduct Exams.",
      description: ` Monitor examinees in real-time and ensure a secure testing environment.`,
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c4ad37664ba2340bbb40318958787bfe3846cac994cf5e614929bba728aafc10?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Grade Exams.",
      description: ` Grade exams effortlessly and provide instant results to examinees.`,
    },
  ];

  return (
    <section id="how-it-works" className="px-4 py-8 bg-blue-900 md:py-20 md:px-10 lg:px-16 xl:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-16  text-3xl font-bold text-center text-white md:text-4xl">
          How TalentHub Ethiopia works?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex justify-center">
              <HowItWorksStep {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
