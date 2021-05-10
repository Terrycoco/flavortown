
const API = (process.env.NODE_ENV === 'production') ?  process.env.REACT_APP_API : "http://localhost:5000";

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

const deleteItem = async(mainId) => {
    const body = {item_id: mainId};
    console.log('trying to delete: ', body);
    try{
       // console.log(body);
        const response = await fetch(API + "/item/delete", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        return response;
      } catch(err) {
        console.error('error deleting item: ',  err.message);
      }
};

const deletePairing = async(mainId, friendId) => {
  if (!mainId || !friendId) return;
   try{
       const body = {item1_id: mainId, item2_id: friendId};
       // console.log(body);
        await fetch(API + "/pairing/delete", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        return true;
      } catch(err) {
        console.error('error adding pairing: ',  err.message);
      }
};

const getAllItems = async () => {
  //ordered by item
    try {
      const response = await fetch(API + "/items");
      const jsonData = await response.json();
     //  console.log("data: ", jsonData);
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
  if (!mainId) return;
  try {
      console.log('fetching friends of ', mainId);
      const response = await fetch(API + "/friends/" + mainId);
      const jsonData = await response.json();
      console.log('data ret:', jsonData);
      return jsonData;
    } catch(err) {
      console.error(err.message);
    }
};

const getIngredients = async(itemId) => {
  try {
      console.log('fetching ingredients of ',  itemId);
      const response = await fetch(API + "/ingreds/" + itemId);
      const jsonData = await response.json();
       console.log('ingreds: ', jsonData);
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

const getItemsFiltered = async(idArray) => {
  //ordered by category
  if (idArray && idArray.length > 0) {
    try {
      console.log('fetching items without ', idArray);
      const response = await fetch(API + "/itemsfiltered/" + JSON.stringify(idArray));
      const jsonData = await response.json();
     // console.log("jsondata: ", jsonData);
      return jsonData;
    } catch(err) {
      console.error(err.message);
    } 
  } else {
    try {
      const response = await fetch(API + "/items");
      const jsonData = await response.json();
     // console.log("jsondata: ", jsonData);
      return jsonData;

    } catch(err) {
      console.error(err.message);
    }
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

const mergeItems = async(keepId, loseId) => {
    const body = {keep: keepId, lose: loseId};
    console.log('trying to merge: ', body);
    try {
       // console.log(body);
      const res =  await fetch(API + "/merge", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
      return true;
       
    } catch(err) {
        console.error('error merging items: ',  err.message);
        return err.message;
    }
};

const updateCombo = async(mainId) => {
   try {
      await fetch(API + "/updCombo/" + mainId);
      return; 

    } catch(err) {
      console.error(err.message);
    }
};

const updateParent = async(mainId) => {
  const body = {item_id: mainId};
  try {
       // console.log(body);
      const res =  await fetch(API + "/updParent", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
      return res;
       
    } catch(err) {
        console.error('error updating parent : ',  err.message);
        return err.message;
    }
};

const updateItem = async(mainId, name, catId) => {
    const body = {item_id: mainId, item: name, cat_id: catId};
    console.log('trying to update: ', body);
    try{
       // console.log(body);
        const response = await fetch(API + "/item/edit", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        return response;
      } catch(err) {
        console.error('error adding item: ',  err.message);
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
  getItemsByCat: getItemsByCat,
  getItemsFiltered: getItemsFiltered,
  getIngredients: getIngredients,
  updateCombo: updateCombo,
  updateItem: updateItem,
  deleteItem: deleteItem,
  mergeItems: mergeItems
};

export default APICalls;

