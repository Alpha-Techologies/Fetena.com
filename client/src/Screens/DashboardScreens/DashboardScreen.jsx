import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Layout,
  Menu,
  Badge,
  Dropdown,
  FloatButton,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrganizationModal from "../../Components/OrganizationModal";

import { Outlet, Link } from "react-router-dom";
import fetena_logo from "../../assets/fetena_logo.png";
import { logoutUser } from "../../Redux/features/authActions";
import Loading from "../../Components/Loading";
import {
  getOneOrganization,
  getUserOrganizations,
  switchWorkspace,
} from "../../Redux/features/dataActions";
import { toast } from "react-toastify";
import {
  switchToPersonalWorkspace,
  switchSidebar,
  currentUserOrganizationsIdAndRole,
} from "../../Redux/features/dataSlice";
import { current } from "@reduxjs/toolkit";
const { Header, Content, Footer, Sider } = Layout;

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [orgModal, setOrgModal] = useState(false);
  const [workspaceDropdownItems, setWorkspaceDropdownItems] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState("personal");
  const { user } = useSelector((state) => state.auth);
  const { workspace } = useSelector((state) => state.data);
  const { currentSidebar } = useSelector((state) => state.data);
  const [userRole, setUserRole] = useState("examinee");
  const [organization, setOrganization] = useState({});
  const [userOrganizations, setUserOrganizations] = useState([]);

  const fetchUserOrganizations = () => {
    dispatch(getUserOrganizations())
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res);
          const userOrganizations = res.payload.data.data;
          setUserOrganizations(userOrganizations);
          console.log(userOrganizations);
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  useEffect(() => {
    if (workspace === null) {
      setUserRole("examinee");
      setCurrentWorkspace("peronal");
    } else if (workspace.adminUser._id === user._id) {
      setUserRole("admin");
      setCurrentWorkspace(workspace._id);
    } else {
      setUserRole("examiner");
      setCurrentWorkspace(workspace._id);
    }

    fetchUserOrganizations();
  }, []);

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

  const examineeSidebarItems = [
    getItem(
      <Link to="" onClick={() => dispatch(switchSidebar("1"))}>
        Dashboard
      </Link>,
      "1",
      <Icon className="w-5 h-5" icon="akar-icons:dashboard" />
    ),
    getItem(
      <Link to="organizations" onClick={() => dispatch(switchSidebar("2"))}>
        Organizations
      </Link>,
      "2",
      <Icon className="w-4 h-4" icon="grommet-icons:organization" />
    ),
    getItem(
      <Link to="exams" onClick={() => dispatch(switchSidebar("3"))}>
        Exams
      </Link>,
      "3",
      <Icon
        className="w-5 h-5"
        icon="healthicons:i-exam-multiple-choice-outline"
      />
    ),
    getItem(
      <Link to="results" onClick={() => dispatch(switchSidebar("4"))}>
        Results
      </Link>,
      "4",
      <Icon className="w-5 h-5" icon="ph:exam" />
    ),
    getItem(
      <Link to="certifications" onClick={() => dispatch(switchSidebar("5"))}>
        Certifications
      </Link>,
      "5",
      <Icon className="w-5 h-5" icon="la:award" />
    ),
    { type: "divider" },
    getItem(
      <Link to="trainingVideos" onClick={() => dispatch(switchSidebar("6"))}>
        Training Videos
      </Link>,
      "6",
      <Icon className="w-5 h-5" icon="healthicons:i-training-class-outline" />
    ),
    getItem(
      <Link to="support" onClick={() => dispatch(switchSidebar("7"))}>
        Support
      </Link>,
      "7",
      <Icon
        className="w-5 h-5"
        icon="material-symbols:contact-support-outline"
      />
    ),
  ];

  const examinerSidebarItems = [
    getItem(
      <Link to="" onClick={() => dispatch(switchSidebar("1"))}>
        Dashboard
      </Link>,
      "1",
      <Icon className="w-5 h-5" icon="akar-icons:dashboard" />
    ),
    getItem(
      <Link to="exams" onClick={() => dispatch(switchSidebar("2"))}>
        My Exams
      </Link>,
      "2",
      <Icon
        className="w-5 h-5"
        icon="healthicons:i-exam-multiple-choice-outline"
      />
    ),
    getItem(
      <Link to="certifications" onClick={() => dispatch(switchSidebar("3"))}>
        Certifications
      </Link>,
      "3",
      <Icon className="w-5 h-5" icon="la:award" />
    ),
    getItem(
      <Link to="exam-monitor" onClick={() => dispatch(switchSidebar("4"))}>
        Exam Monitoring
      </Link>,
      "4",
      <Icon className="w-5 h-5" icon="ic:outline-monitor-heart" />
    ),
    { type: "divider" },
    getItem(
      <Link to="trainingVideos" onClick={() => dispatch(switchSidebar("5"))}>
        Training Videos
      </Link>,
      "5",
      <Icon className="w-5 h-5" icon="healthicons:i-training-class-outline" />
    ),
    getItem(
      <Link to="support" onClick={() => dispatch(switchSidebar("6"))}>
        Support
      </Link>,
      "6",
      <Icon
        className="w-5 h-5"
        icon="material-symbols:contact-support-outline"
      />
    ),
  ];

  const orgAdminSidebarItems = [
    getItem(
      <Link to="" onClick={() => dispatch(switchSidebar("1"))}>
        Dashboard
      </Link>,
      "1",
      <Icon className="w-5 h-5" icon="akar-icons:dashboard" />
    ),
    getItem(
      <Link to="exams" onClick={() => dispatch(switchSidebar("2"))}>
        Exams
      </Link>,
      "2",
      <Icon
        className="w-5 h-5"
        icon="healthicons:i-exam-multiple-choice-outline"
      />
    ),
    getItem(
      <Link to="certifications" onClick={() => dispatch(switchSidebar("3"))}>
        Certifications
      </Link>,
      "3",
      <Icon className="w-5 h-5" icon="la:award" />
    ),

    // getItem(
    //   <Link to="questionbank" onClick={() => dispatch(switchSidebar("3"))}>
    //     Question Bank
    //   </Link>,
    //   "3",
    //   <Icon
    //     className="w-5 h-5"
    //     icon="healthicons:i-exam-multiple-choice-outline"
    //   />
    // ),
    getItem(
      <Link to="exam-monitor" onClick={() => dispatch(switchSidebar("4"))}>
        Exam Monitoring
      </Link>,
      "4",
      <Icon className="w-5 h-5" icon="ic:outline-monitor-heart" />
    ),
    getItem(
      <Link
        to='activities'
        onClick={() => dispatch(switchSidebar("5"))}>
        Activity Log
      </Link>,
      "5",
      <Icon className="w-4 h-4" icon="octicon:log-24" />
    ),
    getItem(
      <Link to="staffs" onClick={() => dispatch(switchSidebar("6"))}>
        Staff
      </Link>,
      "6",
      <Icon className="w-5 h-5" icon="fluent:people-team-16-regular" />
    ),
    getItem(
      <Link to="settings" onClick={() => dispatch(switchSidebar("7"))}>
        Settings
      </Link>,
      "7",
      <Icon className="w-5 h-5" icon="uil:setting" />
    ),
    { type: "divider" },
    getItem(
      <Link to="trainingVideos" onClick={() => dispatch(switchSidebar("8"))}>
        Training Videos
      </Link>,
      "8",
      <Icon className="w-5 h-5" icon="healthicons:i-training-class-outline" />
    ),
    getItem(
      <Link to="support" onClick={() => dispatch(switchSidebar("9"))}>
        Support
      </Link>,
      "9",
      <Icon
        className="w-5 h-5"
        icon="material-symbols:contact-support-outline"
      />
    ),
  ];

  const changeWorkspace = (workspace, userRole) => {
    if (workspace === "personal") {
      setUserRole(userRole);
      setCurrentWorkspace(workspace);
      dispatch(switchToPersonalWorkspace());
      toast.success("Workspace switched successfully!", {
        position: "bottom-right",
      });
      navigate("/dashboard");
      return;
    }

    setCurrentWorkspace(workspace);
    console.log(currentWorkspace);
    dispatch(switchWorkspace({ id: workspace, field: "" }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res);
          setOrganization(res.payload.data.data[0]);
          toast.success("Workspace switched successfully!", {
            position: "bottom-right",
          });
          setUserRole(userRole);
          navigate("/dashboard");
        } else {
          toast.error("There is an error while switching workspace!", {
            position: "bottom-right",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  const setupWorkspaceItems = () => {
    setWorkspaceDropdownItems([
      {
        label: (
          <span
            onClick={() => {
              changeWorkspace("personal", "examinee");
              dispatch(switchSidebar("1"));
            }}
          >
            Personal Workspace
          </span>
        ),
        key: "1",
        icon: <Icon icon="ep:user" />,
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
    ]);
    let itemsSoFar = workspaceDropdownItems.length + 1;
    let org = {};

    for (let i = 0; i < userOrganizations.length; i++) {
      (org[userOrganizations[i].organization._id] =
        userOrganizations[i].userType),
        // setUserOrganizationsIdAndRole((prevItems) => [...prevItems, org]);
        setWorkspaceDropdownItems((prevItems) => [
          ...prevItems,
          {
            label: (
              <span
                onClick={() => {
                  changeWorkspace(
                    userOrganizations[i].organization._id,
                    userOrganizations[i].userType
                  );
                  dispatch(switchSidebar("1"));
                }}
              >
                {userOrganizations[i].organization?.name}
              </span>
            ),
            key: ++itemsSoFar,
            icon: <Icon icon="grommet-icons:organization" />,
          },
        ]);
    }

    const joinOrgItem = {
      label: (
        <span
          className="text-primary-500 cursor-pointer"
          onClick={() => {
            setOrgModal(true);
            console.log(orgModal);
          }}
        >
          Join Organization
        </span>
      ),
      key: ++itemsSoFar,
      icon: <Icon className="text-primary-500" icon="material-symbols:add" />,
    };

    setWorkspaceDropdownItems((prevItems) => [...prevItems, joinOrgItem]);
    dispatch(currentUserOrganizationsIdAndRole(org));
  };

  const profileDropdownItems = [
    {
      label: (
        <Link to={"profile"} onClick={() => dispatch(switchSidebar(""))}>
          Profile
        </Link>
      ),
      key: "1",
      icon: <Icon icon="ep:user" />,
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
            dispatch(switchToPersonalWorkspace());
          }}
        >
          Logout
        </span>
      ),
      key: "3",
      icon: <Icon className="text-error-500" icon="carbon:logout" />,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <OrganizationModal orgModal={orgModal} setOrgModal={setOrgModal} />

      <FloatButton
        icon={<Icon icon="mingcute:document-line" />}
        tooltip="Enter Exam Key"
      />
      <Sider
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <Link
          to={""}
          onClick={() => dispatch(switchSidebar("1"))}
          className="demo-logo-vertical p-4 flex justify-center "
        >
          <img src={fetena_logo} alt="Fetena.com Logo" className="w-24" />
        </Link>
        <Menu
          theme="light"
          defaultSelectedKeys={[currentSidebar]}
          selectedKeys={[currentSidebar]}
          mode="inline"
          items={
            userRole === "examinee"
              ? examineeSidebarItems
              : userRole === "admin"
              ? orgAdminSidebarItems
              : examinerSidebarItems
          }
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 75 : 200,
        }}
      >
        <Header
          className="flex justify-between items-center"
          style={{
            padding: 16,
            background: "white",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <h1 className="hidden lg:flex  text-xl font-semibold text-primary-500 ">
            {"Hello there, " + user.firstName + " " + user.lastName + "!"}
          </h1>
          <div className="inline-flex items-center justify-center gap-4">
            <Dropdown
              onClick={() => {
                fetchUserOrganizations();
                setupWorkspaceItems();
              }}
              overlayClassName="overflow-auto h-64"
              menu={{
                items: workspaceDropdownItems,
              }}
              trigger={["click"]}
            >
              <div className="text-primary-500 border w-full border-primary-200 bg-primary-200 bg-opacity-30 hover:bg-opacity-50 h-10 px-8 py-4 rounded-md inline-flex items-center cursor-pointer gap-2">
                <div className="inline-flex items-center justify-center gap-2 h-fit">
                  <Icon icon="octicon:organization-24" />
                  {workspace === null ? "Personal Workspace" : workspace.name}
                </div>
                <Icon icon="gridicons:dropdown" />
              </div>
            </Dropdown>
            <Link
              onClick={() => dispatch(switchSidebar(""))}
              to="notifications"
            >
              <Avatar
                className="cursor-pointer flex items-center justify-center"
                size="large"
                icon={<Icon icon="iconamoon:notification" />}
              />
            </Link>
            <Dropdown
              menu={{
                items: profileDropdownItems,
              }}
              trigger={["click"]}
            >
              <Avatar
                className="cursor-pointer w-16 h-10 items-center justify-center"
                size="large"
                icon={<img src={`${import.meta.env.VITE_API_URL}/${user.profilePhoto}`} alt="avatar" />}
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {
            // TODO: loading screen issue becasue of infinte loop useEffect from the parent component into the child pages

            false ? (
              <div className="flex items-center justify-center h-full">
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
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardScreen;
