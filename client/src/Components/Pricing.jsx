import { useDispatch, useSelector } from "react-redux";
import {
  getOrganizationTransactions,
  paymentIntent,
} from "../Redux/features/dataActions";
import { toast } from "react-toastify";
import moment from "moment";
import { Badge, Descriptions, Result, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const Pricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { workspace } = useSelector((state) => state.data);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionItems, setSubscriptionItems] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState(null);

  const paymentHandler = (data) => {
    setIsLoading(true);
    dispatch(paymentIntent({ id: workspace._id, paymentData: data }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          console.log(res);
          toast.success("Request fullfilled successfully");
          window.location.href = res.payload.chapa.data.checkout_url;
        } else {
          setIsLoading(false);
          toast.error("Error in fullfiling request");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  const columns = [
    {
      title: "Reference Number",
      dataIndex: "tx_ref",
      key: "tx_ref",
    },
    {
      title: "Subscirption",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Paid On",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Expired On",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];


  const paymentStatus = () => {
    dispatch(getOrganizationTransactions(workspace._id))
      .then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          const tempArray = res.payload.data.data;
          if (!tempArray.length) return;
          const sortedData = _.sortBy(
            tempArray,
            (item) => -new Date(item.date).getTime()
          );
          if (sortedData[0].status === "pending") return 
          console.log(sortedData);
          setSubscriptionStatus({
            status: sortedData[0].status,
            startDate: sortedData[0].startDate,
            endDate: sortedData[0].endDate,
            subscription: sortedData[0].subscription,
            tx_ref: sortedData[0].tx_ref,
            _id: sortedData[0]._id,
            amount: sortedData[0].amount,
          });
          const diff = moment.duration(
            moment(sortedData[0].endDate).diff(moment(sortedData[0].startDate))
          );
          setTransactionHistory(tempArray)
          
          setSubscriptionItems([
            {
              key: "1",
              label: "Subscription",
              children: <span className="capitalize">{sortedData[0].subscription}</span>,
            },
            {
              key: "2",
              label: "Status",
              children: <span className="capitalize">{sortedData[0].status}</span>,
            },
            {
              key: "3",
              label: "Automatic Renewal",
              children: "NO",
            },
            {
              key: "4",
              label: "Order time",
              children: <span className="capitalize">{sortedData[0].startDate}</span>,
            },
            {
              key: "5",
              label: "Expiry Date",
              children: <span className="capitalize">{sortedData[0].endDate}</span>,
            },
            {
              key: "6",
              label: "Expires in",
              children: diff.humanize(),
            },
            {
              key: "7",
              label: "Current Status",
              children: (
                <Badge
                  status='processing'
                  text='Running'
                />
              ),
              span: 3,
            },

            {
              key: "8",
              label: "Order Number",
              children: (<span className="capitalize">{sortedData[0].tx_ref}</span>),
            },
            {
              key: "9",
              label: "Amount Paid",
              children: <span className="capitalize">{sortedData[0].amount}</span>,
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  useEffect(() => {
    paymentStatus();
  }, []);

  return (
    <div>
      {subscriptionStatus === null ? (
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
      ) : (
        <div>
          <Result
            status='success'
            title='You have successfully subscribed!'
            // subTitle={`Order number: ${
            //   subscriptionStatus.tx_ref
            // } You have subscribed for ${
            //   subscriptionStatus.subscription
            // } subscription with price ${
            //   subscriptionStatus.amount
            // } ETB on ${moment(subscriptionStatus.startDate).format(
            //   "DD-MM-YYYY"
            // )} which will expire on ${moment(subscriptionStatus.endDate).format(
            //   "DD-MM-YYYY"
            // )}.`}
          />
          {/* <p>{`Order number: <span className="italic"> ${
            subscriptionStatus.tx_ref
          } </span> You have subscribed for <span className="italic"> ${
            subscriptionStatus.subscription
          } </span> subscription with price ${
            subscriptionStatus.amount
          } ETB on <span className="italic"> ${moment(
            subscriptionStatus.startDate
          ).format(
            "DD-MM-YYYY"
          )} </span> which will expire on <span className="italic"> ${moment(
            subscriptionStatus.endDate
          ).format("DD-MM-YYYY")} </span>.`}</p> */}
          <Descriptions
            title='Subscription Status'
            bordered
            items={subscriptionItems}
            />
            <h2 className="text-xl font-semibold my-2">Transaction History</h2>
            <Table columns={columns} dataSource={transactionHistory} />
        </div>
      )}
    </div>
  );
};
export default Pricing;
