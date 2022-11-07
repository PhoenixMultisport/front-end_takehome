import React, { useState, useEffect } from 'react';
import ApiService from './_api/api.fhir.js';
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
      console.error(err.message);
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
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearPractitioner = () => {
    setSelectedPractitioner(null);
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
            />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default App;
