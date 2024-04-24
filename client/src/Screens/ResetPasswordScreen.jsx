import { useState } from "react";
import fetena_logo from "../assets/fetena_logo.png";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordScreen = () => {
 
  const [form] = Form.useForm();

  const location = useLocation()
  const currentUrl = location.pathname
  const parts = currentUrl.split('/');
  const token = parts[parts.length - 1];

  const [isDisabled, setIsDisabled] = useState(true);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [Loading, setLoading] = useState(false);
    const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    
const handleSubmit = async (e) => {
    console.log("handleSubmit first", formData);
    e.preventDefault();
    try {
      await mutateFormData(formData);
      console.log("handleSubmit");
    } catch (error) {
      // Handle login error
    }
  }
  const mutateFormData = async (formData) => {
    try {
      const response = await fetch( `http://localhost:8080/users/resetpassword/${token}`, {
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

  const handleConfirmPassword = (rule, value, callback) => {
    const password = form.getFieldValue("password");
    if (value && password !== value) {
      setIsDisabled(true);
      callback("The two passwords that you entered do not match!");
    } else {
      setIsDisabled(false);
      callback();
    }
  };

  const handleStrongPassword = (rule, value, callback) => {
    if (value !== "" && !regEx.test(value)) {
      setIsDisabled(true);
      callback(
        "Password must be 8+ long & contain at least a special character, a number, uppercase and & lowercase character!"
      );
    } else {
      setIsDisabled(false);
      callback();
    }
  };

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
        <h1 className='text-3xl font-bold'>Reset Password</h1>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-md font-semibold '>
          Enter your new password and make sure not to forget it.
        </h2>
        <Form
          className='max-w-full'
          layout='vertical'
          name='dependencies'
          form={form}
          onFinish={handleSubmit}>
          <Form.Item
            className='w-full'
            name='password'
            label='Enter your new password:'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { validator: handleStrongPassword },
            ]}>
            <Input.Password
              className='w-full'
              name='password'
              onChange={handleChange}
              value={formData.password}
              required
            />
          </Form.Item>

          <Form.Item
            className='w-full'
            name='confirmPassword'
            dependencies={["password"]}
            hasFeedback
            label='Confirm your Password:'
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              { validator: handleConfirmPassword },
            ]}>
            <Input.Password
              name='confirmPassword'
              onChange={handleChange}
              value={formData.confirmPassword}
              className='w-full'
              required
            />
          </Form.Item>

          <Form.Item
            label=' '
            className='flex flex-col items-center justify-center'
            colon={false}>
            <Button
              type='default'
              onClick={handleSubmit}
              className='bg-primary-500 text-white hover:text-primary-500 hover:bg-white text-lg flex items-center justify-center px-10 py-5 '
              htmlType='submit'
              disabled={isDisabled}>
              {Loading ? "Loading..." : " Reset Password "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ResetPasswordScreen;
