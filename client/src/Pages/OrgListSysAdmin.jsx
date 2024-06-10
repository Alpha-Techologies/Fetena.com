import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getOrganizations, updateOrganization, getFilteredOrganizations } from "../Redux/features/dataActions"
import { Avatar, Table, Input, Pagination, Select } from "antd"
import { toast } from "react-toastify"

const { Search } = Input;


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



const OrgListSysAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [organizations, setOrganizations] = useState([]);
  const [searchText, setSearchText] = useState(""); // Search text
  const [sortOption, setSortOption] = useState("name"); // Selected sorting option
  const [sortOrder, setSortOrder] = useState(""); // Sorting order
  const [tableData, setTableData] = useState([])

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text, record) => (
        // console.log(record, 'record'),
        <Link to={`/dashboard/organizations/${record.key}`}>
          <Avatar src={text} />
        </Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) =>
        text ? text : <span className='text-red-500'>No Phone</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) =>
        text ? text : <span className='text-red-500'>No Email</span>,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text) =>
        text ? text : <span className='text-red-500'>No Website</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) =>
        text ? text : <span className='text-red-500'>No Address</span>,
    },
    {
      title: "Verification Status",
      key: "isVerified",
      dataIndex: "isVerified",
      render: (text, record) => (
        <>
          {text ? (
            <button onClick={() => handleRevokeVerification(record.key)} className='bg-error-500 text-white px-2 py-1 hover:bg-error-700 rounded'>
              Revoke Verification
            </button>
          ) : (
            <button onClick={() => handleVerify(record.key)} className='bg-green-500 text-white px-2 py-1 hover:bg-green-700 rounded'>
              Verify
            </button>
          )}
        </>
      ),
    },
  ];

  const fetchOrganizations = (current, searchText, sortOrder, sortOption) => {
    dispatch(
      getOrganizations({
        page: current,
        searchText: ["name", searchText],
        sort: sortOrder,
        sortOption,
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
          //   setLoading(false); // Update loading state
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!"); // Notify user of error
      });
  }

  useEffect(() => {
    if (!user.isSystemAdmin) {
      navigate("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    fetchOrganizations(1, "", "", "name");
  }, []);

  const onSearch = (value, _e, info) => {
    setSearchText(value); // Update search text
    fetchOrganizations(1, value, sortOrder, sortOption);
  };

  const onSortOptionChange = (value) => {
    setSortOption(value); // Update sorting option
    fetchOrganizations(1, searchText, sortOrder, value);
  };

  const onSortOrderChange = (value) => {
    setSortOrder(value); // Update sorting order
    fetchOrganizations(1, searchText, value, sortOption);
  };

  const onPaginationChange = (page) => {
    setCurrent(page); // Update current page number
    fetchOrganizations(page, searchText, sortOrder, sortOption)
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
            // setLoading(false);
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
            // setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error while fetching organizations!");
        });
    }
  };

  const handleVerify = (orgId) => {
    dispatch(updateOrganization({id: orgId, organization: {isVerified: true}}))
    .then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Organization verified successfully!");
          fetchOrganizations(current, searchText, sortOrder, sortOption);
      } else {
        toast.error(res.message);
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("There is some error in the server!");
    });
  }

  const handleRevokeVerification = (orgId) => {
    dispatch(
      updateOrganization({ id: orgId, organization: { isVerified: false } })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Organization revoked verification successfully!");
          fetchOrganizations(current, searchText, sortOrder, sortOption)
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  useEffect(() => {
    setTableData([])
    console.log("org useEffect")
    for (const org of organizations) {
      setTableData((prev) => [...prev, {
        key: org._id,
        name: org.name,
        email: org.email,
        phone: org.phone,
        logo: org.logo,
        isVerified: org.isVerified,
        address: org.address,
      }]);
      }
      // console.log(tableData, 'tableData')
  }, [organizations, setOrganizations]);

  return (
    <div className='flex flex-col gap-4 items-start'>
      {/* Title */}
      <div className='flex justify-between items-center w-full'>
        <h1 className='text-2xl font-bold text-blue-900 text-left'>
          Organizations List
        </h1>
        {/* Search input and sorting options */}
        <div className='flex justify-start w-3/5 gap-4 '>
          <Search
            placeholder='Search Organizations'
            allowClear
            enterButton='Search'
            size='medium'
            onSearch={onSearch}
          />
          {/* Filtering options */}
          <span className='flex items-center'>
            <span className='w-full font-semibold text-blue-800'>Filter:</span>

            <Select
              defaultValue='verified'
              className='h-full'
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
          <span className='flex gap-2 items-center'>
            <span className='w-full font-semibold text-blue-800'>Sort by:</span>
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
      </div>
          <Table
              className="w-full"
        dataSource={tableData}
        columns={columns}
      />
      <Pagination
        className='mt-8'
        current={current}
        total={pages * 10}
        onChange={onPaginationChange}
      />
    </div>
  );
}
export default OrgListSysAdmin