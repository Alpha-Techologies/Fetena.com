import { useState } from "react";
import { Link } from "react-router-dom";
import fetena_logo from "../../assets/fetena_logo.png";
import { Form, Input, Button } from "antd";
import { Icon } from "@iconify/react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit first");
    e.preventDefault();
    try {
      await mutateFormData(formData);
      console.log("handleSubmit");

      navigate("/");
    } catch (error) {
      // Handle login error
    }
  };

  const mutateFormData = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("hello world");

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      await response.json();
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect here
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in. Please try again later.");
    }
  };

  const mutation = useMutation(mutateFormData);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Link to='/'>
          <img
            className='w-40'
            src={fetena_logo}
            alt='Fetena.com Logo'
          />
        </Link>
        <h1 className='text-3xl font-bold'>Log In</h1>
        <p>
          Don't have an account?{" "}
          <Link
            to='/register'
            className='text-primary-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
      <div className='flex flex-col gap-4 shadow-md px-16 py-8 rounded-lg'>
        <h2 className='text-md font-semibold'>Log In with your Credentials</h2>
        <Form>
          <Form.Item
            name='email'
            rules={[
              {
                type: "email",
                message: "Please input a valid email address!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}>
            <Input
              className='max-w-[300px] min-w-[100px]'
              prefix={<Icon icon='mdi-light:email' />}
              type='email'
              placeholder='Email'
              onChange={handleChange}
              name='email'
              value={formData.email}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input
              prefix={<Icon icon='mdi-light:lock' />}
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={formData.password}
            />
          </Form.Item>
          <Link
            to='/forgot-password'
            className='text-primary-500 hover:underline'>
            Forgot Password?
          </Link>
          <button onClick={handleSubmit}>Log In</button>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
