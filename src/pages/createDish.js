import React, { Fragment, useState, useCallback, useEffect, useRef} from 'react';
import MutualFriendsList from '../components/mutualFriendsList';
import "../styles/friends.css";
import Autocomplete from '../components/autocomplete';
import {groupDataByFieldname} from '../utilities/data';
import APICalls from '../apiCalls';


const CreateDish = () => {
  //for tag
  const [selectedObjs, setSelectedObjs] = useState([]);
  
  //data for autocomplete box
  const [data, setData] = useState([]);

  //data for grouped list
  const [groupedItems, setGroupedItems] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  //ref to Autocomplete
  const acRef =  useRef();
  const pageRef = useRef();





 // eslint-disable-next-line
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
      const grouped = groupDataByFieldname(ungrouped, "cat", true);
      return {ungrouped, grouped};
 // eslint-disable-next-line     
    }, [selectedObjs]); //every time ids change reload friends


  useEffect(() => {
    loadItems().then(results => {
      setGroupedItems(oldArr => results.grouped);
      setData(oldArr => results.ungrouped);
    });
     // eslint-disable-next-line
   },[loadItems]); //run once and when selectedIds change




  //from list
const selectFromList = (newobj) => {

    setSelectedObjs(oldArr => {
     // console.log('oldarr:', oldArr);
      return [...oldArr, newobj]
   });
  };

  const removeFromAC = (remainingList) => {
    setSelectedObjs(oldArr => {
     // console.log('oldarr:', oldArr);
      return [...remainingList];
   });
   //remove focus?
   document.activeElement.blur();
   };



  return (
  <Fragment>
   <div id="finder-page" ref={pageRef} className="finder-page mw-100" >
      <div className="finder-container mw-25">
        <Autocomplete
           data={data}
           thisRef={acRef}
           selectedArray={selectedObjs}
           onSelect={selectFromList}
           onRemove={removeFromAC}
           loading={isLoading}
        />
      </div>
        <MutualFriendsList
          data={groupedItems} 
          selected={selectedObjs} 
          onSelect={selectFromList}
        />
   </div>
   </Fragment>
  );
}



export default CreateDish;