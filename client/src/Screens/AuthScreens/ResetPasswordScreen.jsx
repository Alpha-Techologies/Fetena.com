import { useEffect, useState } from "react";
import fetena_logo from "../../assets/fetena_logo_primary.svg";
import auth_bg from "../../assets/auth_bg.jpg";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Redux/features/authActions";

const ResetPasswordScreen = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  });

  const [form] = Form.useForm();

  const location = useLocation()
  const currentUrl = location.pathname
  const parts = currentUrl.split('/');
  const token = parts[parts.length - 1];
  const loading = useSelector((state) => state.auth.loading);

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

    const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    
const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetPassword({formData, token})).then((res) => {
      console.log(res, "response");
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Password Reset Successful!");
      } else {
        console.log(res.payload.message);
        toast.error(res.payload.message);
      }
    }).catch((error) => {
      console.log(error);
      toast.error("Something is wrong!");
    });
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
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${auth_bg})`,
      }}
      className='flex flex-col items-center justify-center h-screen gap-4 bg-cover bg-no-repeat text-white'>
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
      <div className='flex flex-col items-center justify-center gap-4 '>
        <h2 className='text-md font-semibold '>
          Enter your new password and make sure not to forget it.
        </h2>
        <Form
          className='w-11/12 text-white'
          layout='vertical'
          name='dependencies'
          form={form}
          onFinish={handleSubmit}>
          <Form.Item
            className='w-full '
            name='password'
            // label='Enter your new password:'
            labelClassName='text-white'
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
              placeholder="Enter your new password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </Form.Item>

          <Form.Item
            className='w-full'
            labelClassName='text-white'
            name='confirmPassword'
            dependencies={["password"]}
            hasFeedback
            // label='Confirm your Password:'
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
              placeholder="Confirm your new password"
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
              {loading ? "Loading..." : " Reset Password "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ResetPasswordScreen;
