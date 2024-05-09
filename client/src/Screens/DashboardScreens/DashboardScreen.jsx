import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Avatar, Layout, Menu, Badge, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, Link } from "react-router-dom";
import fetena_logo from "../../assets/fetena_logo.png";
import { logoutUser } from "../../Redux/features/authActions";
import Loading from "../../Components/Loading";
const { Header, Content, Footer, Sider } = Layout;



const DashboardScreen = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const { loading } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function getItem(label, key, icon, children, type, danger, disabled) {
    return {
      key,
      icon,
      children,
      label,
      danger,
      disabled,
      type,
    };
  }
  const sidebarItems = [
    getItem(
      <Link to=''>Dashboard</Link>,
      "1",
      <Icon
        className='w-5 h-5'
        icon='akar-icons:dashboard'
      />
    ),
    getItem(
      <Link to='exams'>Organizations</Link>,
      "2",
      <Icon
        className='w-4 h-4'
        icon='grommet-icons:organization'
      />
    ),
    getItem(
      <Link to='exams'>Exams</Link>,
      "3",
      <Icon
        className='w-5 h-5'
        icon='healthicons:i-exam-multiple-choice-outline'
      />
    ),
    getItem(
      <Link to='exams'>Results</Link>,
      "4",
      <Icon
        className='w-5 h-5'
        icon='ph:exam'
      />
    ),
    getItem(
      <Link to='exams'>Certifications</Link>,
      "5",
      <Icon
        className='w-5 h-5'
        icon='la:award'
      />
    ),
    { type: "divider" },
    getItem(
      <Link to='exams'>Training Videos</Link>,
      "6",
      <Icon
        className='w-5 h-5'
        icon='healthicons:i-training-class-outline'
      />
    ),
    getItem(
      <Link to='exams'>Support</Link>,
      "7",
      <Icon
        className='w-5 h-5'
        icon='material-symbols:contact-support-outline'
      />
    ),
  ];

  const workspaceDropdownItems = [
    {
      label: <Link>Personal Workspace</Link>,
      key: "1",
      icon: <Icon icon='ep:user' />,
    },
    {
      type: "divider",
    },
    {
      label: "Your Organizations",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      label: (
        <span
          className='text-primary-500 cursor-pointer'
          >
          Join Organization
        </span>
      ),
      key: "3",
      icon: <Icon className="text-primary-500" icon='material-symbols:add' />,
    },
  ];

  const profileDropdownItems = [
    {
      label: <Link to={"profile"}>Profile</Link>,
      key: "1",
      icon: <Icon icon='ep:user' />,
    },
    {
      type: "divider",
    },
    {
      label: (
        <span
          className="text-error-500 cursor-pointer"
          onClick={() => {
            dispatch(logoutUser());
          }}>
          Logout
        </span>
      ),
      key: "3",
      icon: <Icon className="text-error-500" icon='carbon:logout' />,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme='light'>
        <Link
          to={""}
          className='demo-logo-vertical p-4 flex justify-center '>
          <img
            src={fetena_logo}
            alt='Fetena.com Logo'
            className='w-24'
          />
        </Link>
        <Menu
          theme='light'
          defaultSelectedKeys={["1"]}
          mode='inline'
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          className='flex justify-between items-center'
          style={{
            padding: 16,
            background: "white",
          }}>
          <h1 className='text-2xl'>
            {"Hello there, " + user.firstName + " " + user.lastName + "!"}
          </h1>
          <div className='flex items-center justify-center gap-4'>
            <Dropdown
              menu={{
                items: workspaceDropdownItems,
              }}
              trigger={["click"]}>
              <div className='text-primary-500 border border-primary-200 bg-primary-200 bg-opacity-30 hover:bg-opacity-50 h-10 px-8 py-4 rounded-md flex items-center justify-center cursor-pointer gap-2'>
                <div className="flex items-center justify-center gap-2">
                  <Icon icon='octicon:organization-24' />
                  Personal Workspace
                </div>
                <Icon icon='gridicons:dropdown' />
              </div>
            </Dropdown>
            <Link to='notifications'>
              <Avatar
                className='cursor-pointer flex items-center justify-center'
                size='large'
                icon={<Icon icon='iconamoon:notification' />}
              />
            </Link>
            <Dropdown
              menu={{
                items: profileDropdownItems,
              }}
              trigger={["click"]}>
              <Avatar
                className='cursor-pointer flex items-center justify-center'
                size='large'
                icon={
                  <img
                    src={`http://localhost:8080/${user.profilePhoto}`}
                    alt='avatar'
                  />
                }
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}>
          {
            // TODO: loading screen issue becasue of infinte loop useEffect from the parent component into the child pages

            false ? (
              <div className='flex items-center justify-center h-full'>
                <Loading />
              </div>
            ) : (
              <Outlet />
            )
          }
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}></Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardScreen;
