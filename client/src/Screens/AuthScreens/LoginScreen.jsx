import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetena_logo from "../../assets/fetena_logo_primary.svg";
// import Logo from "../../assets/fetena_logo_primary.js";
import auth_bg from "../../assets/auth_bg.jpg";
import { Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getMe } from "../../Redux/features/authActions";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated, "isAuthenticated");
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); 
    }
  })

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
      dispatch(loginUser(formData)).then((res) => {
        console.log(res, "response");
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Logged in successfully!");
          dispatch(getMe()).catch((error) => {
            console.log(error);
            toast.error("Something is wrong in logging in!");
          });
          
          navigate('/dashboard'); // Redirect here
        } else {
          // console.log(res.payload.message);
          toast.error(res.payload.message);
        }
      }).catch((error) => {
        console.log(error);
        toast.error("Something is wrong!")
      });

  };


  return (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${auth_bg})`,
        }}
        className={` flex flex-col items-center justify-center h-screen gap-4  bg-no-repeat bg-cover `}>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Link to='/'>
            <img className="w-40" src={fetena_logo} alt="" />
          </Link>
          <h1 className='text-3xl font-bold text-white'>Log In</h1>
          <p className='text-white'>
            Don't have an account?{" "}
            <Link
              to='/register'
              className='text-primary-100 hover:underline hover:text-white'>
              Sign up
            </Link>
          </p>
        </div>
        <div className='flex flex-col justify-center gap-4 shadow-md px-16 py-8 rounded-lg bg-white'>
          <h2 className='text-md font-semibold'>
            Log In with your Credentials
          </h2>
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
                className='w-full'
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
              <Input.Password
              prefix={<Icon icon='mdi-light:lock' />}
              className="w-full"
                type='password'
                placeholder='Password'
                onChange={handleChange}
                name='password'
                value={formData.password}
              />
            </Form.Item>
            <div className='flex flex-col justify-between gap-2'>
              <Link
                to='/forgot-password'
                className='text-primary-500 hover:underline'>
                Forgot Password?
              </Link>
              <button className="bg-primary-500 hover:bg-primary-900 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Log in</button>
            </div>
          </Form>
        </div>
      </div>
  );
};

export default LoginScreen;
