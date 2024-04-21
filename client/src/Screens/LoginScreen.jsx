import { Link } from 'react-router-dom'
import fetena_logo from '../assets/fetena_logo.png'
import { Button, Form, Input, Divider } from "antd";
import { Icon } from '@iconify/react';

const LoginScreen = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <img
          className='w-20'
          src={fetena_logo}
          alt='Fetena.com Logo'
        />
        <h1 className='text-3xl font-bold'>Log In</h1>
        <p>
          Don't have an account?{" "}
          <Link to={'/register'} className='text-primary-500 hover:underline'>Sign up</Link>
        </p>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-md font-semibold '>Log In with your Credentials</h2>
        <Form>
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
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}>
            <Input
              prefix={<Icon icon='mdi-light:lock' />}
              type='email'
              placeholder='Password'
            />
          </Form.Item>
          <Divider> or </Divider>
          <div className='flex flex-col gap-2'>
            <h2 className='text-md font-semibold'>Log In with your Socials</h2>
            <div className='flex items-center gap-4 border border-[#DCDFE4] px-8 rounded-[8px] py-1 cursor-pointer '>
              <Icon icon='devicon:google' />
              <span>Continue with Google</span>
            </div>
            <div className='flex items-center gap-4 border border-[#DCDFE4] px-8 rounded py-1 cursor-pointer'>
              <Icon icon='devicon:linkedin' />
              <span>Continue with LinkedIn</span>
            </div>
          </div>
        </Form>
      </div>
      <Button
        className='bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500'
        htmlType='submit'>
        Log In
      </Button>
    </div>
  );
}
export default LoginScreen