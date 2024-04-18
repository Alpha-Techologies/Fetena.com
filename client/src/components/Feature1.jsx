import React from 'react';

const Feature1 = () => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-8 px-32 justify-center items-center">
       
          <div className="flex flex-col justify-center items-center px-8">
            <h2 className="text-4xl font-bold leading-9 text-black">
              Why Talenthub Ethiopia?
            </h2>
            <p className="mt-4 text-lg leading-7 text-gray-500">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nisi debitis, error ullam cumque id dolorem repudiandae dolorum accusantium explicabo, iusto nobis. Modi tempore accusantium accusamus alias minus cumque at?            </p>
            <button className=" px-11 py-2.5 mt-6 text-base font-semibold leading-6 whitespace-nowrap bg-blue-900 rounded text-slate-200">
              Button
            </button>
        
        </div>
       
          <div className="flex flex-col grow justify-center px-8 py-3.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
              alt="Talenthub Ethiopia"
              className="w-full rounded border-0 border-solid shadow-lg aspect-[1.37] border-neutral-200"
            />
          </div>
       
      </div>
    </section>
  );
};

export default Feature1;