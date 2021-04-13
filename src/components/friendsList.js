import React, { Fragment, useState } from 'react';
import config from '../config';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);


  //fetch all
  const getItems = async () => {
    try {
      const response = await fetch(config.API.concat("/friends"));
      const jsonData = await response.json();
     //put into store
      setItems(jsonData);
    } catch(err){
      console.error(err.message);
    }
  };
};

import default FriendsList;