import { useDispatch, useSelector } from "react-redux";
import { paymentIntent } from "../Redux/features/dataActions";
import { toast } from "react-toastify";
import moment from "moment";
import { Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const { workspace } = useSelector((state) => state.data);

  const paymentHandler = (data) => {
    setIsLoading(true)
    dispatch(paymentIntent({ id: workspace._id, paymentData: data }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false)
          console.log(res);
          toast.success("Request fullfilled successfully");
          window.location.href = res.payload.chapa.data.checkout_url
        } else {
          setIsLoading(false)
          toast.error("Error in fullfiling request");
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  return (
    <div className=''>
      <div>
        <h2 className='text-3xl font-bold tracki text-center mt-12 sm:text-5xl '>
          Subscription
        </h2>
        <p className='max-w-3xl mx-auto mt-4 text-xl text-center '>
          You are currently on our free plan. You have{" "}
          <span className='text-primary-500 text-3xl'>30</span> days left.
        </p>
      </div>
      <div className='flex flex-wrap gap-4 items-center justify-center my-8'>
        <div className='relative p-8 min-w-64 border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold '>Free</h3>
            <p className='mt-4 flex flex-col items-center '>
              <span className='text-5xl font-extrabold tracking-tight'>
                ETB 0
              </span>
              <span className='ml-1 text-xl font-semibold'>/month</span>
            </p>
            <p className='mt-6 '>You just want to discover</p>
            {/* <ul
              role='list'
              className='mt-6 space-y-6'>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>AI Monitoring</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Exam Generation</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Quizz (1 credits) </span>
              </li>
            </ul> */}
          </div>
          <a className='bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-white mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'>
            Current Plan
          </a>
        </div>
        <div className='relative p-8 min-w-64  border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold '>Pro</h3>
            <p className='absolute top-0 py-1.5 px-4 bg-primary-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2'>
              Most popular
            </p>
            <p className='mt-4 flex flex-col items-baseline '>
              <span className='text-5xl font-extrabold tracking-tight'>
                ETB 9,999.99
              </span>
              <span className='ml-1 text-xl font-semibold'>/month</span>
            </p>
            <p className='mt-6 '>
              A license for your school or university - save 25%
            </p>
            {/* <ul
              role='list'
              className='mt-6 space-y-6'>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>30 credits</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Powered by GPT-4 (more accurate)</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Generate video (2 credits)</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Quizz (1 credits) </span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Analytics on the quizz</span>
              </li>
            </ul> */}
          </div>
          <a
            onClick={() =>
              paymentHandler({
                amount: 9999.99,
                currency: "ETB",
                subscription: "yearly",
                startDate: moment().format(),
                endDate: moment().add(365, "days").format(),
              })
            }
            className='bg-primary-500 text-white hover:text-white hover:bg-primary-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'>
            {isLoading ? <Spin /> : "Buy Now"}
          </a>
        </div>
        <div className='relative p-8 min-w-64 border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold '>Monthly Plan</h3>
            <p className='mt-4 flex flex-col items-baseline '>
              <span className='text-5xl font-extrabold tracking-tight'>
                ETB 999.99
              </span>
              <span className='ml-1 text-xl font-semibold'>/month</span>
            </p>
            <p className='mt-6 '>A license for your school or university</p>
            {/* <ul
              role='list'
              className='mt-6 space-y-6'>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>10 Credits</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Generate video (2 credits)</span>
              </li>
              <li className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='flex-shrink-0 w-6 h-6 text-emerald-500'
                  aria-hidden='true'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                <span className='ml-3 '>Quizz (1 credits) </span>
              </li>
            </ul> */}
          </div>
          <a
            onClick={() =>
              paymentHandler({
                amount: 999.99,
                currency: "ETB",
                subscription: "monthly",
                startDate: moment().format(),
                endDate: moment().add(30, "days").format(),
              })
            }
            className='bg-primary-50 text-primary-700 hover:text-white hover:bg-primary-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'>
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};
export default Pricing;
