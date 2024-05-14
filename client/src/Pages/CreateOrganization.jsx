import { Button, Form, Input, Radio, Tag,Card } from "antd";
import { createOrganization } from "../Redux/features/dataActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateOrganization = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    address: "",
    description: "",
    website: "",
    phone: "",
    email: "",
  };

  const onFinish = (values) => {
    dispatch(createOrganization(values))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          form.resetFields();
          toast.success("Organization created successfully");
          navigate('/dashboard/organizations'); // Redirect here


        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong");
      });
  };

  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>
        Create Organization
      </h1>
      <Card
              style={{ width: "60%" }}
              className="px-4"
             
            >
      <Form
        className='w-full'
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        layout='vertical'>
        <Form.Item
          label='Organization Name'
          required
          name={"name"}
          tooltip='This is a required field'>
          <Input placeholder='Enter your organization name' />
        </Form.Item>
        <Form.Item
          label='Description'
          required
          name={"description"}
          tooltip={{
            title: "Write a description about your organization",
          }}>
          <Input placeholder='Enter Descirption' />
        </Form.Item>
        <Form.Item
          label='Address'
          name={"address"}
          required>
          <Input placeholder='Enter your address' />
        </Form.Item>
        <Form.Item
          label='Email'
          name={"email"}>
          <Input placeholder='Enter your organziation email' />
        </Form.Item>
        <Form.Item
          label='Phone Number'
          name={"phone"}>
          <Input placeholder='Enter your orgnaization phone number' />
        </Form.Item>
        <Form.Item
          label='Website'
          name={"website"}>
          <Input placeholder='Enter your organization website' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'>
            Create Organization
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};
export default CreateOrganization;
