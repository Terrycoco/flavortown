import React, { Fragment, useState,  useRef} from 'react';
import FlavorFinderList from '../components/FlavorFinderList';
import "../styles/friends.css";
import TagsBox from '../components/TagsBox';


const FlavorFinder = () => {

  //for tag
  const [selectedObjs, setSelectedObjs] = useState([]);

  //ref to Autocomplete
  const tagRef =  useRef();
  const pageRef = useRef();

  //from list
const selectFromList = (newobj) => {
   // console.log('FF newobj selected', newobj);
   if (Array.isArray(newobj)) {
    //filter out dups
        let res = newobj.filter(it => {
          return (!selectedObjs.find(x => it.id === x.id));
        });
      //  console.log('res:', res);

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
    setSelectedObjs([]);
  }
  setSelectedObjs(oldArr => {
   // console.log('oldarr:', oldArr);
    return [...remainingList];
 });
 };

const loaderOrList = () => {
        return (
        <FlavorFinderList 
            onSelect={selectFromList}
            selected={selectedObjs}
        />
        )
};

  return (
  <Fragment>
   <div id="finder-page" ref={pageRef} className="finder-page mw-100" >

         <TagsBox
           selectedItems={selectedObjs}
           onRemove={removeFromTags}
           thisRef={tagRef}
         />



      {loaderOrList()}
      
   </div>
   </Fragment>
  );
}



export default FlavorFinder;