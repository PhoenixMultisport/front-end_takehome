import React from 'react';
import { Col, Row, PageHeader } from 'antd';
import PractitionerForm from '../PractitionerForm/PractitionerForm';


const Practitioner = ({handleClearPractitioner, handleUpdatePractitioner, selectedPractitioner}: any) => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={handleClearPractitioner}
        title="Practitioners"
        subTitle="View all"
      />
      <Row>
        <Col span={12} offset={6}>
          <PractitionerForm handleUpdatePractitioner={handleUpdatePractitioner} selectedPractitioner={selectedPractitioner} />
        </Col>
      </Row>
    </>
  );
};

export default Practitioner;

