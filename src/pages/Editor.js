import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import colors from '../styles/colors';
import ItemEditModal from '../components/ItemEditModal';

//for modal
import {openConfirmModal, 
        showModal,
        showFormModal,
        loadParamObject,
        changeParamObject,
        showErrorModal
       } from '../actions/modalActions.js';

//for editor
import {changeExcludedCats,
        getCats,
        getItemsFiltered,
        getFriends,
        selectItem,
        deleteItem,
        addPairing,
        deletePairing,
        updateCombo,
        mergeItems,
        updateParent
      } from '../actions/editorActions';

//import 'reactjs-popup/dist/index.css';
import NewItem from '../components/newItem';
import ItemCombobox from '../components/ItemCombobox';
import "../styles/editor.css";

  const itemClasses = {
    "1": "friend",
    "2": "goodfriend",
    "3": "bestfriend",
    "4": "bff",
    "-1": "enemy",
    "5": "ingred",
    "0": "child",
    "6": "child-friend",
    "7": "member-of",
    "8": "indirect"
  };

const nextElem = {
  mainselect: "friendselect",
  friendselect: "affinityselect",
  affinityselect: "addpairingbtn",
  addpairingbtn: "friendselect"
};



const Editor = ({dispatch, items, cats, friends, selectedMain, selectedFriend, affinities, excludedCats=[], modalIsOpen}) => {
    const mainRef = useRef();
    const friendRef = useRef();
    const affinityRef = useRef();
    const editItemRef = useRef();
    const modalRef = useRef();
    const dishesRef = useRef();
    const combosRef =  useRef();
    const filterRef = useRef();

    const [catId, setCatId] = useState();

    const [inputText, setInputText] = useState("");
   
    const [affinityId, setAffinityId] = useState(1);
    const [newIsOpen, setNewIsOpen] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);


useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
   //return cleanup function
   return () => {
     window.removeEventListener('keydown', handleKeyDown);
   }
}, []);

useEffect(() => {
  refreshData();
},[]);


useEffect(() => {
    dispatch(getCats())
}, [dispatch]);

// useEffect(() => {
//   dishesRef.current.checked = excludedCats.includes(11)
//   combosRef.current.checked = excludedCats.includes(12)
// }, [excludedCats]);



useEffect(() => {
  dispatch(getFriends(selectedMain.id))
}, [dispatch,selectedMain.id]);


useEffect(() => {
  if (selectedFriend.friend_type !== undefined) {
    setAffinityId(selectedFriend.friend_type);
  } else {
    setAffinityId(1);
  }
}, [selectedFriend]);




const addEditPairing = async () => {
  if ([6,7,8].includes(affinityId)) {
    dispatch(showErrorModal({content: 'Cannot add indirect friendship'}));
    return;
  }
  dispatch(addPairing(selectedMain.id, selectedMain.cat_id, selectedFriend.id, affinityId));
  //friendRef.current.focus();
};

const afterItemAdded = (itemType) => {
   setNewIsOpen(false);
   if (itemType === "maim") {
    document.getElementById("mainselect").focus();
   } else {
    document.getElementById("friendselect").focus();
   }
};

const afterItemEdited = () => {
  setShowEditModal(false);
  document.getElementById("mainselect").focus();
}

const afterAffinitySelect = (e) => {
  console.log('after affinity', e.target.value);
  setAffinityId(e.target.value);
  //document.getElementById("addpairingbtn").focus();
};


const callDeletePairing = (e) => {
  if (([6, 7, 8]).includes(affinityId)) {
    dispatch(showErrorModal({content: "You can't delete an indirect friend.  Go to parent to delete this pairing"}))
    return;
  }
  dispatch(deletePairing(selectedMain.id, selectedFriend.id));
};

const callDeleteItem = () => {
  dispatch(deleteItem(selectedMain.id));
};

function callMerge() {
  dispatch(mergeItems(callMerge.keepId, callMerge.loseId));
};

//  const callUpdateCombo = () => {
//    dispatch(updateCombo(selectedMain.id));
//  };

// const callUpdateParent = () => {
//    dispatch(updateParent(callUpdateParent.item_id));
//  };

const changeCat = (e) => {
  setCatId(e.target.value);
} 


const changeFilter = (e) => {
  let arr = [];
  if (dishesRef.current.checked) arr.push(11);
  if (combosRef.current.checked) arr.push(12);
    dispatch(changeExcludedCats(arr)); 
    refreshData()
};

const clickFriendList = (e) => {
   console.log('clickFriendList');
   const aid = parseInt(e.target.getAttribute("data-friend-type"));
   console.log('affinityID: ', aid);
   setAffinityId(aid);
   const name = e.target.getAttribute("data-name");
   const id = parseInt(e.target.getAttribute("data-id"));
   const item = {id: id, name: name, friend_type: aid};
   dispatch(selectItem(item, "friend"));
   affinityRef.current.focus();
};


