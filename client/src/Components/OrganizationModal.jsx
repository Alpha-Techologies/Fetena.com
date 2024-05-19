import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrganizations, joinOrganization } from "../Redux/features/dataActions";
import { toast } from "react-toastify";
import { getMe } from "../Redux/features/authActions";

const OrganizationModal = ({ orgModal, setOrgModal }) => {
  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const maxInfinity = Infinity;

  useEffect(() => {
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", ""],
        sort: "",
        sortOption: "",
        limit: maxInfinity,
        field: "name",
      })
    )
      .then((res) => {
        console.log(res, "res");
        if (res.meta.requestStatus === "fulfilled") {
          const orgTemp = res.payload.data.data;
          const searchOptTemp = [];
          for (const org of orgTemp) {
            searchOptTemp.push({
              value: org._id,
              label: org.name,
            });
          }
          setSearchOptions(searchOptTemp);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  }, []);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleJoinOrganization = () => {
    console.log(selectedValue);
    dispatch(joinOrganization(selectedValue))
    .then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setOrgModal(false);
        setSelectedValue("");
        toast.success(res.payload.message);
        dispatch(getMe())
      } else {
        toast.error(res.payload.message);
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("There is some error in the server! ");
    });
    
  };

  const handleCancel = () => {
    setOrgModal(false);
    setSelectedValue("");
  };

  return (
    <Modal
      title='Join an Organization'
      centered
      open={orgModal}
      onOk={() => {
        handleJoinOrganization();
      }}
      onCancel={() => handleCancel()}>
      <Select
        showSearch
        className='w-full'
        value={selectedValue}
        onChange={handleSelectChange}
        placeholder='Search to Select'
        optionFilterProp='children'
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={searchOptions}
      />

      <p className='my-2'>
        Didn't find your organization?{" "}
        <Link
          to='create-organization'
          onClick={() => setOrgModal(false)}
          className='text-primary-500 hover:underline cursor-pointer'>
          Create
        </Link>
      </p>
    </Modal>
  );
};
export default OrganizationModal;
