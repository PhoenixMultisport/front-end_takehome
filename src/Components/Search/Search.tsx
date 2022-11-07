import React, { useState } from 'react';
import { AutoComplete, Button } from 'antd';
import ApiService from '../../_api/api.fhir.js';
import { debounce } from 'lodash';
import '../../Models/Common';


let debouncedFunction: any;

const Search = ({ initialLoadPractitioners, updateCurrentPageForTable, setLoading, clearAllData }: any) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const clearSearchAndData = () => {
    setSearchInputValue("");
    clearAllData();
    initialLoadPractitioners()
  }

  const onChange = (data: any) => {

    setSearchInputValue(data);

    //terminate stale debounced function
    if (debouncedFunction && debouncedFunction.cancel) {
      debouncedFunction.cancel();
      setLoading(false);
    }

    //use table loading icon to indicate fetching
    setLoading(true);

    debouncedFunction = debounce(async () => {
      try {
        const url = "http://hapi.fhir.org/baseDstu3/Practitioner" + `?given=${data}` + "&_format=json&_pretty=true";
        const result = await ApiService.httpGetFromUrl(url);

        if (result && result.entry) {
          updateCurrentPageForTable(result.entry, true);
        }
      } catch (err: any) {
        debouncedFunction.cancel();
      } finally {
        setLoading(false);
      }
    }, 1000);

    debouncedFunction();
  };


  return (
    <>
      <AutoComplete
        value={searchInputValue}
        autoFocus={true}
        style={{ width: 200 }}
        onChange={onChange}
      />
      <Button onClick={() => clearSearchAndData()} type={searchInputValue === "" ? "default" : "primary"}>
       {searchInputValue === "" ? "Reset Table" : "Clear Search"}
      </Button>
    </>
  );
};

export default Search;
