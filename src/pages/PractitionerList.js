import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Alert, Button, Input, Space, Table, Typography } from 'antd';
import { LeftOutlined, RightOutlined, EditOutlined, ProfileOutlined } from '@ant-design/icons';
import { fetchPractitioners } from '../redux/practitioner/actions';

const { Title } = Typography;
const { Search } = Input;

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
            <Button
              onClick={() => navigate(`/practitioners/${item.id}`)}
              icon={<ProfileOutlined />}
            >
              Show
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/practitioners/${item.id}/edit`)}
            >
              Edit
            </Button>
          </Space>
        );
      }
    }
  ];

  useEffect(() => {
    fetchPractitioners(dispatch);
  }, [dispatch]);

  const handlePrevPage = () => {
    fetchPractitioners(dispatch, prevPageUrl);
  };

  const handleNextPage = () => {
    fetchPractitioners(dispatch, nextPageUrl);
  };

  const handleSearch = (keyword) => {
    if (!keyword) fetchPractitioners(dispatch);

    const searchUrl = `https://hapi.fhir.org/baseDstu3/Practitioner?given=${keyword}&_format=json&_pretty=true`;
    fetchPractitioners(dispatch, searchUrl);
  };

  if (error) return (
    <Alert type="error" message={error.message} />
  );

  return (
    <div className="practitioner-list">
      <Title>Practitioner List</Title>
      <div className="table-wrapper">
        <Space direction="vertical" style={{width: '100%'}}>
          <Search
            placeholder="Given name search..."
            enterButton="Search"
            size="large"
            allowClear={true}
            onSearch={(value) => handleSearch(value)}
          />

          <Table columns={columns} dataSource={practitioners} pagination={false} loading={loading} rowKey='id' />
          <Space style={{ marginTop: '10px' }}>
            <Button
              type="primary"
              disabled={!prevPageUrl}
              onClick={handlePrevPage}
            >
              <LeftOutlined />
              Prev
            </Button>
            <Button
              type="primary"
              disabled={!nextPageUrl}
              onClick={handleNextPage}
            >
              Next
              <RightOutlined />
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default PractitionerList;
