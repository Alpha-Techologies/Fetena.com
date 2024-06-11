import React, { useState, useEffect } from "react"; // Import useState hook
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import Button from "../../Components/Button";
import fetena_logo from "../../assets/fetena_logo_primary.svg";
import auth_bg from "../../assets/auth_bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../Redux/features/authActions";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Use useLocation hook to get query parameters

  const verifyToken = async (user) => {
    try {
      dispatch(verifyEmail(user)).then((res) => {
        console.log(res, "response");
        if (res.payload.success) {
          setLoading(false)
          toast.success("Email verified successfully! Login to your account!");
          // navigate("/sign-in");
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
      verifyToken({ token, email });
    } else {
      setError(true);
    }
  };

  // Call handleVerify when component mounts
  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${auth_bg})`,
      }}
      className='flex flex-col items-center justify-center h-screen gap-4 bg-cover bg-no-repeat '>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img
          className='w-40'
          src={fetena_logo}
          alt='Fetena.com Logo'
        />
        <h1 className='text-3xl font-bold text-white'>Account Confirmed</h1>
        <p className="text-white">Login to your account and start using Fetena.com</p>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-white">Error occurred while verifying email.</p>
        ) : (
          <Link to='/sign-in'>
            <Button text='Login' />
          </Link>
        )}
      </div>
    </div>

  );
};

export default VerifyEmail;
