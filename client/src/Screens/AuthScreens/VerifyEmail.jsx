import React, { useState, useEffect } from "react"; // Import useState hook
import { useMutation } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import Button from "../../Components/Button";
import fetena_logo from "../../assets/fetena_logo.png";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../Redux/features/authActions";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Use useLocation hook to get query parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyToken = async (user) => {
    try {
      dispatch(verifyEmail(user)).then((res) => {
        console.log(res, "response");
        if (res.payload.success) {
          toast.success("Email verified successfully! Login to your account!");
          navigate("/login");
        } else {
          // console.log(res.payload.message);
          toast.error(res.payload.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleVerify = () => {
    const query = new URLSearchParams(location.search); // Get query parameters using location.search
    const token = query.get("token");
    const email = query.get("email");
    if (token && email) {
      setLoading(true); // Set loading to true before mutating
      verifyToken({ verificationToken: token, email });
    } else {
      setError(true);
    }
  };

  // Call handleVerify when component mounts
  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img
          className='w-20'
          src={fetena_logo}
          alt='Fetena.com Logo'
        />
        <h1 className='text-3xl font-bold'>Account Confirmed</h1>
        <p>Login to your account and start using Fetena.com</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error occurred while verifying email.</p>
        ) : (
          <Link to='/sign-in'>
            <Button text='Login' />
          </Link>
        )}
      </div>
    </div>

    // <div>
    //     <h2>Account Confirmed</h2>
    //     {loading ? (
    //         <p>Loading...</p>
    //     ) : error ? (
    //         <p>Error occurred while verifying email.</p>
    //     ) : (
    //         <Link to="/sign-in">
    //             <Button text="Login" />
    //         </Link>
    //     )}
    // </div>
  );
};

export default VerifyEmail;