const confirmDelete = () => {
  const item = selectedMain;
   if(!item || item.id === undefined)  {
    dispatch(showModal({content: 'No Main Item selected'}));
    return;
   } 
   const payload = {
     action: callDeleteItem,
     content: `<b>${item.name} (${item.id})</b> and all its pairings will be deleted. Click OK to continue.`
   };
   dispatch(openConfirmModal(payload));
};

// const confirmUpdateCombo = () => {
//    let item = selectedMain;
//    if (item.cat_id === 12 || item.cat_id === 13) {
//    const payload = {
//      action: callUpdateCombo,
//      content: `This will ensure that all ingredients of the combo <b>${item.name} (${item.id})</b> will be friends with eachother. Click OK to continue.`
//    };
//     dispatch(openConfirmModal(payload));
//   } else {
//     dispatch(showModal({content: 'Must have Combo or Sauce selected as Main Item'}));
//     return;
//   } 
// };

// const confirmParentUpdate = () => {
//    let item = selectedMain;
//    if(item.id === undefined)  {
//     dispatch(showModal({content: 'Must have Parent with children selected as Main Item'}));
//     return;
//    } else {
//      callUpdateParent.item_id = item.id;
     
//      const payload = {
//        action: callUpdateParent,
//        content: `This will rollup all the children's friends (if any) up to the Parent <b>${item.name} (${item.id})</b>. Click OK to continue.`
//      };
//      dispatch(openConfirmModal(payload));
//    }
// };

const confirmMerge = () => {
   if(selectedMain.id === undefined || selectedFriend.id === undefined)  {
    dispatch(showModal({content: 'Must have item to keep in Main, and item to lose in Friend'}));
    return;
   } 

   const keepItem = selectedMain;
   const loseItem = selectedFriend;



    let msg =  (
     `<Fragment>
      <p>This will merge</p>
      <p><b>${loseItem.name} (${loseItem.id})</b></p>
      <p><i className="fas fa-arrow-down"></i>&emsp;INTO&emsp; <i className="fas fa-arrow-down"></i></p>
      <p><b>${keepItem.name} (${keepItem.id})</b></p>
      <p>${loseItem.name} WILL BE DELETED!</p>
      <p>Click OK to continue</p>
      </Fragment>`
    );

     callMerge.keepId = keepItem.id;
     callMerge.loseId = loseItem.id;

    
    const payload = {
      title:"IMPORTANT! CHECK CAREFULLY!",
      content: msg,
      action: callMerge
    };
    dispatch(openConfirmModal(payload));
};

const editItemName = (e) => {
  setInputText(e.target.value);
};

function handleKeyDown (e) {
  let elem;
  let next;
  e.stopPropagation();
  switch(e.keyCode) {
  case 13:
    elem = e.srcElement.id;
    next = nextElem[elem];
    if(!next) return;
    if (elem === 'friendselect') {
      e.preventDefault(); //prevent opening
    }
    document.getElementById(next).focus();
    break;
  case 9:
    e.preventDefault(); //don't do chrome crazy
        console.log('got here')
    elem = e.srcElement.id;
    next = nextElem[elem];

    if (elem === 'friendselect') {
      //e.preventDefault();
    }
    document.getElementById(next).focus();
    break;
  default:
   return;
 }
}

const onClick = (field) => {
  setFieldName(field);
};

const openEditMain = () => {
  setFieldName("main");
  //must have somethng to edit
  if (!selectedMain.id) {
    dispatch(showModal({content: "You must select a Main Item"}));

  } else {
    setShowEditModal(true);
  }
};

const openNewFriend = (input) => {
  //console.log('input text: ', input)
  setFieldName("friend");
  setInputText(input ? input : "");
  setNewIsOpen(true);
};

const openNewMain = (input) => {
  //console.log('input text: ', input)
  setFieldName("main");
  setInputText(input ? input : "");
  setNewIsOpen(true);
};


const refreshData = () => {
  dispatch(getItemsFiltered(excludedCats))
};


