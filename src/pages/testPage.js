import React, {Fragment} from 'react';
//import APICalls from '../apiCalls';
//import {groupDataByFieldname} from '../utilities/data'
import Autocomplete from '../components/autocomplete';

    
      // let mock = [
      //       {"friend_cat": "Dairy", "value": "sour cream"},
      //       {"friend_cat": "Herbs", "value": "Parsley"},
      //       {"friend_cat": "Proteins", "value": "Beef"},
      //       {"friend_cat": "Dairy", "value": "milk"}
      // ];



function TestPage() {
   // const [result, setResult] = useState(mock);

  
   // useEffect(() => {
   //   const runTest = async() => {
      
   //    //   //enter test here
   //    const data = await APICalls.getMutual([]);
   //    const grouped = groupDataByFieldname(data, "friend_cat", true);
   //    console.log('grouped:', grouped);
   //    return grouped;
     
   //   };

   //   runTest().then(testdata => {
   //      setResult(testdata);
   //   });
     

   // }, []);


  return (
      <Fragment>
           <Autocomplete 
            />

      </Fragment>
  )
}

export default TestPage;
