import React, { Fragment, useState,  useRef} from 'react';
import ItemsListFull from '../components/itemsListFull';
import "../styles/friends.css";
//import Autocomplete from '../components/autocomplete';
import TagsBox from '../components/TagsBox';
//import {groupDataByFieldname} from '../utilities/data';
//import APICalls from '../apiCalls';


const FlavorFinder = () => {

  //for tag
  const [selectedObjs, setSelectedObjs] = useState([]);
  
  //data for autocomplete box
  // const [data, setData] = useState([]);

  //data for grouped list
  //const [groupedItems, setGroupedItems] = useState({});
  //const [allGroupedData, setAllGroupedData] = useState([]);


  const [isLoading, setIsLoading] = useState(true);

  //ref to Autocomplete
  const tagRef =  useRef();
  const pageRef = useRef();

// //initial page load don't repeat
// useEffect(() => {
//   const initalLoad = async() => {
//      const ungrouped = await APICalls.getAllItems();
//      const grouped = groupDataByFieldname(ungrouped, "cat", true);
//      return {ungrouped, grouped};
//   };
//   initalLoad()
//   .then(load => {
//    // setAllGroupedData(load.grouped);
//   });
// }, []);




 // eslint-disable-next-line
 //  const loadItems = useCallback(async() => {
 //    let selectedIds;
 //    console.log('loadItems called, selectedObs:', selectedObjs);
 //     if (!selectedObjs || selectedObjs.length === 0) {
 //      //return all
 //       selectedIds = [];
 //     } 
 //     selectedIds = selectedObjs.map(i => {
 //       return parseInt(i.id);
 //     });
 //      // console.log('selectedIds:', selectedIds);
 //      // const ungrouped = await APICalls.getMutual(selectedIds);
 //      // const grouped = groupDataByFieldname(ungrouped, "cat", true);
 //      // return {ungrouped, grouped};
 // // eslint-disable-next-line     
 //    }, [selectedObjs]); //every time ids change reload friends


  // useEffect(() => {
  //   setIsLoading(true);
  //   loadItems().then(results => {
  //     setGroupedItems(oldArr => results.grouped);
  //   //  setData(oldArr => results.ungrouped);
  //     setIsLoading(false);
  //   });
  //    // eslint-disable-next-line
  //  },[loadItems]); //run once and when selectedIds change

  //from list
  const selectFromList = (newobj) => {
   // console.log('FF newobj selected', newobj);
   if (Array.isArray(newobj)) {
    console.log('got here array');
    //filter out dups
    let res = newobj.filter(it => {
      return (!selectedObjs.find(x => it.id === x.id));
    });
    console.log('res:', res);

    setSelectedObjs(oldArr => {
       // console.log('oldarr:', oldArr);
        return [...oldArr, ...res];
    });

    } else { 
     //one regular object
     if (selectedObjs.find(x => x.id === newobj.id) ) return;

     setSelectedObjs(oldArr => {
     // console.log('oldarr:', oldArr);
      return [...oldArr, newobj];
     });
   } //end if
  };

  //from tags
  const removeFromTags = (remainingList) => {
    console.log('removefromtags called, remaininglist:', remainingList);
    if (!remainingList.length) {
     // console.log('in store:', allGroupedData);
     // setGroupedItems(allGroupedData);
    }
    setSelectedObjs(oldArr => {
     // console.log('oldarr:', oldArr);
      return [...remainingList];
   });
   console.log('tagRef: ', tagRef);
   };

   const loaderOrList = () => {
    // console.log('isLoading?', isLoading);
    //   if (isLoading) {
    //       return (
    //         <div className="h-75 d-flex justify-content-center align-items-center">
    //           <div className="spinner-border d-flex text-info" role="status">
    //              <span className="visually-hidden">Loading...</span>
    //           </div>
    //         </div>
    //       )
    //    } else {
        return (
        <ItemsListFull 
            onSelect={selectFromList}
            selected={selectedObjs}
        />
        )
   };

  return (
  <Fragment>
   <div id="finder-page" ref={pageRef} className="finder-page mw-100" >
      <div className="finder-container mw-25">
         <TagsBox
           selectedItems={selectedObjs}
           onRemove={removeFromTags}
           thisRef={tagRef}
         />
      </div>


      {loaderOrList()}
      
   </div>
   </Fragment>
  );
}



export default FlavorFinder;