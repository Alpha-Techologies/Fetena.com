import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <div className='grid grid-cols-1 mx-4 gap-4   md:grid-cols-2 my-24 lg:px-32 justify-center items-center'>

<section className=" flex gap-6 justify-center rounded-md bg-blue-900  max-w-[600px]">
        <div className="flex flex-col w-[65%]">
          <div className="flex flex-col gap-1  my-auto font-semibold p-4">
            <h2 className="text-2xl leading-5 text-white">Become an Employer</h2>
            <p className="mt-5 text-sm leading-5 text-gray-300">
              Find exceptional talent for your business at TalentHub Ethiopia and unlock new opportunities for growth.
            </p>
            <Link
              to='/'
              className='mt-2'
            >
              
              
              <button
      type='button'
      className=' text-primary-500 hover:text-white border border-primary-500 hover:bg-primary-500 bg-white hover:text-primary-500 hover:border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2  text-center transition-all ease-in-out duration-300 '>
      button
    </button>
            </Link>
          </div>
        </div>
   
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cc821afa65cabf0dec49376d1445e4c87b08226c35c49613e401576c61c2a63?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
            alt="Employer image"
            className="hidden lg:flex grow shrink-0 max-w-full aspect-[0.93] w-[187px]"
          />
   
      </section>
     


      <section className="flex gap-6 justify-center rounded-md border border-solid border-neutral-700 border-opacity-30 max-w-[600px]">
        <div className="flex flex-col w-[65%]">
          <div className="flex flex-col gap-1  my-auto font-semibold text-black p-4">
            <h2 className="text-2xl leading-5">Become an Employer</h2>
            <p className="mt-5 text-sm leading-5">
              Find exceptional talent for your business at TalentHub Ethiopia and unlock new opportunities for growth.
            </p>
            <Link
              to='/'
              className='mt-2'
            >
              
              
            <Button text="button" />
            </Link>
          </div>
        </div>
   
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cc821afa65cabf0dec49376d1445e4c87b08226c35c49613e401576c61c2a63?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
            alt="Employer image"
            className="hidden lg:flex grow shrink-0 max-w-full aspect-[0.93] w-[187px]"
          />
   
      </section>
     

    </div>
  );
}

export default Cta;