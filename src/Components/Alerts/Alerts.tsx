import React from 'react';
import { Alert } from 'antd';


const Alerts = ({successAlertMsg, errorAlertMsg}: any) => {
  return (
    <>
      {successAlertMsg &&
        <Alert
          message={successAlertMsg}
          type="success"
          showIcon
        />
      }
      {errorAlertMsg &&
        <Alert
          message={errorAlertMsg}
          type="error"
          showIcon
        />
      }
    </>
  );
};

export default Alerts;
