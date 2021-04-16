import React, {Fragment, useState} from 'react';
import MutualFriendsList from '../components/mutualFriendsList';
import "./pairings.css";


const CreateDish = () => {
  const [selected, setSelected] = useState([]);

  const updateSelected = (selectedId) => {
     const newarr = [...selected];
     newarr.push(selectedId);
     console.log("newarr:", newarr);
     setSelected(newarr);
  };

  return (
   <Fragment>
    <h3>Create Your Dish</h3>
    <div>SELECTED: {JSON.stringify(selected)}</div>
    <MutualFriendsList 
          selected={selected} 
          onSelect={updateSelected}
    />
   </Fragment>
  );
}



export default CreateDish;