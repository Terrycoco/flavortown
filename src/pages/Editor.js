import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import sum from 'lodash.sum';
import colors from '../styles/colors';
import isEmpty from 'lodash.isempty';

//for modal
import {openConfirmModal, 
        showSuccessModal, 
        closeModal,
        showErrorModal} from '../actions/modalActions.js';

//for editor
import {getCats,
        getItems,
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
    "6": "child-friend"
  };

const nextElem = {
  mainselect: "friendselect",
  friendselect: "affinityselect",
  affinityselect: "addpairingbtn",
  addpairingbtn: "friendselect"
};



const Editor = ({dispatch, items, cats, friends, selectedMain, selectedFriend, affinities}) => {
    const mainRef = useRef();
    const friendRef = useRef();
    const affinityRef = useRef();
    const editItemRef = useRef();
    const modalRef = useRef();
    const dishesRef = useRef();
    const combosRef =  useRef();
    const filterRef = useRef();

    const [catId, setCatId] = useState();
    // const [friendId, setFriendId] = useState();


    const [editMode, setEditMode] = useState(false);

    const [inputText, setInputText] = useState("");
   
    const [affinityId, setAffinityId] = useState(1);
    const [newIsOpen, setNewIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [filter, setFilter] = useState([11,12]);


useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
   //return cleanup function
   return () => {
     window.removeEventListener('keydown', handleKeyDown);
   }

}, []);


useEffect(() => {
    dispatch(getCats())
}, [dispatch]);

useEffect(() => {
  dishesRef.current.checked = true;
  combosRef.current.checked = true;
}, []);


useEffect(() => {
  dispatch(getItemsFiltered(filter))
}, [dispatch, filter]);

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
  dispatch(addPairing(selectedMain.id, selectedFriend.id, affinityId));
  //friendRef.current.focus();
};

const afterItemAdded = (catid) => {
  console.log('catid: ', catid);
   if (catid === 12) combosRef.current.click();
   if (catid === 11) dishesRef.current.click();
   setNewIsOpen(false);
   document.getElementById('friendselect').focus();
};

const afterAffinitySelect = (e) => {
  console.log('after affinity', e.target.value);
  setAffinityId(e.target.value);
 // document.getElementById("addpairingbtn").focus();
};


const callDeletePairing = (e) => {
  dispatch(deletePairing(selectedMain.id, selectedFriend.id));
};

const callDeleteItem = () => {
  dispatch(deleteItem(selectedMain.id));
};

const callMerge = (keepId, loseId) => {
  console.log('got here callMerge');
  dispatch(mergeItems(keepId, loseId));
};

 const callUpdateCombo = () => {
   dispatch(updateCombo(selectedMain.id));
 };

const changeCat = (e) => {
  setCatId(e.target.value);
};

const changeFilter = (e) => {
  let arr = [];
  if (dishesRef.current.checked) arr.push(11);
  if (combosRef.current.checked) arr.push(12);

  if (sum(arr) !== sum(filter)) {
    setFilter(arr); //triggers data refresh
  }
  filterRef.current.style.backgroundColor = colors.lightgreen;
};

