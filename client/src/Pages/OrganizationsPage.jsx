// Importing necessary components, hooks, functions, and libraries
import {
  Input,
  Avatar,
  Card,
  Skeleton,
  Switch,
  Pagination,
  Select,
} from "antd"; // Ant Design UI components
import { useState, useEffect } from "react"; // React hooks for managing state and side effects
import {
  getOrganizations,
  followOrganization,
  unfollowOrganization,
  getFilteredOrganizations,
} from "../Redux/features/dataActions"; // Redux actions for fetching organizations and managing organization follow/unfollow
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and accessing state
import { toast } from "react-toastify"; // Library for displaying notifications
import { Icon } from "@iconify/react"; // Icon component
import Loading from "../Components/Loading"; // Custom loading component
import { getMe } from "../Redux/features/authActions"; // Redux action for fetching user information
import { Link } from "react-router-dom"; // Component for navigating to different routes

// Destructuring components from Ant Design
const { Search } = Input;
const { Meta } = Card;

// Options for sorting organizations
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

// Tab options for filtering organizations
const tabListNoTitle = [
  {
    key: "All",
    label: "All",
  },
  {
    key: "Following",
    label: "Following",
  },
];

// Main component for the Organizations page
const OrganizationsPage = () => {
  // State variables using React hooks
  const [loading, setLoading] = useState(true); // Loading state
  const [pages, setPages] = useState(1); // Total pages of organizations
  const [current, setCurrent] = useState(1); // Current page number
  const [organizations, setOrganizations] = useState([]); // List of organizations
  const [searchText, setSearchText] = useState(""); // Search text
  const [sortOption, setSortOption] = useState("name"); // Selected sorting option
  const [sortOrder, setSortOrder] = useState(""); // Sorting order
  const dispatch = useDispatch(); // Redux dispatch function
  const isLoading = useSelector((state) => state.data.isLoading); // Loading state from Redux
  const user = useSelector((state) => state.auth.user); // User information from Redux
  const [activeTabKey, setActiveTabKey] = useState("All"); // Active tab key
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const url = import.meta.env.VITE_API_URL

  // Function to handle tab changes
  const onTabChange = (key) => {
    setActiveTabKey(key); // Update active tab key
  };

  // Effect hook to fetch organizations when component mounts
  useEffect(() => {
    // Dispatch action to fetch organizations
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", searchText],
        sort: "",
        sortOption: "name",
        limit: 10,
        field: "",
      })
    )
      .then((res) => {
        // Process response if successful
        if (res.meta.requestStatus === "fulfilled") {
          // Update state with fetched organizations and pagination data
          const pagesTemp = res.payload.data.paginationData.totalPages;
          setPages(pagesTemp);
          setOrganizations(res.payload.data.data);
          setLoading(false); // Update loading state
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!"); // Notify user of error
      });

    for (let org of user.organizationsFollowed) {
      setFollowedOrganizations((prevItems) => [...prevItems, org._id]);
    }
  }, []);

  // Function to handle search
  const onSearch = (value, _e, info) => {
    setSearchText(value); // Update search text
    // Dispatch action to fetch organizations based on search query
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", value],
        sort: sortOrder,
        sortOption: sortOption,
        limit: 10,
        field: "",
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // Update state with fetched organizations and pagination data
          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false); // Update loading state
          setActiveTabKey("All"); // Switch to "All" tab
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!"); // Notify user of error
      });
  };

  // Function to handle sorting option change
  const onSortOptionChange = (value) => {
    setSortOption(value); // Update sorting option
    // Dispatch action to fetch organizations with updated sorting option
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", searchText],
        sort: sortOrder,
        sortOption: value,
        limit: 10,
        field: "",
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // Update state with fetched organizations and pagination data
          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false); // Update loading state
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!"); // Notify user of error
      });
  };

  // Function to handle sorting order change
  const onSortOrderChange = (value) => {
    // Dispatch action to fetch organizations with updated sorting order
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", searchText],
        sort: value,
        sortOption: sortOption,
        limit: 10,
        field: "",
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // Update state with fetched organizations and pagination data
          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false); // Update loading state
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!"); // Notify user of error
      });
  };

  // Function to handle pagination change
  const onPaginationChange = (page) => {
    setCurrent(page); // Update current page number
    // Dispatch action to fetch organizations for the selected page
    dispatch(
      getOrganizations({
        page: page,
        searchText: ["name", searchText],
        sort: sortOrder,
        sortOption: sortOption,
        limit: 10,
        field: "",
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // Update state with fetched organizations and pagination data
          setPages(res.payload.data.paginationData.totalPages);
          setOrganizations(res.payload.data.data);
          setLoading(false); // Update loading state
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!"); // Notify user of error
      });
  };

  const filterOrganization = (key) => {
    if (key === "verified") {
      dispatch(
        getFilteredOrganizations({
          page: 1,
          searchText: ["name", searchText],
          sort: "",
          sortOption: "name",
          limit: 10,
          field: "",
          isVerified: true,
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            const pagesTemp = res.payload.data.paginationData.totalPages;
            setPages(pagesTemp);
            setOrganizations(res.payload.data.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error while fetching organizations!");
        });
    } else if (key === "unverified") {
      dispatch(
        getFilteredOrganizations({
          page: 1,
          searchText: ["name", searchText],
          sort: "",
          sortOption: "name",
          limit: 10,
          field: "",
          isVerified: false,
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            const pagesTemp = res.payload.data.paginationData.totalPages;
            setPages(pagesTemp);
            setOrganizations(res.payload.data.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error while fetching organizations!");
        });
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

  // JSX to render the Organizations page
  return (
    <div className="flex flex-col gap-4 items-start">
      {/* Title */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold text-blue-900 text-left">
          Organizations
        </h1>
        {/* Search input and sorting options */}
        <div className="flex justify-start w-3/5 gap-4 ">
          <Search
            placeholder="Search Organizations"
            allowClear
            enterButton="Search"
            size="medium"
            onSearch={onSearch}
          />
          {/* Filtering options */}
          <span className="flex items-center">
            <span className="w-full font-semibold text-blue-800">Filter:</span>

            <Select
              defaultValue="verified"
              className="h-full"
              style={{
                width: 120,
              }}
              onChange={(value) => filterOrganization(value)}
              options={[
                {
                  value: "verified",
                  label: "Verified",
                },
                {
                  value: "unverified",
                  label: "Unverified",
                },
              ]}
            />
          </span>
          {/* Sorting options */}
          <span className="flex gap-2 items-center">
            <span className="w-full font-semibold text-blue-800">Sort by:</span>
            <Select
              defaultValue="name"
              className="h-full"
              style={{
                width: 120,
              }}
              onChange={onSortOptionChange}
              options={sortOptions}
            />
            <Select
              defaultValue=""
              className="h-full"
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
      </div>

      {/* Rendering organizations based on the active tab */}
      {activeTabKey === "All" && (
        <div className="flex flex-wrap gap-2 w-full">
          {isLoading ? (
            <Loading />
          ) : (
            // Render organization cards
            <Card
              style={{ width: "100%" }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey}
              onTabChange={onTabChange}
              tabProps={{ size: "middle" }}
            >
              {organizations.length > 0 ? (
                <div className="flex flex-wrap gap-2 w-full">
                  {organizations.map((organization, index) => (
                    <Card
                      style={{ width: 300 }}
                      className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200"
                      key={index}
                      loading={loading}
                    >
                      {/* Organization details */}
                      <div className="flex gap-2">
                        <Link to={`${organization._id}`}>
                          <img
                            className="w-12 h-12 rounded-full cursor-pointer"
                            src={url + organization.logo}
                            alt=""
                          />
                        </Link>
                        <div className="flex flex-col items-start justify-center">
                          <div className="flex gap-2 items-center">
                            <Link
                              to={`${organization._id}`}
                              className="text-lg font-semibold cursor-pointer"
                            >
                              {organization.name}
                            </Link>
                            {/* Render verified icon if organization is verified */}
                            {organization.isVerified && (
                              <Icon
                                className="text-blue-500"
                                icon="mdi:verified"
                              />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 text-left">
                            {organization.description}
                          </p>
                        </div>
                      </div>
                      {/* Organization address and follow/unfollow button */}
                      <div className="flex justify-between m-2">
                        <span className="text-sm italic text-gray-600">
                          {organization.address}
                        </span>
                        {/* Render follow/unfollow button based on user's interaction */}
                        {followedOrganizations.includes(organization._id) ? (
                          <div
                            onClick={() =>
                              handleUnfollowOrganization(organization._id)
                            }
                            className="flex justify-end items-center cursor-pointer gap-1 text-gray-500"
                          >
                            <Icon icon="mdi:tick" /> Following
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              handleFollowOrganization(organization._id)
                            }
                            className="flex justify-end items-center cursor-pointer gap-1 text-blue-600 font-semibold"
                          >
                            <Icon icon="material-symbols:add" />
                            Follow
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="w-full text-center">No data</div>
              )}

              {/* Pagination component */}
              <Pagination
                className="mt-8"
                current={current}
                total={pages * 10}
                onChange={onPaginationChange}
              />
            </Card>
          )}
        </div>
      )}

      {/* Placeholder for Following organizations */}
      {activeTabKey === "Following" && (
        <Card
          style={{ width: "100%" }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{ size: "middle" }}
        >
          {user.organizationsFollowed.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 ">
              {user.organizationsFollowed.map((organization, index) => (
                <Card
                  style={{ width: 300 }}
                  className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200"
                  key={index}
                  loading={loading}
                >
                  {/* Organization details */}
                  <div className="flex gap-2">
                    <Link to={`${organization._id}`}>
                      <img
                        className="w-12 h-12 rounded-full cursor-pointer"
                        src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                        alt=""
                      />
                    </Link>
                    <div className="flex flex-col items-start justify-center">
                      <div className="flex gap-2 items-center">
                        <Link
                          to={`${organization._id}`}
                          className="text-lg font-semibold cursor-pointer"
                        >
                          {organization.name}
                        </Link>
                        {/* Render verified icon if organization is verified */}
                        {organization.isVerified && (
                          <Icon className="text-blue-500" icon="mdi:verified" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 text-left">
                        {organization.description}
                      </p>
                    </div>
                  </div>
                  {/* Organization address and follow/unfollow button */}
                  <div className="flex justify-between m-2">
                    <span className="text-sm italic text-gray-600">
                      {organization.address}
                    </span>
                    {/* Render follow/unfollow button based on user's interaction */}
                    {followedOrganizations.includes(organization._id) ? (
                      <div
                        onClick={() =>
                          handleUnfollowOrganization(organization._id)
                        }
                        className="flex justify-end items-center cursor-pointer gap-1 text-gray-500"
                      >
                        <Icon icon="mdi:tick" /> Following
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          handleFollowOrganization(organization._id)
                        }
                        className="flex justify-end items-center cursor-pointer gap-1 text-blue-600 font-semibold"
                      >
                        <Icon icon="material-symbols:add" />
                        Follow
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="w-full text-center">No data</div>
          )}

          {/* Pagination component */}
          {/* <Pagination
            className='mt-8'
            current={current}
            total={pages * 10}
            onChange={onPaginationChange}
          /> */}
        </Card>
      )}
    </div>
  );
};

// Exporting the component
export default OrganizationsPage;
