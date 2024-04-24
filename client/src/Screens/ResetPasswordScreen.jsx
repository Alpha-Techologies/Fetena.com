import { useState } from "react";
import fetena_logo from "../assets/fetena_logo.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

const ResetPasswordScreen = () => {
 
  const [form] = Form.useForm();

  const [isDisabled, setIsDisabled] = useState(true);

  const [Loading, setLoading] = useState(false);
    const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    
const handleSubmit = (values) => {
    console.log(values)
}

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