const changeEditMode = () => {
  //dont open if there's no id selectd
  if (selectedMain.id) {
    setEditMode(!editMode);
    //console.log('curr vals: ', mainId, inputText, catId);
  }
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

const closeEditItem = () => {
  if (fieldName === "main") {
    friendRef.current.focus();
  } else {
    document.getElementById("addpairingbtn").focus();
  }
   
   setEditIsOpen(false);
};

const confirmDelete = () => {
   if (!selectedMain.id) return;
   let item = selectedMain;
   if(!item) return;
   const payload = {
     action: callDeleteItem,
     content: `<b>${item.name} (${item.id})</b> and all its pairings will be deleted. Click OK to continue.`
   };
   dispatch(openConfirmModal(payload));
};

const confirmUpdateCombo = () => {
   let item = selectedMain;
   if(!item) return;
   const payload = {
     action: callUpdateCombo,
     content: `This will ensure that all ingredients of the combo <b>${item.name} (${item.id})</b> will be friends. Click OK to continue.`
   };
   dispatch(openConfirmModal(payload));
};

const confirmMerge = () => {
   if (!selectedMain) return;
   if (!selectedFriend) return;

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


    const payload = {
      title:"IMPORTANT! CHECK CAREFULLY!",
      content: msg,
      action: callMerge(keepItem.id, loseItem.id)
    };
    dispatch(openConfirmModal(payload));
};

const editItemName = (e) => {
  setInputText(e.target.value);
};

const filterDirty = () => {
  filterRef.current.style.backgroundColor = colors.lightpink;
}

function handleKeyDown (e) {
  let elem;
  let next;
  e.stopPropagation();
  switch(e.keyCode) {
  case 13:
    elem = e.srcElement.id;
    next = nextElem[elem];

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



const EditBtn = () => {
  return (
     <button 
          type="button"
          className="btn btn-sm editItemBtn"
          id="editItemBtn"
          onClick={changeEditMode}
          tabIndex="-1"
      >
         <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"> 
            <path d="M 16.9375 1.0625 L 3.875 14.125 L 1.0742188 22.925781 L 9.875 20.125 L 22.9375 7.0625 C 22.9375 7.0625 22.8375 4.9615 20.9375 3.0625 C 19.0375 1.1625 16.9375 1.0625 16.9375 1.0625 z M 17.3125 2.6875 C 18.3845 2.8915 19.237984 3.3456094 19.896484 4.0214844 C 20.554984 4.6973594 21.0185 5.595 21.3125 6.6875 L 19.5 8.5 L 15.5 4.5 L 16.9375 3.0625 L 17.3125 2.6875 z M 4.9785156 15.126953 C 4.990338 15.129931 6.1809555 15.430955 7.375 16.625 C 8.675 17.825 8.875 18.925781 8.875 18.925781 L 8.9179688 18.976562 L 5.3691406 20.119141 L 3.8730469 18.623047 L 4.9785156 15.126953 z"/>
         </svg>
    </button>
  )
};

// const handleEditItem = async(e) => {
//   console.log('got here vals:', catId, mainId, inputText);
//   const currentMainId = mainId;
//   if (!mainId) return;

//    //do some validation?
//     try {
//       console.log('editing: ', mainId);
//       let res = await APICalls.updateItem(mainId, inputText, catId);
//       if (res) {
//         let payload =  {content: "Item updated"};
//         dispatch(showSuccessModal(payload));
//         dispatch(getItems());
//         setMainId(currentMainId);
//         setEditMode(false);
//       }
//     } catch(err) {
//       console.error(err.message);
//     }
// };




const mainOrEdit = (e) => {
  if (editMode) {
    return (
   <div className="w-100 edit-name d-flex-column justify-content-start">
      <label className="control-label" htmlFor="item-edit">Edit Item Name: {selectedMain.id}</label>
      <textarea 
          type="text" 
          className="form-control" 
          id="item-edit" 
          value={inputText}
          onChange={editItemName}
      />
    </div>
    )
  } else {
    return (
        <div className="w-100 input-group d-flex">
        <ItemCombobox
            id="mainselect"
            itemType="main"
            thisRef={mainRef}
            autofocus={true}
            onNoMatch={openNewMain}
         />
        </div>
    )
  }
};

return (

<div className="editorpage">
   <div className="pairings-container ">

    {/* Checkbox Row */}
    <div className="row checkbox-row w-100 d-flex align-items-end"  >
        <button tabIndex="-1" ref={filterRef} tabIndex="-1" type="button" className="checkbox-go" onClick={changeFilter}>Set Filter</button>
        <div className="checkbox-group">
           <span className="w-100 checkbox-group-label">Click to exclude</span>

            <span className="checkboxes form-check" >
              <input tabIndex="-1" ref={dishesRef} className="checkbox" type="checkbox" onClick={filterDirty} id="chkDishes" value="11" />
              <label tabIndex="-1" className="" htmlFor="inlineCheckbox1">Dishes</label>
            </span>

          <span className="checkboxes form-check" >
            <input tabIndex="-1" ref={combosRef} className="checkbox" type="checkbox" onClick={filterDirty} id="chkCombos" value="12" />
            <label tabIndex="-1" className="form-check-label" htmlFor="inlineCheckbox2">Combos</label>
          </span>
        </div>
    </div>

    {/* Main Row */}
    <div className="main-row row w-100 d-flex justify-content-start ">
               <div className="col-md-6 gx-0 d-flex align-items-end">
                      {mainOrEdit()}
                      <EditBtn />
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

               <div className="btns-container col-md-2">
                    <button 
                        type="button"
                        className="btn btn-sm editItemBtn"
                        id="AddItembtn"
                        onClick={openNewMain}
                        tabIndex="-1"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm deletePairingBtn"
                        id="deleteItemBtn"
                        onClick={confirmDelete}
                        tabIndex="-1"
                        >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                     <button
                      type="button"
                      className="btn btn-sm updateComboBtn"
                      id="updateComboBtn"
                      onClick={confirmUpdateCombo}
                      tabIndex="-1"
                      >
                        <i className="fab fa-connectdevelop"></i>
                     </button>
                      <button
                        type="button"
                        className="btn btn-sm mergeBtn"
                        id="mergeBtn"
                        onClick={confirmMerge}
                        tabIndex="-1"
                        >
                         <i className="fas fa-compress-alt"></i>
                    </button>
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
                    autofocus={false}
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
</div> 


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

</div>
  );
}


function mapStoreToProps(store) {
  console.log('editor:', store.editor)
  return store.editor;
} 


export default connect(mapStoreToProps)(Editor);

