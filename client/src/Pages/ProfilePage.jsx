import { Icon } from "@iconify/react";
import { Menu, Button, Form, Input, Select, InputNumber,Dropdown  } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateMe, updatePassword } from "../Redux/features/dataActions";
import { getMe } from "../Redux/features/authActions";
const { Option } = Select;

const items = [
  {
    label: "Personal Information",
    key: "personal",
    icon: <Icon icon='ep:user' />,
  },
  {
    label: "Security",
    key: "security",
    icon: <Icon icon='material-symbols-light:security' />,}
];

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [idPhoto,setIdPhoto] = useState();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getMe());
        console.log(res, "res");
        const userData = res.payload.data.data[0];
        setUser(userData);
        form.setFieldsValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
        });
      } catch (error) {
        // Handle error if necessary
        console.log(error);
      }
    };
    // dispatch(getMe()).then((res) => {
    //   console.log(res, "res");
    //   setUser(res.payload.data.data[0]);
    //   setInitialValues({
    //     firstName: res.payload.data.data[0].firstName,
    //     lastName: res.payload.data.data[0].lastName,
    //     email: res.payload.data.data[0].email,
    //     phoneNumber: res.payload.data.data[0].phoneNumber,
    //   });
    // });
    fetchData();
  }, []);
  
  

  console.log(initialValues.firstName, "initialValues");

  const [current, setCurrent] = useState("personal");

  // const [initialValues, setInitialValues] = useState({
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   email: user.email,
  //   phoneNumber: user.phoneNumber
  // });
  console.log(initialValues, "initialValues");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;

  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  const onFinishProfile = async (values) => {
    setIsLoading(true);
    dispatch(updateMe(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        setIsInputDisabled(true);
        dispatch(getMe()).then((res) => {
          setUser(res.payload.data.data[0]);
          // setInitialValues({
          //   firstName: res.payload.data.data[0].firstName,
          //   lastName: res.payload.data.data[0].lastName,
          //   email: res.payload.data.data[0].email,
          //   phoneNumber: res.payload.data.data[0].phoneNumber,
          // });
          // form.setFieldsValue({
          //   ...initialValues,
          // });
        });
        toast.success("Profile updated successfully!")
      } else {
        setIsLoading(false);
        return notify(res.payload.message);
      }
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      toast.error("Something is wrong!");
    });
  };

  const onFinishPassword = (values) => {
    setIsLoading(true);
    dispatch(updatePassword({password: values.password, passwordCurrent: values.passwordCurrent })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
        form1.resetFields();
        toast.success("Password updated successfully!");
      } else {
        setIsLoading(false);
        toast.error(res.payload.message);
      }
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      toast.error("Something is wrong!");
    })
  };

  const prefixSelector = (
    <Form.Item
      name='prefix'
      noStyle>
      <Select
        style={{
          width: 100,
        }}>
        <Option value='251'>+251</Option>
      </Select>
    </Form.Item>
  );

  const handleConfirmPassword = (rule, value, callback) => {
    const password = form1.getFieldValue("password");
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
    <div>
      <div className='flex items-center my-4'>
        <h1 className='text-3xl font-bold'>Profile Details</h1>
      </div>
      <Menu
        onClick={(e) => {
          setCurrent(e.key);
        }}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      {current === "personal" && (
        <div className='flex flex-col gap-4 p-4 bg-white rounded-br-md rounded-bl-md items-center'>
<img
  className="block mx-auto my-2 w-32 h-32 object-cover rounded-full border-4 border-blue-200"
  src={`http://localhost:8080/${user.profilePhoto}`}
  alt="profile"
/>

          <Form
            name='profileDetails'
            form={form}
            labelCol={{
              flex: "150px",
            }}
            labelAlign='left'
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 600,
            }}
            initialValues={{ ...user }}
            onFinish={onFinishProfile}>
              <div className="grid grid-cols-2 gap-x-4 ">

            <Form.Item
              label='First Name'
              name='firstName'
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}>
              <Input disabled={isInputDisabled} />
            </Form.Item>

            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}>
              <Input disabled={isInputDisabled} />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: "Please input your email!" }]}>
              <Input disabled={isInputDisabled} />
            </Form.Item>
            <Form.Item
              label='Phone Number'
              name='phoneNumber'
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}>
              <Input disabled={isInputDisabled} />
            </Form.Item>
            </div>


            <Form.Item
              label=' '
              className='flex gap-4'>
              <Button
                type='default'
                disabled={!isInputDisabled}
                onClick={() => {
                  setIsInputDisabled(false);
                }}
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white mr-4'>
                Edit Profile
              </Button>
              <Button
                type='default'
                htmlType='submit'
                disabled={isInputDisabled}
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white'>
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Form.Item>
            
          </Form>
        </div>
      )}
      {current === "security" && (
        <div className='flex flex-col p-4 gap-4 bg-white items-start rounded-br-md rounded-bl-md'>
          <Form
            name='passwordChange'
            form={form1}
            layout='vertical'
            labelAlign='left'
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 900,
            }}
            onFinish={onFinishPassword}>
            <Form.Item
              label='Current Password'
              name='passwordCurrent'
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='New Password'
              name='password'
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your New Password!",
                },
                { validator: handleStrongPassword },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Confirm New Password'
              name='confirmPassword'
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                { validator: handleConfirmPassword },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item label=' '>
              <Button
                type='default'
                htmlType='submit'
                disabled={isDisabled}
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white'>
                {isLoading ? "Loading..." : "Change Password"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}





  
      
    </div>
  );
};
export default ProfilePage;
