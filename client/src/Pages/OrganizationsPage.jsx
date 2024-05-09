import {
  Input,
  Avatar,
  Card,
  Skeleton,
  Switch,
  Pagination,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import { getOrganizations, followOrganization, unfollowOrganization } from "../Redux/features/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Loading from "../Components/Loading";
import { getMe } from "../Redux/features/authActions";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Meta } = Card;

const sortOptions = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "address",
    label: "Address",
  },
];

const OrganizationsPage = () => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [organizations, setOrganizations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.data.isLoading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getOrganizations({page: 1, searchText:['name', searchText], sort:"", sortOption: "name", limit: 10, field:''}))
      .then((res) => {
        console.log(res, 'res');
        if (res.meta.requestStatus === "fulfilled") {
          const pagesTemp = res.payload.data.paginationData.totalPages;
          setPages(pagesTemp);
          console.log(
            res.payload.data.paginationData.totalPages,
            pages,
            pagesTemp,
            "pages"
          );
          setOrganizations(res.payload.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  }, []);

  const onSearch = (value, _e, info) => {
  
    setSearchText(value)
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", value],
        sort: sortOrder,
        sortOption: sortOption,
        limit: 10,
        field: ''
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  };

  const onSortOptionChange = (value) => {
    setSortOption(value);
    dispatch(getOrganizations({page:1, searchText:['name', searchText], sort: sortOrder, sortOption: value, limit:10, field: ''}))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res.payload.data.data, "payload data");

          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  };

  const onSortOrderChange = (value) => {
    dispatch(getOrganizations({page: 1, searchText: ['name', searchText], sort: value, sortOption: sortOption, limit: 10, field: ''}))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res.payload.data.data, "payload data");

          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  };

  const onPaginationChange = (page) => {
    console.log(page, "current page");
    setCurrent(page);
    dispatch(getOrganizations({page: page, searchText: ['name', searchText], sort: sortOrder, sortOption: sortOption, limit: 10, field:''}))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  };

  const handleFollowOrganization  = (id) => {
    dispatch(followOrganization(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Organization followed successfully");
        dispatch(getMe()).catch((error) => {
          console.log(error);
          toast.error("Something is wrong updating the user!");
        })
      }
    }).catch((error) => {
      console.log(error); 
      toast.error("Something is wrong following organizations!");
    })
  };

  const handleUnfollowOrganization  = (id) => {
    dispatch(unfollowOrganization(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Organization unfollowed successfully");
          dispatch(getMe()).catch((error) => {
            console.log(error);
            toast.error("Something is wrong updating the user!");
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong unfollowing organizations!");
      });
  }

  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>Organizations</h1>
      <div className='flex justify-start w-full gap-4'>
        <Search
          placeholder='Search Organizations'
          allowClear
          enterButton='Search'
          size='large'
          onSearch={onSearch}
        />

        <span className='flex gap-2 items-center'>
          <span className='w-full'>Sort by:</span>
          <Select
            defaultValue='name'
            className='h-full'
            style={{
              width: 120,
            }}
            onChange={onSortOptionChange}
            options={sortOptions}
          />

          <Select
            defaultValue=''
            className='h-full'
            style={{
              width: 120,
            }}
            onChange={onSortOrderChange}
            options={[
              {
                value: "",
                label: "Ascending",
              },
              {
                value: "-",
                label: "Descending",
              },
            ]}
          />
        </span>
      </div>

      <div className='flex flex-wrap gap-8'>
        {isLoading ? (
          <Loading />
        ) : (
          organizations.map((organization, index) => (
            <Card
              style={{
                width: 300,
                marginTop: 16,
              }}
              key={index}
              loading={loading}>
              <div className='flex gap-2'>
                <Link to={`${organization._id}`}>
                  <img
                    className='w-12 h-12 rounded-full cursor-pointer'
                    src='https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg'
                    alt=''
                  />
                </Link>
                <div className='flex flex-col items-start justify-center'>
                  <div className='flex gap-2 items-center'>
                    <Link
                      to={`${organization._id}`}
                      className='text-lg font-semibold cursor-pointer'>
                      {organization.name}
                    </Link>
                    {organization.isVerified && (
                      <Icon
                        className='text-blue-500'
                        icon='mdi:verified'
                      />
                    )}
                  </div>
                  <p className='text-sm text-gray-500 line-clamp-2 text-left'>
                    {organization.description}
                  </p>
                </div>
              </div>
              <div className='flex justify-between my-2'>
                <span className='text-sm italic text-gray-500'>
                  {organization.address}
                </span>
                {user.organizationsFollowed.includes(organization._id) ? (
                  <div
                    onClick={() => handleUnfollowOrganization(organization._id)}
                    className='flex justify-end items-center cursor-pointer gap-1 text-gray-500'>
                    <Icon icon='mdi:tick' /> Following
                  </div>
                ) : (
                  <div
                    onClick={() => handleFollowOrganization(organization._id)}
                    className='flex justify-end items-center cursor-pointer gap-1 text-primary-500'>
                    <Icon icon='material-symbols:add' />
                    Follow
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
      <Pagination
        current={current}
        total={pages*10}
        onChange={onPaginationChange}
      />
    </div>
  );
};
export default OrganizationsPage;
