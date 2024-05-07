import { Input, Avatar, Card, Skeleton, Switch, Pagination } from 'antd'
import { useState, useEffect } from 'react';
import { getOrganizations } from '../Redux/features/dataActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { current } from '@reduxjs/toolkit';
import { Icon } from '@iconify/react';

const { Search } = Input
const {Meta} = Card

const onSearch = (value, _e, info) => console.log(info?.source, value);

const OrganizationsPage = () => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(2)
  const [current, setCurrent] = useState(1)
  const [organizations, setOrganizations] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizations(1)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        const pagesTemp = res.payload.data.paginationData.totalPages
        setPages(pagesTemp)
        console.log(res.payload.data.paginationData.totalPages, pages, 'pages');
        setOrganizations(res.payload.data.data)
        setLoading(false)
      }
    }).catch((error) => {
      console.log(error);
      toast.error("There is some error while fetching organizations!")
    })
  }, [])


  const onPaginationChange = (page) => {
    console.log(page, 'current page');
    setCurrent(page)
    dispatch(getOrganizations(page))
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
  }

  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>Organizations</h1>
      <div className='flex flex-col justify-start w-full gap-4'>
        <Search
          placeholder='Search Organizations'
          allowClear
          enterButton='Search'
          size='large'
          onSearch={onSearch}
        />
      </div>
  
      <div className='flex flex-wrap gap-8'>
        {organizations.map((organization, index) => (
          <Card
            style={{
              width: 300,
              marginTop: 16,
            }}
            key={index}
            loading={loading}>
            <Meta
              avatar={
                <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />
              }
              title={organization.name}
              description={organization.description}
            />
            <div className='flex justify-end items-center gap-1 text-primary-500'>
              <Icon icon="material-symbols:add" />
              Follow
            </div>
          </Card>
        ))}
      </div>
      <Pagination current={current} total={pages} onChange={onPaginationChange} />
    </div>
  );
}
export default OrganizationsPage