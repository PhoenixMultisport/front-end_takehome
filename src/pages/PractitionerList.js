import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Layout, Space, Table, Typography } from 'antd';
import { fetchPractitioners } from '../redux/practitioner/actions';

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'firstName',
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    key: 'lastName',
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    key: 'fax',
    title: 'fax',
    dataIndex: 'fax',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    key: 'actions',
    title: 'Actions',
    render: (item) => {
      console.log(item)
    }
  }
];

const PractitionerList = () => {
  const dispatch = useDispatch();
  const { practitioners, loading, error, nextPageUrl, prevPageUrl } = useSelector(state => state.Practitioner);

  useEffect(() => {
    fetchPractitioners(dispatch);
  }, []);

  return (
    <div className="practitioner-list">
      <Title>Practitioner List</Title>
      <Table columns={columns} dataSource={practitioners} pagination={false} loading={loading} />
      <Space style={{ marginTop: '10px' }}>
        <Button type="primary">Prev</Button>
        <Button type="primary">Next</Button>
      </Space>
    </div>
  );
}

export default PractitionerList;
