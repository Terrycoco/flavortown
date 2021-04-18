import React, {Fragment, useState, useCallback, useEffect} from 'react';
import MutualFriendsList from '../components/mutualFriendsList';
import "./pairings.css";
import TagsInput from '../components/tagsInput';
import {groupDataByFieldname} from '../utilities/data';
import APICalls from '../apiCalls';
//import {arrayFindObjectByProp} from '../utilities/data';

const CreateDish = () => {
  //for tag
  const [selectedObjs, setSelectedObjs] = useState([]);
  
  //data for items
  const [data, setData] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
 // const env = process.env.NODE_ENV;
  //const api = process.env.REACT_APP_API;
 
  const loadItems = useCallback(async() => {
    let selectedIds;
     if (!selectedObjs || selectedObjs.length === 0) {
      //return all
       selectedIds = [];
     } 
     selectedIds = selectedObjs.map(i => {
       return parseInt(i.id);
     });
      console.log('selectedIds:', selectedIds);
      const ungrouped = await APICalls.getMutual(selectedIds);
      const grouped = groupDataByFieldname(ungrouped, "friend_cat", true);
      return {data, grouped};
    }, [selectedObjs]); //every time ids change reload friends


  useEffect(() => {
    loadItems().then(results => {
      setGroupedItems(oldArr => results.grouped);
      setData(oldArr => results.data);
    //  console.log('currentgroupdItems: ', grouped);
    });
   },[loadItems]); //run once and when selectedIds change




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
    
    setSelectedObjs(oldArr => json);

   } else {
    //is cleared
    setSelectedObjs(oldArr => []);
   }
 };



  return (
   <Fragment>
   <div className="container">
    <h3>Flavor Finder</h3>
    <TagsInput
       value={selectedObjs}
       afterChange={afterTagsChange}
    />
    <MutualFriendsList
      data={groupedItems} 
      selected={selectedObjs} 
      onSelect={addSelected}
    />
    </div>
   </Fragment>
  );
}



export default CreateDish;