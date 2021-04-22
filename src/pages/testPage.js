import React, {Fragment, useState} from 'react';
//import APICalls from '../apiCalls';
//import {groupDataByFieldname} from '../utilities/data'
//import Autocomplete from '../components/autocomplete';
import EditItem from '../components/newItem';
    
      // let mock = [
      //       {"friend_cat": "Dairy", "value": "sour cream"},
      //       {"friend_cat": "Herbs", "value": "Parsley"},
      //       {"friend_cat": "Proteins", "value": "Beef"},
      //       {"friend_cat": "Dairy", "value": "milk"}
      // ];



function TestPage() {
const [isOpen, setIsOpen] = useState(true);


const onAdd = () => {
}
const onClose = () => {
}

  
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
           <EditItem
              text={""}
              onAdd={onAdd}
              onClose={onClose}
              isOpen={isOpen}
            />

      </Fragment>
  )
}

export default TestPage;
