import React from 'react';
import { Button, Form, Input  } from 'antd';
import helper from '../../Helpers/helper';


const PractitionerForm = ({ selectedPractitioner, handleUpdatePractitioner }: any) => {

  const [form] = Form.useForm();

  const telecomSystemValue = helper.assignFieldTelecomSystem(selectedPractitioner);
  const emailValue = helper.assignFieldEmailValue(selectedPractitioner);
  const nameValue = helper.assignFieldNameValue(selectedPractitioner);

  form.setFieldsValue({
    resourceType: selectedPractitioner.resourceType,
    id: selectedPractitioner.id,
    lastUpdated: selectedPractitioner.meta.lastUpdated,
    telecomSystem: telecomSystemValue,
    email: emailValue,
    name: nameValue
  })

  const handleSubmit = () => {
    form
    .validateFields()
    .then(values => {

      const selectedResource = selectedPractitioner.resource;

      const updatedResource: Resource = {
        id: values.id,
        identifier: selectedResource?.identifier,
        meta: selectedResource?.meta,
        resourceType: values.resourceType,
        telecom: [{ system: values.telecomSystem, value: values.email }],
        name: [{
          text: values.name,
          family: selectedResource?.name[0].family,
          given: selectedResource?.name[0].given
        }],
        address: selectedResource?.address,
        qualification: selectedResource?.qualification
      };

      const updatedPracitioner: Practitioner = {
        fullUrl: selectedPractitioner.fullUrl,
        resource: updatedResource,
        search: selectedPractitioner.search
      };

      // form.resetFields();
      handleUpdatePractitioner(updatedPracitioner);
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
  }

  return (
    <>
      <div>
        <h1>Practitioner Form</h1>
      </div>
      <div style={{marginTop: "30px"}}>
        <Form
          form={form}
          layout="vertical"
          id="practitioner_form"
        >
          <Form.Item
            name="resourceType"
            label="Resource Type"
            rules={[
              {
                required: true,
                message: 'Resource Type is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="id"
            label="Pracitioner Id"
            rules={[
              {
                required: true,
                message: 'Pracitioner Id is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Name is required',
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
                required: true,
                message: 'Email is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastUpdated"
            label="Last Updated"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
};

export default PractitionerForm;