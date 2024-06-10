import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  followOrganization,
  unfollowOrganization,
  getOneOrganization,
  organizationStaff,
} from "../Redux/features/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card, Avatar } from "antd";
import { Icon } from "@iconify/react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import ExamCard from "../Components/ExamCard";
import { getMe } from "../Redux/features/authActions";
import axios from "axios";

const {Meta} = Card

const OrganizationsDetails = () => {
  const { "*": id } = useParams();
  const dispatch = useDispatch();
  const [organizationDetail, setOrganizationDetail] = useState({});
  const { user } = useSelector((state) => state.auth);
  const [activeTabKey, setActiveTabKey] = useState("exams");
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const [personnels, setPersonnels] = useState([]);
  const [exams, setExams] = useState([])
  // const serverURL = "http://localhost:3000";
  // const serverURL = "http://localhost:3000";
  const serverURL = import.meta.env.VITE_SOCKET_URL;

  console.log(user.organizationsFollowed, id, "user at first");

  useEffect(() => {
    dispatch(getOneOrganization({ id, field: "" }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const dataTemp = res.payload.data.data[0];
          setOrganizationDetail(dataTemp);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong while fetching organization!");
      });
    
    for (let org of user.organizationsFollowed) {
      setFollowedOrganizations((prevItems) => [...prevItems, org._id]);
    }
    console.log(followedOrganizations, "followedOrganizations");
    // fetchOrganizationStaffs();
    
  }, []);

  

  const fetchOrganizationStaffs = () => {
    setPersonnels([]);
    dispatch(organizationStaff(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res.payload.data.data);
          const data = res.payload.data.data;
          const updatedStaffs = data.map((item) => ({
            key: item.user._id,
            id: item.user._id,
            profilePhoto: item.user.profilePhoto,
            fullName: item.user.fullName,
            email: item.user.email,
            userType: item.user.userType,
          }));
          setPersonnels(updatedStaffs);
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  const fetchExams = async (page = 1, active = true, access = "open") => {
   
      try {
        const response = await axios.get(
          `/api/exams/my-exam/${id}?active=${active}&access=${access}`
        );

        console.log(response);
        setExams(response.data.data.data);
        console.log(exams, "exams");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };

  // Function to handle organization follow action
  const handleFollowOrganization = (id) => {
    // Dispatch action to follow organization
    dispatch(followOrganization(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Organization followed successfully"); // Notify user of success
          setFollowedOrganizations((prevItems) => [...prevItems, id]);
          dispatch(getMe()).catch((error) => {
            console.log(error);
            toast.error("Something is wrong updating the user!"); // Notify user of error
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong following organizations!"); // Notify user of error
      });
  };

  // Function to handle organization unfollow action
  const handleUnfollowOrganization = (id) => {
    // Dispatch action to unfollow organization
    dispatch(unfollowOrganization(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Organization unfollowed successfully"); // Notify user of success
          const newArray = followedOrganizations.filter(
            (orgId) => orgId !== id
          );
          setFollowedOrganizations(newArray);
          dispatch(getMe()).catch((error) => {
            console.log(error);
            toast.error("Something is wrong updating the user!"); // Notify user of error
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong unfollowing organizations!"); // Notify user of error
      });
  };

  const handleJoinOrganization = () => {
    console.log(selectedValue);
    dispatch(joinOrganization(selectedValue))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(res.payload.message);
          dispatch(getMe());
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server! ");
      });
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    if (activeTabKey === "personnel") {
      fetchOrganizationStaffs();
    } else if (activeTabKey === "exams") {
      fetchExams();
    }
  }, [activeTabKey]);

  const ExamPageView = ({ exams }) => {
    return (
      <div>
        {exams.length === 0 ? (
          <h1>No Exams</h1>
        ) : (
          <div className='flex flex-wrap gap-4'>
            {exams.map((exam, index) => (
              <ExamCard exam={exam} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const PersonnelPageView = ({personnels}) => {
    return (
      <div>
        {personnels.map((personnel) => (
          <Card
            key={personnel.id}
            style={{
              width: 300,
              marginTop: 16,
            }}>
            <Meta
              avatar={
                <Avatar src={serverURL + personnel.profilePhoto} />
              }
              title={personnel.fullName}
              description={personnel.userType}
            />
          </Card>
        ))}
      </div>
    );
  }

  const contentList = {
    exams: <ExamPageView exams={exams} />,
    personnel: <PersonnelPageView personnels={personnels} />,
  };

  const tabList = [
    {
      key: "exams",
      tab: "Exams",
    },
    {
      key: "personnel",
      tab: "Personnel",
    },
  ];

  return (
    <div>
      <div className='flex gap-4 items-center'>
        <Link
          to='/dashboard/organizations'
          className='p-4'>
          <Icon
            icon='fluent-emoji-high-contrast:left-arrow'
            className='text-3xl text-primary-500'
          />
        </Link>
        <h1 className='text-3xl font-bold justify-self-start'>
          Organization Details
        </h1>
      </div>
      <div className='my-4 bg-white rounded h-[10%] flex py-8 items-center justify-center'>
        <div className='flex gap-2 items-center justify-center w-[70%] my-0'>
          <img
            className='w-[100px] rounded-full cursor-pointer'
            src={serverURL + organizationDetail.logo}
            alt=''
          />
          <div className='flex flex-col items-start gap-2'>
            <h1 className='text-3xl gap-2 font-semibold cursor-pointer flex items-center justify-start text-justify'>
              <span className='w-fit'>{organizationDetail.name} </span>
              {organizationDetail.isVerified && (
                <Icon
                  className='text-blue-500'
                  icon='mdi:verified'
                />
              )}
            </h1>
            <p className='text-md text-gray-500 text-left'>
              {organizationDetail.description}
            </p>
            <div className='flex gap-4'>
              <Button
                text={"Join"}
                onClick={handleJoinOrganization}
                color={"primary-500"}
                textColor={"white"}
                px={4}
                py={2}
              />
              {followedOrganizations.includes(id) ? (
                <div
                  onClick={() => handleUnfollowOrganization(id)}
                  className='flex justify-end items-center cursor-pointer gap-1 text-gray-500'>
                  <Icon icon='mdi:tick' /> Following
                </div>
              ) : (
                <div
                  onClick={() => handleFollowOrganization(id)}
                  className='flex justify-end items-center cursor-pointer gap-1 text-blue-600 font-semibold'>
                  <Icon icon='material-symbols:add' />
                  Follow
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-start justify-center w-1/2 my-0 pl-2'>
          <div className='flex gap-4'>
            <p className='font-semibold'>Email:</p>
            <p>
              {organizationDetail.email === ""
                ? "N/A"
                : organizationDetail.email}
            </p>
          </div>
          <div className='flex gap-4'>
            <p className='font-semibold'>Address:</p>
            <p>
              {organizationDetail.address === ""
                ? "N/A"
                : organizationDetail.address}
            </p>
          </div>
          <div className='flex gap-4'>
            <p className='font-semibold'>Phone:</p>
            <p>
              {organizationDetail.phone === ""
                ? "N/A"
                : "+251 - " + organizationDetail.phone}
            </p>
          </div>
          <div className='flex gap-4'>
            <p className='font-semibold'>Website:</p>
            <p>
              {organizationDetail.website === ""
                ? "N/A"
                : organizationDetail.website}
            </p>
          </div>
        </div>
      </div>
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}>
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};
export default OrganizationsDetails;
