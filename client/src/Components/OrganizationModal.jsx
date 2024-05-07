import { Modal, Select } from 'antd';
import { Link } from 'react-router-dom';

const OrganizationModal = ({orgModal, setOrgModal}) => {
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
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "1",
            label: "Not Identified",
          },
          {
            value: "2",
            label: "Closed",
          },
          {
            value: "3",
            label: "Communicated",
          },
          {
            value: "4",
            label: "Identified",
          },
          {
            value: "5",
            label: "Resolved",
          },
          {
            value: "6",
            label: "Cancelled",
          },
        ]}
      />

      <p className='my-2'>
        Didn't find your organization? <Link to='create-organization' onClick={() => setOrgModal(false)} className='text-primary-500 hover:underline cursor-pointer'>Create</Link>
      </p>
    </Modal>
  );
}
export default OrganizationModal