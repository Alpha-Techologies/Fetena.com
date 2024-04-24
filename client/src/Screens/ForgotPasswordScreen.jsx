import fetena_logo from "../assets/fetena_logo.png";
import { Button, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const ForgotPasswordScreen = () => {
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
        <h1 className='text-3xl font-bold'>Forgot your password?</h1>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-md font-semibold '>Enter your email and we will send you a reset link.</h2>
        <Form >
          <Form.Item
            name='email'
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}>
            <Input
              className='max-w-[300px] min-w-[100px]'
              prefix={<Icon icon='mdi-light:email' />}
              type='email'
              placeholder='E-mail'
            />
          </Form.Item>
        </Form>
      </div>
      <Button
        className='bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500'
        htmlType='submit'>
        Send
      </Button>
    </div>
  );
};
export default ForgotPasswordScreen;
