import React, { Fragment, useState, useEffect } from 'react';
import APICalls from '../apiCalls';
import {groupDataByFieldname} from '../utilities/dataFunctions';

const ItemsList = ({selected, onSelect}) => {
  const [friends, setFriends] = useState([]);
  const [groupedItems, setGroupedItems] = useState([]);


  useEffect(() => {
    const getItems = async () => {
      const data = await APICalls.getMutualFriends(selected);
      console.log('friends', data);
      setFriends(data);
    };
    getItems();
  }, [selected]); //whenever selected changes


  useEffect(() => {
      const groupItems = () => {
      const grouped = groupDataByFieldname(friends, "friend_cat", true);
      console.log('groupeddata: ', grouped);
      setGroupedItems(grouped);
    };
    groupItems();
  }, [friends]);



  const selectItem = (e) => {
   const newItem = e.target.attributes["data-friend-id"].value;
   console.log('item clicked:', newItem);
   onSelect(newItem);
  };



  const renderItems = (items) => {
    if (items) {
      return items.map(i => {
        return (
       
           <li className="friend" 
               onClick={selectItem} 
               key={i.friend_id}
               data-friend-id={i.friend_id}
            >
               {i.friend}

          </li>
        
        )
     })
    }
  };




  const renderCats = () => {
    return groupedItems.map(c => {
        return (
        <Fragment>
        <div className="row align-items-start catheader">
        {c.friend_cat}
        <ul className="friendslist">
          {renderItems(c.items)}
       </ul>
        </div>
        </Fragment>
        )
    });
  };




   return (
    <Fragment>
      <div className="container">
          {renderCats()}
      </div>
    </Fragment>
)};

export default ItemsList;