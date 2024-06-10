import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { paymentVerify } from "../Redux/features/dataActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import { toast } from "react-toastify";

const PaymentVerify = () => {

    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const txRef = searchParams.get("ref");
    const payload = { tx_ref: txRef };

    const handleVerification = () => {

        dispatch(paymentVerify(payload))
        .then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setLoading(false);
                setError(false);
                toast.success(res.payload.message);
                navigate("/dashboard/settings")
            } else {
                setLoading(false);
                setError(true);
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            setError(true);
            toast.error("There is some error in the server!");
        });
    };

    useEffect(() => {
        handleVerification();
    }, []);

  return (
    <div
      className='flex flex-col items-center justify-center h-screen gap-4 bg-cover bg-no-repeat '>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold text-primary-500'>Verify Payment</h1>
        <p className='text-primary-500'>
          Verify your payment!
        </p>
        {loading ? (
          <Spin size='large' />
        ) : error ? (
          <p className='text-primary-500'>Error occurred while verifying payment.</p>) : (
            <p className='text-primary-500'>Payment verified successfully.</p>
          )
        // ) : (
        //     // <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded" onClick={handleVerification}>Verify</button>
          
        // )
    }
      </div>
    </div>
  );
};
export default PaymentVerify;
