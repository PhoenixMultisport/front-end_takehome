import React from 'react';
import { Col, Row, PageHeader } from 'antd';


const Practitioner = ({handleClearPractitioner, selectedPractitioner}: any) => {
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
          <pre>
            {JSON.stringify(selectedPractitioner, null, 2)}
          </pre>
        </Col>
      </Row>
    </>
  );
};

export default Practitioner;
