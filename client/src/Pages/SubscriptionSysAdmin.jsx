import { Table } from "antd"
import { getAllTransactions } from "../Redux/features/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
Link

const SubscriptionSysAdmin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [transactionHistory, setTransactionHistory] = useState([])

    const { user } = useSelector((state) => state.auth)
    
    const columns = [
      {
        title: "Reference Number",
        dataIndex: "tx_ref",
        key: "tx_ref",
      },
      {
        title: "Organization",
        dataIndex: "organizationName",
          key: "organizationName",
        render: (text, record) => (
            <Link to={`/dashboard/organizations/${record.organization_id}`}>
                {text}
            </Link>
        )
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

const fetchSubscriptionsList = () => {
  dispatch(getAllTransactions())
    .then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        const tempArray = res.payload.data.data;
        if (!tempArray.length) return;
        
          for (const transaction of tempArray) {
              setTransactionHistory((prev) => [...prev, {
                  key: transaction._id,
                  tx_ref: transaction.tx_ref,
                  organizationName: transaction.organization.name,
                  organization_id: transaction.organization._id,
                  subscription: transaction.subscription,
                  amount: transaction.amount,
                  startDate: transaction.startDate,
                  endDate: transaction.endDate
            }]);
          }

      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("There is some error in the server!");
    });
};

    useEffect(() => {
    if (!user.isSystemAdmin) {
        navigate("/dashboard")
        return
    }
  fetchSubscriptionsList();
}, []);

  return (
      <div className='flex flex-col gap-4 items-start'>
      <h1 className='text-2xl font-bold text-blue-900 text-left'>
        Subscriptions List
          </h1>
          <Table className="w-full" columns={columns} dataSource={transactionHistory} />
          </div>
  )
}
export default SubscriptionSysAdmin