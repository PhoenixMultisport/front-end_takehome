import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Alert, Button, Form, Input, InputNumber, Space, Typography } from 'antd';
import { updatePractitioner } from '../redux/practitioner/actions';

const { Title } = Typography;

const PractitionerEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { practitioners, loading, error } = useSelector(state => state.Practitioner);
  const { id } = useParams();
  const [form] = Form.useForm();

  const initialValues = practitioners.find(item => item.id === id);

  const onFinish = (values) => {
    updatePractitioner(dispatch, {...values, id});
  };

  return (
    <div className="practitioner-edit">
      <Title>Practitioner Edit</Title>

      {error && (
        <Alert type="error" message={error.message} />
      )}

      <div className="form-wrapper">
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
                required: true,
                message: 'Please input phone',
              },
            ]}
          >
            <InputNumber style={{width: '100%'}} />
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
              <Button type="primary" htmlType="submit" loading={loading}>Update</Button>
              <Button type="danger" onClick={() => navigate('/')}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PractitionerEdit;
