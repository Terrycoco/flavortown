import React, {Fragment, useState} from 'react';
import MutualFriendsList from '../components/mutualFriendsList';
import "./pairings.css";
import TagsInput from '../components/tagsInput';

//import {arrayFindObjectByProp} from '../utilities/dataFunctions';

const CreateDish = () => {
  //for tag
  const [selectedObjs, setSelectedObjs] = useState([]);
 
  //from list
  const addSelected = (newobj) => {
    let json = newobj;
   // console.log('selected:', newobj, typeof newobj);
     if (typeof newobj === "string") {
       json = JSON.parse(newobj);
     }
    //update tag
    setSelectedObjs(oldArr => {
     // console.log('oldarr:', oldArr);
      return [...oldArr, json]
   });
  };


  //from Tags
  const afterTagsChange = (newarr) => {
    console.log('afterTags called:', newarr);
   if (newarr.length > 0) {
    //convert to object
    let json = JSON.parse(newarr);
   // console.log('json', json);
   // console.log('old selectedObjs', selectedObjs);
    //is the length the same?
     setSelectedObjs(oldArr => json);
   //   console.log('new selectedObjs', selectedObjs);
   } else {
    //is cleared
    setSelectedObjs(oldArr => []);
   }
 };



  return (
   <Fragment>
   <div className="container">
    <h3>Create Your Dish</h3>
    <TagsInput
       value={selectedObjs}
       afterChange={afterTagsChange}
    />
    <MutualFriendsList 
      selected={selectedObjs} 
      onSelect={addSelected}
    />
    </div>
   </Fragment>
  );
}



export default CreateDish;