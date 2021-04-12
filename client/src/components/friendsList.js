import React, { Fragment, useState } from 'react';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);


  //fetch all
  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/friends");
      const jsonData = await response.json();
     //put into store
      setItems(jsonData);
    } catch(err){
      console.error(err.message);
    }
  };
};

import default FriendsList;