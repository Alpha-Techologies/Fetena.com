import React from 'react';

const Cta = () => {
  return (
    <div className='grid grid-cols-2 my-24 px-32 justify-center items-center'>

      <section className="bg-blue-900 ml-16 flex gap-6 justify-center rounded-md border border-solid border-neutral-700 border-opacity-30 max-w-[600px]">
        <div className="flex flex-col w-[65%]">
          <div className="flex flex-col self-stretch my-auto font-semibold text-black">
            <h2 className="text-2xl leading-5 text-white">Become an Employer</h2>
            <p className="mt-5 text-sm text-white">
              Find exceptional talent for your business at TalentHub Ethiopia and unlock new opportunities for growth.
            </p>
            <button className="ml-8  px-11 py-2.5 mt-6 text-blue-900 font-semibold leading-6 whitespace-nowrap bg-white rounded hover:bg-gray-200  transition duration-300">
              Button
            </button>
          </div>
        </div>
   
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cc821afa65cabf0dec49376d1445e4c87b08226c35c49613e401576c61c2a63?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
            alt="Employer image"
            className="grow shrink-0 max-w-full aspect-[0.93] w-[187px]"
          />
   
      </section>

      <section className="ml-16 flex gap-6 justify-center rounded-md border border-solid border-neutral-700 border-opacity-30 max-w-[600px]">
        <div className="flex flex-col w-[65%]">
          <div className="flex flex-col self-stretch my-auto font-semibold text-black">
            <h2 className="text-2xl leading-5">Become an Employer</h2>
            <p className="mt-5 text-sm leading-5">
              Find exceptional talent for your business at TalentHub Ethiopia and unlock new opportunities for growth.
            </p>
            <button className="ml-8  px-11 py-2.5 mt-6 text-base font-semibold leading-6 whitespace-nowrap bg-blue-900 rounded text-slate-200 hover:bg-blue-700 transition duration-300">
              Button
            </button>
          </div>
        </div>
   
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cc821afa65cabf0dec49376d1445e4c87b08226c35c49613e401576c61c2a63?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
            alt="Employer image"
            className="grow shrink-0 max-w-full aspect-[0.93] w-[187px]"
          />
   
      </section>
     

    </div>
  );
}

export default Cta;