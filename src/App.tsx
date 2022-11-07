import React, { useState, useEffect } from 'react';
import ApiService from './_api/api.fhir.js';
import Alerts from './Components/Alerts/Alerts';
import Practitioner from './Components//Practitioner/Practitioner';
import { Col, Row, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import helper from './Helpers/helper';
import './Models/Practitioner';
import './Models/Common';
import './_styles/App.css';


function App() {

  //state
  const [pagesOfPractitioners, setPagesOfPractitioners] = useState<PractitionerPage[]>([]);
  const [currentPageData, setCurrentPageData] = useState<TableFields[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [totalTableItems, setTotalTableItems] = useState(0);
  const [currentPageIndex, setPageIndex] = useState(1);

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

      //set the data
      setPagesOfPractitioners([{page: 1, practitioners: practitionerList}]);

      //map to the table
      setTotalTableItems(totalTableItems + practitionerList.entry.length);
      updateCurrentPageForTable(practitionerList.entry);

    } catch (err: any) {
      setErrorAlertMsg("Unable to retrieve practitioners....")
      setTimeout(() => {setErrorAlertMsg(null)}, 6000);
    } finally {
      setLoading(false);
    }
  };

  const getPractitionersFromUrl = async(url: string, nextPageIndex: number, incrementTotalTableItems: boolean) => {
    try {
      //throw up loading icon
      setLoading(true);

      //get the data from next page link
      const practitionerList = await ApiService.httpGetFromUrl(url);

      //create new pages array and add out new practitioner page/list
      const newPractitionersArray = [...pagesOfPractitioners];
      newPractitionersArray.push({page: nextPageIndex, practitioners: practitionerList});

      //set the data
      setPagesOfPractitioners(newPractitionersArray);

      //update pagination
      if (incrementTotalTableItems) {
        setTotalTableItems(totalTableItems + practitionerList.entry.length);
      }
      setPageIndex(nextPageIndex);

      //map to the table
      updateCurrentPageForTable(practitionerList.entry);

    } catch (err: any) {
      setErrorAlertMsg("Unable to retrieve practitioners....")
      setTimeout(() => {setErrorAlertMsg(null)}, 6000);
    } finally {
      setLoading(false);
    }
  };


  // *********************************** //
  // ************ Handlers ************* //
  // *********************************** //

  const handleSelectPractitioner = async(practitionerId: string) => {
    try {
      setLoading(true);

      //fetch data
      const practitioner = await ApiService.httpGet(practitionerId);
      if (practitioner) {
        //set drilldown page
        setSelectedPractitioner(practitioner);
      }
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


  // ********************************* //
  // ************ Table ************* //
  // ********************************* //

  const columns: ColumnsType<TableFields> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    // }
  ];

  const rowSelectPractitioner = (record: TableFields) => {
    handleSelectPractitioner(record.id);
  };

  const handlePagination = (nextPageIndex: number) => {
    if (nextPageIndex !== currentPageIndex) {

      //check if pageData exists to possibly add to our table total items count
      const pageDataExists = pagesOfPractitioners.find((x) => x.page === nextPageIndex);
      const currentPage = pagesOfPractitioners.find((x) => x.page === currentPageIndex);

      if (currentPage && currentPage.page > nextPageIndex) {
        //get previous page
        getPractitionersFromUrl(currentPage.practitioners.link[2].url, nextPageIndex, false);
      } else if (currentPage && currentPage.practitioners?.link[1]?.url) {
        //get next page
        getPractitionersFromUrl(currentPage.practitioners.link[1].url, nextPageIndex, !pageDataExists);
      } else {
        alert("Unable to retrieve page data");
      }
    }
  }

  const updateCurrentPageForTable = (practitioners: Practitioner[]) => {
    const tempDataContainer: TableFields[] = [];

    practitioners.map((practitioner, index) => {

      const nameValue = helper.assignFieldNameValue(practitioner.resource);
      const emailValue = helper.assignFieldEmailValue(practitioner.resource);

      return (
        tempDataContainer.push({
          key: practitioner.resource.id ? practitioner.resource.id : String(index),
          name: nameValue ? nameValue : "No data provided",
          email: emailValue ? emailValue : "No data provided",
          id: practitioner.resource.id
        })
      );
    });

    if (tempDataContainer.length > 0) {
      setCurrentPageData(tempDataContainer);
    }
  }


  // *************************************** //
  // ************ Default Load ************* //
  // *************************************** //

  useEffect(() => {
    //set empty dependency array so it only loads once on mount
    initialLoadPractitioners();
  }, []);


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
           <Col span={12} offset={6} style={{marginTop: "30px"}}>
              <h1>Practitioners</h1>
            </Col>
            <Col span={12} offset={6} style={{marginTop: "15px"}}>
              <div id="practitioner_table" style={{marginTop: "15px"}}>
                <Table
                  dataSource={currentPageData}
                  columns={columns}
                  pagination={false}
                  scroll={{ y: 600 }}
                  loading={loading}
                  onRow={(record) => {
                    return {
                      onClick: () => rowSelectPractitioner(record)
                    };
                  }}
                />
              </div>
              <div id="practitioner_table_pagination" style={{marginTop: "30px"}}>
                <Pagination simple defaultCurrent={1} current={currentPageIndex} defaultPageSize={20} total={totalTableItems + 1} onChange={(page) => handlePagination(page)} />
              </div>
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
