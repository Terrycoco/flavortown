import React, {Fragment,useState, useEffect} from 'react';
import APICalls from '../apiCalls';
import {groupDataByFieldname} from '../utilities/data'


    
      let mock = [
            {"friend_cat": "Dairy", "friend": "sour cream"},
            {"friend_cat": "Herbs", "friend": "Parsley"},
            {"friend_cat": "Proteins", "friend": "Beef"},
            {"friend_cat": "Dairy", "friend": "milk"}
      ];



function TestPage() {
   const [result, setResult] = useState(mock);

  
   useEffect(() => {
     const runTest = async() => {
      
      //   //enter test here
      const data = await APICalls.getMutual([]);
      const grouped = groupDataByFieldname(data, "friend_cat", true);
      console.log('grouped:', grouped);
      return grouped;
     
     };

     runTest().then(testdata => {
        setResult(testdata);
     });
     

   }, []);


  return (
      <Fragment>
       <h1>Test Page</h1>
       {JSON.stringify(result)}
      </Fragment>
  )
}

export default TestPage;
