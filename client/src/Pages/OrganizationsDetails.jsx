import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneOrganization } from "../Redux/features/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card, Divider } from "antd";
import { Icon } from "@iconify/react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const OrganizationsDetails = () => {
  const { "*": id } = useParams();
  const dispatch = useDispatch();
  const [organizationDetail, setOrganizationDetail] = useState({});
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOneOrganization(id))
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
  }, []);

  return (
    <div>
      <div className='my-4 bg-white rounded h-full flex'>
      <Link to='/dashboard/organizations' className="p-4">
        <Icon icon="fluent-emoji-high-contrast:left-arrow"  className="text-3xl text-primary-500" />
            
            </Link>
        <div className='flex gap-2 items-center w-[70%] my-0'>
          
          <img
            className='w-1/2 rounded-full cursor-pointer'
            src='https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg'
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
                color={"primary-500"}
                textColor={"white"}
                px={4}
                py={2}
              />
              <Button
                text={
                  user.organizationsFollowed.includes(id)
                    ? "Following"
                    : "Follow"
                }
                color={
                  user.organizationsFollowed.includes(id)
                    ? "gray-500"
                    : "primary-500"
                }
                textColor={
                  user.organizationsFollowed.includes(id) ? "black" : "white"
                }
                px={4}
                py={2}
              />
            </div>
          </div>
        </div>
        
        <div className='flex flex-col items-start justify-center w-1/2 my-0 border-l-2 pl-2'>
          <div className='flex gap-4'>
            <p className='font-semibold'>Email:</p>
            <p>{organizationDetail.email === "" ? "N/A" : organizationDetail.email }</p>
          </div>
          <div className='flex gap-4'>
            <p className='font-semibold'>Address:</p>
            <p>{organizationDetail.address === "" ? "N/A" : organizationDetail.address}</p>
          </div>
          <div className='flex gap-4'>
            <p className='font-semibold'>Phone:</p>
            <p>{organizationDetail.phone === "" ? "N/A" : "+251 - " + organizationDetail.phone}</p>
          </div>
          <div className='flex gap-4'>
            <p className='font-semibold'>Website:</p>
            <p>{organizationDetail.website === "" ? "N/A" : organizationDetail.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationsDetails;
