import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Avatar, Layout, Menu, theme, Badge } from "antd";
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
  const menuItems = [
    getItem(
      <Link to=''>Dashboard</Link>,
      "1",
      <Icon icon='akar-icons:dashboard' />
    ),
    getItem(
      <Link to='exams'>Exams</Link>,
      "2",
      <Icon className="w-4 h-4" icon='healthicons:i-exam-multiple-choice-outline' />
    ),
    { type: "divider" },
    getItem(
      <Link to='create-project'>Join Organization</Link>,
      "5",
      <Icon icon='mdi:create-new-folder-outline' />
    ),
    getItem(
      <span onClick={() => {dispatch(logoutUser())}}>Logout</span>,
      "6",
      <Icon icon='humbleicons:logout' />,
      null,
      null,
      true
    ),
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
        <div className='demo-logo-vertical p-4 flex justify-center '>
          <img
            src={fetena_logo}
            alt='Fetena.com Logo'
            className='w-24'
          />
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={["1"]}
          mode='inline'
          items={menuItems}
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
            {"Hello there, " + user.firstName + " " + user.lastName +"!"}
          </h1>
          <div className='flex items-center justify-center gap-4'>
            <Link to='notifications'>
                <Avatar
                  className='cursor-pointer flex items-center justify-center'
                  size='large'
                  icon={<Icon icon='iconamoon:notification' />}
                />
            </Link>
            <Link to='profile'>
              <Avatar
                className='cursor-pointer flex items-center justify-center'
                size='large'
                icon={<Icon icon='ep:user' />}
              />
            </Link>
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
          )}
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
