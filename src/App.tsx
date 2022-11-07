import React, { useState, useEffect } from 'react';
import ApiService from './_api/api.fhir.js';
import Alerts from './Components/Alerts/Alerts';
import Practitioner from './Components//Practitioner/Practitioner';
import { Col, Row } from 'antd';
import helper from './Helpers/helper';
import './Models/Practitioner';
import './_styles/App.css';


function App() {

  //state
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);

  //ui helpers
  const [loading, setLoading] = useState(false);
  const [successAlertMsg, setSuccessAlertMsg] = useState<string | null>(null);
  const [errorAlertMsg, setErrorAlertMsg] = useState<string | null>(null);


  // ****************************** //
  // ************ API ************* //
  // ****************************** //

  const initialLoadPractitioners = async() => {
    try {
      //throw up loading icon
      setLoading(true);

      //get the data
      const practitionerList = await ApiService.httpGet();

      //set state
      setPractitioners(practitionerList.entry);

    } catch (err: any) {
      setErrorAlertMsg("Uable to retrieve practitioners...")
      setTimeout(() => {setErrorAlertMsg(null)}, 6000);
    } finally {
      setLoading(false);
    }
  };


  // *********************************** //
  // ************ Handlers ************* //
  // *********************************** //

  const handleSelectPractitioner = async(pracitionerId: string) => {
    try {
      setLoading(true);
      const practitioner = await ApiService.httpGet(pracitionerId);

      if (practitioner) {
        setSelectedPractitioner(practitioner);
      }

      setLoading(false);
    } catch (err: any) {
      setErrorAlertMsg("Uable to retrieve practitioner....")
      setTimeout(() => {setErrorAlertMsg(null)}, 6000);
    } finally {
      setLoading(false);
    }
  };

  const handleClearPractitioner = () => {
    setSelectedPractitioner(null);
  };

  const handleUpdatePractitioner = async(updatedPractitioner: Practitioner) => {
    try {
      setLoading(true);

      const res = await ApiService.httpPost(updatedPractitioner.resource);
      if (res === 201) {
        //201 successful update, close out and report success
        setSelectedPractitioner(null);
        setSuccessAlertMsg("Save success!");
        setTimeout(() => {setSuccessAlertMsg(null)}, 6000);
      }
    } catch (err: any) {
      setErrorAlertMsg("Save failed....")
      setTimeout(() => {setErrorAlertMsg(null)}, 6000);
    } finally {
      setLoading(false);
    }
  };


  // *************************************** //
  // ************ Default Load ************* //
  // *************************************** //

  useEffect(() => {
    //set empty dependency array so it only loads once on mount
    initialLoadPractitioners();
  }, []);


  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <Row>
        {(successAlertMsg || errorAlertMsg) && (
          <Col span={12} offset={6} style={{marginTop: "30px"}}>
            <Alerts errorAlertMsg={errorAlertMsg} successAlertMsg={successAlertMsg} />
          </Col>
        )}
        {!selectedPractitioner && (
          <>
            <Col span={12} offset={6}>
                <h1>Practitioners</h1>
              </Col>
              <Col span={12} offset={6}>
                {practitioners && practitioners.length > 0 &&
                  <ul>
                    {practitioners.map((practitioner, index) => {

                      const nameValue = helper.assignFieldNameValue(practitioner.resource);
                      const emailValue = helper.assignFieldEmailValue(practitioner.resource);

                      return (
                        <li key={index} onClick={() => handleSelectPractitioner(practitioner.resource.id)}>
                          {nameValue ? nameValue : "Name unavailable"} / {emailValue ? emailValue : "Email unavailable"}
                        </li>
                      );
                    })}
                  </ul>
                }
              </Col>
          </>
        )}
        {selectedPractitioner && (
          <Col span={24}>
            <Practitioner
              selectedPractitioner={selectedPractitioner}
              handleClearPractitioner={handleClearPractitioner}
              handleUpdatePractitioner={handleUpdatePractitioner}
            />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default App;
