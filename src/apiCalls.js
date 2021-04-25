
const API = (process.env.NODE_ENV === 'production') ?  process.env.REACT_APP_API : "http://localhost:5000";

const getAllItems = async () => {
  //ordered by item
    try {
      const response = await fetch(API + "/items");
      const jsonData = await response.json();
       console.log("data: ", jsonData);
      return jsonData;

    } catch(err) {
      console.error(err.message);
    }
};

const getCats = async () => {
    try {
      const response = await fetch(API + "/cats");
      const jsonData = await response.json();
     // console.log("data: ", jsonData);
      return jsonData;

    } catch(err) {
      console.error(err.message);
    }
};

const getFriends = async(mainId) => {
  try {
      console.log('fetching friends of ', mainId);
      const response = await fetch(API + "/friends/" + mainId);
      const jsonData = await response.json();
      return jsonData;
    } catch(err) {
      console.error(err.message);
    }
};

const getItemsByCat = async(catId) => {
  if (!catId) return;
  try {
     
      const response = await fetch(API + "/itemsbycat/" + catId);
      const jsonData = await response.json();
      //console.log('data returned: ', jsonData);
      return jsonData;
    } catch(err) {
      console.error(err.message);
    }
};



const getMutual = async(idArray) => {
  //ordered by category
  if (idArray && idArray.length > 0) {
    try {
      console.log('fetching mutual friends ', idArray);
      const response = await fetch(API + "/mutual/" + JSON.stringify(idArray));
      const jsonData = await response.json();
     // console.log("jsondata: ", jsonData);
      return jsonData;
    } catch(err) {
      console.error(err.message);
    } 
  } else {
    try {
      const response = await fetch(API + "/mutual/[]");
      const jsonData = await response.json();
     // console.log("jsondata: ", jsonData);
      return jsonData;

    } catch(err) {
      console.error(err.message);
    }
  }
};

const addNewPairing = async(mainId, friendId, affinityId) => {
   try{
       const body = {item1_id: mainId, item2_id: friendId, level: affinityId};
       // console.log(body);
        await fetch(API + "/pairing/new", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        return;
      } catch(err) {
        console.error('error adding pairing: ',  err.message);
      }
};



const addNewItem = async(newItemText, catId) => {
    const body = {item: newItemText, cat_id: catId};
    console.log('trying to add: ', body);
    try{
       // console.log(body);
        const response = await fetch(API + "/items/new", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        console.log('addNewItem response: ', jsonData); //returned id?
        return jsonData;
      } catch(err) {
        console.error('error adding item: ',  err.message);
      }
};


const deletePairing = async(mainId, friendId) => {
   try{
       const body = {item1_id: mainId, item2_id: friendId};
       // console.log(body);
        await fetch(API + "/pairing/delete", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        return;
      } catch(err) {
        console.error('error adding pairing: ',  err.message);
      }
};





const APICalls = {
  API: API,
  getAllItems: getAllItems,
  getCats: getCats,
  getFriends: getFriends,
  addNewItem: addNewItem,
  getMutual: getMutual,
  addNewPairing: addNewPairing, 
  deletePairing: deletePairing,
  getItemsByCat: getItemsByCat
};

export default APICalls;

