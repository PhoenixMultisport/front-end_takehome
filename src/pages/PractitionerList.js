import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Alert, Button, Layout, Space, Table, Typography } from 'antd';
import { fetchPractitioners } from '../redux/practitioner/actions';

const { Content } = Layout;
const { Title } = Typography;

const PractitionerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { practitioners, loading, error, nextPageUrl, prevPageUrl } = useSelector(state => state.Practitioner);

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
        return (
          <Space key={item.id}>
            <Button type="primary" onClick={() => navigate(`/practitioners/${item.id}`)}>Edit</Button>
          </Space>
        );
      }
    }
  ];

  useEffect(() => {
    fetchPractitioners(dispatch);
  }, []);

  if (error) return (
    <Alert type="error" message={error.message} />
  )

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
};

export default PractitionerList;
