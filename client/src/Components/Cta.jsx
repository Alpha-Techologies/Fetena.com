import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <div className='flex items-center justify-center gap-4 my-24 lg:px-32'> 

<section className=" flex gap-6 justify-center rounded-md bg-white shadow-md max-w-[600px] group hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col w-[65%]">
          <div className="flex flex-col gap-1  my-auto font-semibold p-4">
            <h2 className="text-2xl leading-5 text-blue-900 font-bold">Become an Employer</h2>
            <p className="my-5 text-sm leading-5 font-medium text-gray-400">
              Find exceptional talent for your business at TalentHub Ethiopia and unlock new opportunities for growth.
            </p>
            <Link
              to='/sign-in'
              className='flex items-center justify-center gap-2'
            >
              
              <Button text="Get Started" />
           
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