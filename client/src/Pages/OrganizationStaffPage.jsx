import { Button, Table, Popconfirm } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activateStaff, deactivateStaff, organizationStaff } from "../Redux/features/dataActions"
import { toast } from "react-toastify"

const OrganizationStaffPage = () => {

  const { workspace } = useSelector(state => state.data)
  const [staffs, setStaffs] = useState([])
  const dispatch = useDispatch()
  const url = 'http://localhost:8080'

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };

  const fetchOrganizationStaffs = () => {
    setStaffs([])
    dispatch(organizationStaff(workspace._id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res.payload.data.data);
          const data = res.payload.data.data;
          const updatedStaffs = data.map((item) => ({
            id: item.user._id,
            profilePhoto: item.user.profilePhoto,
            fullName: item.user.fullName,
            email: item.user.email,
            phoneNumber: item.user.phoneNumber,
            status: item.status,
          }));
          setStaffs(updatedStaffs);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  }

  const handleActivate = (userId) => {
    setConfirmLoading(true);
    dispatch(activateStaff({id: workspace._id, userId: userId}))
      .then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res);
          setOpen(false);
          setConfirmLoading(false);
          fetchOrganizationStaffs()
        } else {
          setOpen(false);
          setConfirmLoading(false);
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
    setConfirmLoading(true);

      });
    
  };
  const handleDeactivate = (userId) => {
    setConfirmLoading(true);
    dispatch(deactivateStaff({ id: workspace._id, userId: userId }))
      .then((res) => {
        
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res);
          setOpen(false);
          setConfirmLoading(false);
          fetchOrganizationStaffs();
        } else {
          setOpen(false);
          setConfirmLoading(false);
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
        setConfirmLoading(true);
      });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    fetchOrganizationStaffs()
  }, [])

  const columns = [
    {
      title: "Pic.",
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      render: (text) => (
        <img
          className='rounded-full w-5 h-5'
          src={url + text}
        />
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "status",
      dataIndex: "id",
      render: (text, record) => (
        <Popconfirm
          title='Warning'
          description='Are you sure to continue?'
          open={open}
          onConfirm={
            record.status === "pending"
              ? () => handleActivate(text)
              : record.status === "activated"
              ? () => handleDeactivate(text)
              : () => handleActivate(text)
          }
          okButtonProps={{
            loading: confirmLoading,
          }}
          onCancel={handleCancel}>
          <Button
            className={`${
              record.status === "pending"
                ? "bg-blue-500"
                : record.status === "activated"
                ? "bg-red-500"
                : "bg-green-500"
            } text-white`}
            onClick={showPopconfirm}>
            {record.status === "pending"
              ? "Approve"
              : record.status === "activated"
              ? "Deactivate"
              : "Activate"}
          </Button>
        </Popconfirm>
      ),
    },
  ];


  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>
        Organizations Staffs
      </h1>
      <div className='flex flex-col gap-4 items-start my-4'>
        <Table
          className="w-full"
          columns={columns}
          dataSource={staffs}
          rowKey={"id"}
        />
        ;
      </div>
    </div>
  );
}
export default OrganizationStaffPage