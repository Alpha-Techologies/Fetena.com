import * as React from "react";

function HowItWorksStep({ imageSrc, title, description }) {
  return (
    <div className="flex flex-col items-center text-center text-white max-md:mt-10">
      <img src={imageSrc} alt={title} className="w-[55px] aspect-square" />
      <h3 className="mt-6 text-base font-medium leading-4 ">{title}</h3>
      <p className="mt-6 text-sm leading-5 ">{description}</p>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3cf5d5b6dab9b73a3ec6bf6b14499dce22bca21e3d993d90a6b661382912d4e?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Create account.",
      description: `To create an account on TalentHub <br /> Ethiopia, please visit the following <br /> website: <br /> https://talenthub.et/auth/sign_up`,
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3cf5d5b6dab9b73a3ec6bf6b14499dce22bca21e3d993d90a6b661382912d4e?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
        title: "Create account.",
        description: `To create an account on TalentHub <br /> Ethiopia, please visit the following <br /> website: <br /> https://talenthub.et/auth/sign_up`,
      },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb04b6656f6b54cba0fcb45c425592d879ae5d9dc4171b5a3a3f05c01132ab1e?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Find suitable job.",
      description: `To find suitable jobs on TalentHub <br /> Ethiopia, please log in to your account <br /> and click on the Jobs tab.`,
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c4ad37664ba2340bbb40318958787bfe3846cac994cf5e614929bba728aafc10?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
      title: "Apply job.",
      description: `To apply for a job on TalentHub <br /> Ethiopia, please click on the Apply <br /> button next to the job that you are <br /> interested in.`,
    },
  ];

  return (
    <section className="flex justify-center items-center px-16 py-20 bg-blue-900 max-md:px-5">
      <div className="flex flex-col mt-6 w-full max-w-[1041px] max-md:max-w-full">
        <h2 className="self-center text-3xl font-bold leading-9 text-center text-white max-md:max-w-full mb-8">
          How TalentHub Ethiopia works?
        </h2>
        <div className="mt-14 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-16 justify-center items-center">
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <HowItWorksStep {...steps[0]} />
            </div>
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <HowItWorksStep {...steps[1]} />
            </div>
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <HowItWorksStep {...steps[2]} />
            </div>
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <HowItWorksStep {...steps[3]} />
            </div>
       
           
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;