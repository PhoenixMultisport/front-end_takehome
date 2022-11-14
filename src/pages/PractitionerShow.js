import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Button, List, Space, Typography, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const PractitionerShow = () => {
  const navigate = useNavigate();

  const { practitioners } = useSelector(state => state.Practitioner);
  const { id } = useParams();
  const practitioner = practitioners.find(item => item.id === id);

  if (!practitioner) return null;

  return (
    <Row className="practitioner-show">
      <Col span={12}>
        <Title>Practitioner Details</Title>

        <List>
          <List.Item>
            <Text strong>First Name: </Text>
            {practitioner.firstName}
          </List.Item>
          <List.Item>
            <Text strong>Last Name: </Text>
            {practitioner.lastName}
          </List.Item>
          <List.Item>
            <Text strong>Address: </Text>
            {practitioner.address}
          </List.Item>
          <List.Item>
            <Text strong>Phone: </Text>
            {practitioner.phone}
          </List.Item>
          <List.Item>
            <Text strong>Fax: </Text>
            {practitioner.fax}
          </List.Item>
          <List.Item>
            <Text strong>Email: </Text>
            {practitioner.email}
          </List.Item>
        </List>
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/practitioners/${id}/Edit`)}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => navigate('/')}>Back</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default PractitionerShow;
