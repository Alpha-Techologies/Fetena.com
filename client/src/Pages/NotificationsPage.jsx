import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton, Card } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  updateNotification,
} from "../Redux/features/dataActions";
import { toast } from "react-toastify";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  let totalPages = 0;
  const dispatch = useDispatch();
  let page = 1;

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setData([]);
    setLoading(true);
    dispatch(getNotifications(page))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          totalPages = res.payload.data.paginationData.totalPages;
          // const updatedSet = new Set(data);
          // res.payload.data.data.forEach((item) => {
          //   updatedSet.add(item);
          // });
          setData([...data, ...res.payload.data.data]);
          console.log(res.payload.data, data, "data length");
          // const notificationData = res.payload.data.data;
          // console.log(notificationData, 'notification data');
          // setData([...data, notificationData]);
          // console.log(data, 'data');
          setLoading(false);
          page += 1;
        } else {
          setLoading(false);
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("is it from here");
    loadMoreData();
  }, []);

  // loadMoreData();

  const handleUpdateNotification = (id, notification) => {
    dispatch(updateNotification({ id, notification }))
      .then((res) => {
        console.log(res, "updatenotification res");
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Notification set as read!", {
            position: "bottom-right",
          });
          // loadMoreData();
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  return (
    <>
     <div className='flex gap-4 items-center '>
          <Link to='/dashboard/'>
            <Icon
              icon='fluent-emoji-high-contrast:left-arrow'
              className='text-2xl text-primary-500'
            />
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 text-left">Notifications</h1>
          </div>

   
      <Card
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "8px 16px",
          // border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
        className="mt-4"
      >
        <InfiniteScroll
          dataLength={data.length}
          next={() => loadMoreData()}
          hasMore={data.length < totalPages}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>No more Notifications!</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                className="hover:bg-gray-50 cursor-pointer w-full px-8"
                onClick={() => {
                  handleUpdateNotification(item._id, { read: true });
                  item.read = true;
                  setData([...data]);
                }}
                key={item?._id}
              >
                <List.Item.Meta
                  avatar={
                    <Icon
                      className={`w-5 h-5 text-primary-500 ml-4 ${
                        item?.read ? "text-gray-400" : ""
                      }`}
                      icon="fluent-mdl2:feedback-request-solid"
                    />
                  }
                  title={
                    <span
                      className={`${item?.read ? "" : "font-semibold italic"}`}
                    >
                      {item?.message}
                    </span>
                  }
                  description={moment(item?.createdAt).fromNow()}
                />
                {item?.read ? (
                  <Icon
                    className="w-5 h-5 mr-4"
                    icon="fluent:mail-read-multiple-28-regular"
                  />
                ) : (
                  <Icon className="w-5 h-5 mr-4" icon="akar-icons:envelope" />
                )}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Card>
    </>
  );
};
export default NotificationsPage;
