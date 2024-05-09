import { Modal, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrganizations } from '../Redux/features/dataActions';

const OrganizationModal = ({ orgModal, setOrgModal }) => {
  
  const [searchOptions, setSearchOptions] = useState([])
  const dispatch = useDispatch()

  const onSearchChange = (value) => {
    console.log(value, 'change value');
    dispatch(
      getOrganizations({
        page: 1,
        searchText: ["name", value.target.value],
        sort: "",
        sortOption: "",
      })
    )
      .then((res) => {
        console.log(res, "res");
        if (res.meta.requestStatus === "fulfilled") {
          const dataTemp = res.payload.data.data;
          setSearchOptions(dataTemp);
          
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error while fetching organizations!");
      });
  }

  return (
    <Modal
          title='Join an Organization'
      centered
      open={orgModal}
      onOk={() => setOrgModal(false)}
      onCancel={() => setOrgModal(false)}>
      <Select
        showSearch
        className='w-full'
        placeholder='Search to Select'
        optionFilterProp='children'
        onKeyDown={onSearchChange}
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={searchOptions}
      />

      <p className='my-2'>
        Didn't find your organization? <Link to='create-organization' onClick={() => setOrgModal(false)} className='text-primary-500 hover:underline cursor-pointer'>Create</Link>
      </p>
    </Modal>
  );
}
export default OrganizationModal