return (

<div className="editorpage" autoFocus={false}>
  <div className="pairings-container ">

      {/* Button Row */}
      <div className="row checkbox-row w-100 d-flex justify-content-between"  >
          <div className="btns-container col-md-6">
                    <button 
                        type="button"
                        className="btn btn-primary btn-sm text-nowrap"
                        id="AddItembtn"
                        onClick={openEditMain}
                        tabIndex="-1"
                    >
                      Edit Item
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        id="deleteItemBtn"
                        onClick={confirmDelete}
                        tabIndex="-1"
                        >
                        Delete
                    </button>
{/*                     <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      id="updateComboBtn"
                      onClick={confirmUpdateCombo}
                      tabIndex="-1"
                      >*/}
{/*                      Interrelate
                     </button>*/}
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        id="mergeBtn"
                        onClick={confirmMerge}
                        tabIndex="-1"
                        >
                        Merge
                    </button>
{/*                     <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        id="mergeBtn"
                        onClick={confirmParentUpdate}
                        tabIndex="-1"
                        >
                        Rollup
                    </button>*/}
                  <button tabIndex="-1" 
                          ref={filterRef}
                          type="button" 
                           className="btn btn-sm btn-primary"
                          onClick={refreshData}
                  >
                  Refresh Data
                  </button>
        </div>
        <div className="checkbox-group">
           <span className="w-100 checkbox-group-label">Click to exclude</span>
            <span className="checkboxes form-check" >
              <input tabIndex="-1" ref={dishesRef} className="checkbox" type="checkbox" onClick={changeFilter} id="chkDishes" value={excludedCats.includes(11)} />
              <label tabIndex="-1" className="" htmlFor="inlineCheckbox1">Dishes</label>
            </span>

          <span className="checkboxes form-check" >
            <input tabIndex="-1" ref={combosRef} className="checkbox" type="checkbox" onClick={changeFilter} id="chkCombos" value={excludedCats.includes(12)} />
            <label tabIndex="-1" className="form-check-label" htmlFor="inlineCheckbox2">Combos</label>
          </span>
        </div>
    </div>

    {/* Main Row */}
    <div className="main-row row w-100 d-flex justify-content-start ">
               <div className="col-md-6 gx-0 d-flex align-items-end">
                    <div className="w-100 input-group d-flex">
                        <ItemCombobox
                            id="mainselect"
                            itemType="main"
                            thisRef={mainRef}
                            autoFocus={false}
                            onNoMatch={openNewMain}
                         />
                    </div>
               </div>

               <div className="col-md-4 gx-0">
                  <label className="control-label" htmlFor="selectcontrol">Main Category: {catId}</label>
                  <select 
                    className="rbt-input-main form-control rbt-input form-control-sm" 
                    id="selectCats" 
                    onChange={changeCat}
                    required
                    value={selectedMain.cat_id}
                    tabIndex="-1"
                  >
                    {cats && cats.map(c => (
                      <option key={c.cat_id} value={c.cat_id}>{c.cat}</option>
                    ))}
                  </select>
               </div>
      </div>

      
      {/* Friend Row */}
      <div className="friend-row row w-100 input-group d-flex">
        <div className="col-md-6 gx-0 d-flex align-items-end">
              <div className="w-100 input-group d-flex">
                   <ItemCombobox
                      id="friendselect"
                      thisRef={friendRef}
                      itemType="friend"
                      autoFocus={false}
                      onNoMatch={openNewFriend}
                    />
              </div>
        </div>
        <div className="col-md-3">
          <div className="w-100">
            <label className="control-label" htmlFor="affinities">{`Affinity ${affinityId}`}</label>
            <select
                onChange={afterAffinitySelect}
                className="form-control form-control-sm" 
                ref={affinityRef} 
                name="affinity-select" 
                id="affinityselect"
                value={affinityId}
                tabIndex="3"
              >
                 {affinities.map(a => {
                  return (
                      <option 
                         key={a.friend_type}
                         value={a.friend_type}
                         className="dropdown-item"
                         data-friend-type={a.friend_type}
                      >{a.name}</option>
                    )
            })}
            </select>
          </div>
        </div>
        <div className="btns-container col-md-3 d-flex">
                <button 
                    type="button"
                    className="btn btn-sm btn-success"
                    id="addpairingbtn"
                    onClick={addEditPairing}
                >
                 <i className="fas fa-arrow-down"></i>
               </button>
                <button 
                    type="button"
                    className="btn btn-sm editItemBtn"
                    id="AddFriendbtn"
                    onClick={openNewFriend}
                    tabIndex="-1"
                >
                 <i className="fas fa-plus"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm deletePairingBtn"
                    id="deletePairingBtn"
                    onClick={callDeletePairing}
                    tabIndex="-1"
                    >
                    <i className="fas fa-trash-alt"></i>
                </button>
        </div>
      </div>
  </div> {/*end pairings container */}


    {/* Friend List */}
    <div className="friends-container mh-25" tabIndex="-1">
     <div>
       <ul id="friendslist"  className="friends-group">
       {friends && friends.map(i => {
     
        let cl = "listitem";
        cl = cl + ((i.is_parent === 1) ?  " parent" :  " " + itemClasses[i.friend_type]);

        return (
        <li key={`key${i.id}`}>
           <span 
               className={cl}
               key={i.id}
               data-id={i.id}
               data-name={i.name}
               data-friend-type={i.friend_type}
               onClick={clickFriendList}
          >
               {i.name}
            </span>
          </li> 
          )})
         }
          </ul>
      </div>
    </div>


   <NewItem
      id="newItemForm"
      text={inputText} 
      onClose={afterItemAdded}
      isOpen={newIsOpen}
      itemType={fieldName}
    /> 

    <ItemEditModal
      id="item-edit-modal"
      show={showEditModal}
      onClose={afterItemEdited}
    />
</div>
)
}

function mapStoreToProps(store) {
  console.log('store:', store.editor);
  return {
    modalIsOpen: store.modal.show,
    ...store.editor
  }
} 


export default connect(mapStoreToProps)(Editor);

