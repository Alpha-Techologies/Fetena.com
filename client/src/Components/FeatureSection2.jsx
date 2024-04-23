import React from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';
const FeatureSection2 = ({ featuresData }) => {
  const { title, description, btnLink, btnLabel, imgSrc } = featuresData;

  return (
    <div className="py-16 -mt-16">
      <div className="px-6 m-auto text-gray-600 xl:container md:px-12 xl:px-16">
        <div className="lg:bg-gray-50 lg:p-16 rounded-[2rem] space-y-6 md:flex md:gap-6 justify-center md:space-y-0 lg:items-center">
        <div className="mx-8 md:w-7/12 lg:w-1/2">
            <h2 className="text-3xl font-bold text-blue-900 md:text-4xl">{title}</h2>
            <p className="my-8 text-gray-600">{description}</p>
            <Link
              to={btnLink}
              className="self-center w-auto px-8 mr-4 border-0 text-white text-lg hover:bg-secondary bg-primary hover:text-white rounded-md py-2 px-4"
            >
              
              
            <Button text={btnLabel} />
            </Link>
          </div>
          <div className="md:w-5/12 lg:w-1/2">
            <img
              src={imgSrc}
              alt="image"
              loading="lazy"
              width="100%" // Adjust width as needed
              height="auto" // Maintain aspect ratio
              className="rounded-2xl"
            />
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default FeatureSection2