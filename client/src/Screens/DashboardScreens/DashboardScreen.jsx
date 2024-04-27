import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Avatar, Layout, Menu, theme, Badge } from "antd";
import { Outlet, Link } from "react-router-dom";
import fetena_logo from "../../assets/fetena_logo.png";

const DashboardScreen = () => {
  const [collapsed, setCollapsed] = useState(false);

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
        <div className='demo-logo-vertical p-4'>
          <img
            src={fetena_logo}
            alt='Fetena.com Logo'
            className=''
          />
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={["1"]}
          mode='inline'
          items={adminItems}
        />
      </Sider>
      <Layout>
        <Header
          className='flex justify-between items-center'
          style={{
            padding: 16,
            background: colorBgContainer,
          }}>
          <h1 className='text-2xl'>
            {"Hello there, "}
          </h1>
          <div className='flex items-center justify-center gap-4'>
            <Link to='notifications'>
              <Badge
                size='small'>
                <Avatar
                  className='cursor-pointer flex items-center justify-center'
                  size='large'
                  icon={<Icon icon='iconamoon:notification' />}
                />
              </Badge>
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
          <ToastContainer />
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <ReactLoading
                type='balls'
                color='#21BFD4'
              />
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
