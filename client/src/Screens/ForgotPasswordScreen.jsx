import fetena_logo from "../assets/fetena_logo.png";
import { Button, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";


import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordScreen = () => {
  
  const [formData, setFormData] = useState({
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit first", formData);
    e.preventDefault();
    try {
      await mutateFormData(formData);
      console.log("handleSubmit");
    } catch (error) {
      // Handle login error
    }
  };

  const mutateFormData = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/users/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("hello world");

      if (!response.ok) {
        throw new Error("Submission Error! ");
      }

      const data = await response.json();
      toast.success("Reset Email Sent!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Submission Error! Please try again later.");
    }
  };

  const mutation = useMutation(mutateFormData);

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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='E-mail'
            />
          </Form.Item>
        </Form>
      </div>
      <Button
        onClick={handleSubmit}
        className='bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500'
        htmlType='submit'>
        Send
      </Button>
    </div>
  );
};
export default ForgotPasswordScreen;
