import { useState } from "react";
import fetena_logo from "../../assets/fetena_logo.png";
import { Icon } from "@iconify/react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const OTPScreen = () => {
  const [OTP, setOTP] = useState("");

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
        <h1 className='text-3xl font-bold'>One Time Password</h1>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-md font-semibold '>
          Enter your one time password sent to your email.
        </h2>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          className='flex items-center justify-center '
          inputClassName='border-2 border-primary-500 rounded-md rounded w-40 h-40 p-2 text-4xl font-bold'
          OTPLength={6}
          otpType='number'
          disabled={false}
          inputStyles={{
            width: "2.5rem",
            height: "2.5rem",
            margin: "0.5rem",
            MozAppearance: "textfield",
            border: "1px solid",
            borderRadius: "5px",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        />
        <ResendOTP onResendClick={() => console.log("Resend clicked")} />
      </div>
      <Button
        className='bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500'
        htmlType='submit'
        text={"Send"}
      />
    </div>
  );
};
export default OTPScreen;
