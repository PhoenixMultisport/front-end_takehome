import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Button, Form, Input, Space, Typography } from 'antd';
import { fetchPractitioners } from '../redux/practitioner/actions';

const { Title } = Typography;

const PractitionerEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { practitioners } = useSelector(state => state.Practitioner);
  const { id } = useParams();
  const [form] = Form.useForm();

  const initialValues = practitioners.find(item => item.id === id);

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  return (
    <div className="practitioner-edit">
      <Title>Practitioner Edit</Title>
      <Form
        layout="vertical"
        name="practitioner"
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input first name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input last name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input address',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              type: 'number',
              message: 'Please input valid number',
            },
            {
              required: true,
              message: 'Please input phone',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fax"
          label="fax"
          rules={[
            {
              required: true,
              message: 'Please input fax',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email',
            },
            {
              required: true,
              message: 'Please input email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button type="danger" onClick={() => navigate('/')}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PractitionerEdit;
