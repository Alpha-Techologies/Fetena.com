import { useState } from "react";
import fetena_logo from "../../assets/fetena_logo.png";
import { Icon } from "@iconify/react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const VerifyEmailScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Link to={"/"}>
          <img
            className='w-40'
            src={fetena_logo}
            alt='Fetena.com Logo'
          />
        </Link>
        <h1 className='text-3xl font-bold'>Verify your Email</h1>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-md font-semibold '>
          Click the button below to verify your email.
        </h2>
      </div>
      <Button
        className='bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500'
        htmlType='submit'
        text={"Verify Me"}
      />
    </div>
  );
};
export default VerifyEmailScreen;
