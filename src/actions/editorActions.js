import APICalls from '../apiCalls.js';
import * as modal from './modalActions';

export const FETCH_FAILURE = 'FETCH_FAILURE';
export const GOT_CATS = 'GOT_CATS';
export const GOT_FRIENDS = 'GOT_FRIENDS';
export const GOT_ITEMS = 'GOT_ITEMS';
export const LOADING = 'LOADING';
export const RESET = 'RESET';
export const SELECTED_FRIEND = 'SELECTED_FRIEND';
export const SELECTED_MAIN = 'SELECTED_MAIN';


export function addItem(text, catId, itemType) {
  return async (dispatch) => {
    dispatch(loading())
    try {
      const newItem = await APICalls.addNewItem(text, catId);
      //if catID is in the normal exclude list don't exclude it
      let excludeArr = [11, 12];
      if (excludeArr.includes(catId)) {
        excludeArr.splice(excludeArr.indexOf(catId), 1);
      }
      dispatch(getItemsFiltered(excludeArr)); //refresh list
      dispatch(selectItem(newItem, itemType));
    } catch(error) {
       dispatch(fetchFailure("addItem ", error.message))
    }
}}

export function addPairing(mainId, friendId, affinityId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
       await APICalls.addNewPairing(mainId, friendId, affinityId);
       //refresh friends
       dispatch(getFriends(mainId));
    } catch(error) {
       dispatch(fetchFailure("addPairing ", error.message))
    }
  }
}

export function deleteItem(itemId) {
  return async (dispatch) => {
    dispatch(loading())
    try {
      await APICalls.deleteItem(itemId);
      const payload = {
          content: "Item deleted!",
      };
      dispatch(reset());
      dispatch(getItems());
      dispatch(modal.showSuccessModal(payload));  //show modal
   
    } catch(error) {
      dispatch(fetchFailure("deleteItem ", error.message))
    }
  }
}

export function deletePairing(mainId, friendId) {
  return async(dispatch) => {
    dispatch(loading());
     try {
      await APICalls.deletePairing(mainId, friendId);
      //refresh friends
      dispatch(getFriends(mainId));
    } catch(error) {
      dispatch(fetchFailure("deleteItem ", error.message))
    }
  }
}

export const fetchFailure = (error) => ({
   type: FETCH_FAILURE,
   payload: error
});

export const loading = () => ({
  type: LOADING
});

export function getCats() {
   return async (dispatch) => {
      dispatch(loading()) //turn on loader TODO
      try {
        const data = await APICalls.getCats();
        dispatch(gotCats(data))
      } catch (error) {
        dispatch(fetchFailure("getCats ", error.message))
      }
   }
}

export const gotCats = (cats) => ({
  type: GOT_CATS,
  payload: cats
});

export function getFriends(mainId) {
   return async (dispatch) => {
      dispatch(loading()) //turn on loader TODO
      try {
        const data = await APICalls.getFriends(mainId); 
        //got here it's not good
        dispatch(gotFriends(data))
      } catch (error) {
        dispatch(fetchFailure('getFriends ', error.message))
      }
   }
}

export const gotFriends = (friends) => ({
  type: GOT_FRIENDS,
  payload: friends
});

export function getItems() {
  console.log('got to get items');
   return async (dispatch) => {
      dispatch(loading()) //turn on loader TODO
      try {
        const data = await APICalls.getAllItems();
        dispatch(gotItems(data))
      } catch (error) {
        dispatch(fetchFailure('getItems ', error.message))
      }
   }
}

export function getItemsFiltered(catIdArray) {
  console.log('got to filtered items');
   return async (dispatch) => {
      dispatch(loading()) //turn on loader TODO
      try {
        const data = await APICalls.getItemsFiltered(catIdArray);
        dispatch(gotItems(data))
      } catch (error) {
        dispatch(fetchFailure('getItems ', error.message))
      }
   }
}

export const gotItems = (items) => ({
  type: GOT_ITEMS,
  payload: items
});

export function mergeItems(keepId, loseId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
       let res = await APICalls.mergeItems(keepId, loseId);
       if (res === true) {
           dispatch(reset());
           dispatch(getItems());
           dispatch(selectItem(keepId), "main");

           dispatch(modal.showSuccessModal({content: "Items were merged"}));
       } else {
           let payload = {
             content: "Something went wrong. " + res
           };
           console.error(res);
           dispatch(modal.showErrorModal(payload));
        }
   } catch(err) {
        let errm = {
          content: "Something went wrong. " + err.message
        };
        dispatch(modal.showErrorModal(errm));
        console.error(err);
  }
  };
}

export function reset() {
  return {
    type: RESET
  }
}

export function selectItem(item, itemType) {
  if (!item) return;
  return (dispatch) => {
    if (itemType === "main") {
      dispatch(selectedMain(item));
      dispatch(getFriends(item.id));
    } else {
      dispatch(selectedFriend(item));
    }
}}

export const selectedFriend = (item) => ({
  type: SELECTED_FRIEND,
  payload: item
});

export const selectedMain = (item) => ({
  type: SELECTED_MAIN,
  payload: item
});

export function updateCombo(mainId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
       await APICalls.updateCombo(mainId);
       await dispatch(getFriends(mainId));
       const payload = {
          content: "All items now relate to eachother",
       };
       dispatch(modal.showSuccessModal(payload));
    } catch(error) {
       dispatch(fetchFailure("updateCombo ", error.message))
    }
  }
}

export function updateParent(mainId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
       await APICalls.updateParent(mainId);
       await dispatch(getFriends(mainId));
       const payload = {
          content: "Item now entertains children's friends",
       };
       dispatch(modal.showSuccessModal(payload));
    } catch(error) {
       dispatch(fetchFailure("updateParent ", error.message))
    }
  }
}