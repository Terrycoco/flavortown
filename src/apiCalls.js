import axios from 'axios';
import {store} from './index';
import * as modals from './actions/modalActions';
import {nestChildren, childrenToArray} from './utilities/data';

const API = (process.env.NODE_ENV === 'production') ?  process.env.REACT_APP_API : "http://localhost:5000";

//store.dispatch(someAction)

function addNewItem(newItemText, catId=3, itemType) {
  const body = {item: newItemText, cat_id: catId};

    return new Promise(function(resolve, reject) {
       axios.post(API + "/items/new", body)
      .then(function(response) {
        console.log('api status:', response.status);
        if(response.status === 200) {
          console.log('res', response.data)
           resolve(response.data);
         }
      })
      .catch(function(error) {
        console.log('APICALL ERROR', error.response.data);
        store.dispatch(modals.showErrorModal({content: error.response.data.message}));
        reject();
      });
  })
}

const addNewPairing = async(mainId, catId, friendId, affinityId) => {
  return new Promise(function(resolve, reject) {
      const body = {item1_id: mainId, catId: catId, item2_id: friendId, level: affinityId};
      axios.post(API + "/pairing/new", body)
      .then(function(response) {
        if(response.status === 200) {
           resolve(true);
         }
      })
      .catch(function(error) {
        console.log('APICALL ERROR', error.response.data);
        store.dispatch(modals.showErrorModal({content: error.response.data.message}));
        reject();
      });
  });
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

   return new Promise(function(resolve, reject) {
      const body = {item1_id: mainId, item2_id: friendId};
      axios.post(API + "/pairing/delete", body)
      .then(function(response) {
        if(response.status === 200) {
           resolve(true);
         }
      })
      .catch(function(error) {
        console.log('API CALL ERROR', error.response.data);
        store.dispatch(modals.showErrorModal({content: error.response.data.message}));
        reject();
      });
  })
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
      //console.log('data ret:', jsonData);
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
      console.log('getItemsByCat called:', catId);
      const response = await fetch(API + "/itemsbycat/" + catId);
      const jsonData = await response.json();
   
      // let nested = await nestChildren(jsonData);
      // console.log('nested', nested);
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
     console.log('from server:', jsonData);
      return jsonData;
    } catch(err) {
      console.error(err.message);
    } 
  } else {
    try {
      const response = await fetch(API + "/cats");
      const jsonData = await response.json();
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
      await fetch(API + "/merge", {
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

function updateParent(mainId) {
  return new Promise(function(resolve, reject) {
      const body = {item_id: mainId};
      console.log('updating parent: ', body);
      axios.post(API + "/updParent", body)
      .then(function(response) {
        if(response.status === 200) {
           resolve(true);
         }
      })
      .catch(function(error) {
        console.log('APICALL ERROR', error.response.data);
        store.dispatch(modals.showErrorModal({content: error.response.data.message}));
        reject();
      });
  })
}


const updateItem = async(item) => {
   return new Promise(function(resolve, reject) {
      console.log('updating item: ', item);
      axios.post(API + "/upditem", item)
      .then(function(response) {
        if(response.status === 200) {
           resolve(true);
         }
      })
      .catch(function(error) {
        console.log('APICALL ERROR', error.response.data);
        store.dispatch(modals.showErrorModal({content: error.response.data.message}));
        reject();
      });
  })
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
  mergeItems: mergeItems,
  updateParent: updateParent
};

export default APICalls;

