import React from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const HeroSection = () => {
    return (
        <section className="flex justify-center items-center px-16 py-16 mt-12 bg-blue-900">
          <div className="w-full max-w-[1248px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-center self-stretch pt-1.5 pr-6 pb-8 my-auto max-md:mt-10 max-md:max-w-full">
                  <h1 className="text-4xl font-bold leading-10 text-white max-md:mr-2.5 max-md:max-w-full">
                    Connecting Ethiopia's Top Talent <br /> with the Best Jobs.
                  </h1>
                  <p className="mt-8 text-base leading-7 text-white max-md:max-w-full">
                    Empowering Ethiopians to find and create jobs, work and connect with <br /> professionals.
                  </p>
               
    <Search
      placeholder="Enter Exam key"
      allowClear
      enterButton="Search"
      size="large"
      className='w-96 mt-4'
     
    />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center px-16 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c055032702a1cd1045be1eded99e09f7fae58c2d2a7bcff5f0df9d7baf2db11b?apiKey=da0e5699a0964f23ab3a2091e7f935a3&"
                    alt="Connecting Ethiopia's Top Talent with the Best Jobs"
                    className="mx-4  aspect-square max-md:mx-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>)
}

export default HeroSection
