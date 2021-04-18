import React, { Fragment, useState, useEffect, useCallback } from 'react';
import APICalls from '../apiCalls';
import {groupDataByFieldname} from '../utilities/data';

const ItemsList = ({selected, onSelect}) => {
  const [groupedItems, setGroupedItems] = useState({});

 
  const loadItems = useCallback(async() => {
    let selectedIds;
     if (!selected || selected.length === 0) {
      //return all
       selectedIds = [];
     } 
     selectedIds = selected.map(i => {
       return parseInt(i.id);
     });
      console.log('selectedIds:', selectedIds);
      const data = await APICalls.getMutual(selectedIds);
      const grouped = groupDataByFieldname(data, "friend_cat", true);
      return grouped;
    }, [selected]); //every time ids change reload friends


  useEffect(() => {
    loadItems().then(grouped => {
      setGroupedItems(oldArr => grouped);
    //  console.log('currentgroupdItems: ', grouped);
    });
   },[ loadItems]); //run once and when selectedIds change





  const selectItem = (e) => {
   const id = e.target.attributes["data-friend-id"].value;
   const name = e.target.attributes["data-label"].value;
   onSelect({value: name, id: id});
  };



  const renderItems = (items) => {
    if (items) {
      return items.map(i => {
        return (
       
           <li className="friend" 
               onClick={selectItem} 
               key={i.friend_id}
               data-friend-id={i.friend_id}
               data-label={i.friend}
            >
               {i.friend}

          </li>
        
        )
     })
    }
  };




  const renderCats = () => {
     const keys = Object.keys(groupedItems);
     //console.log('keys:', keys);

     const result = keys.map((k, idx) => {
        return (
           <div className="row align-items-start catheader" key={idx}>
              {k}
              <ul className="friendslist">
                {renderItems(groupedItems[k])}
             </ul>
            </div>
        )
     });
    return result;
 };



   return (
    <Fragment>
      <div className="list-container">
          {renderCats()}
      </div>
    </Fragment>
)};

export default ItemsList;