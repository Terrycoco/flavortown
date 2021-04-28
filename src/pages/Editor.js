import React, {Fragment, useState, useEffect, useRef} from 'react';
import 'reactjs-popup/dist/index.css';
import NewItem from '../components/newItem';
import ItemEdit from '../components/itemEdit';
import ItemSelect from '../components/itemSelect';
import AffinitySelect from '../components/affinitySelect';
import "../styles/editor.css";
import APICalls from '../apiCalls';
import SimpleModal from '../components/simpleModal';
import { Modal } from 'bootstrap'

const styles = {
  friends: {
    fontSize: "smaller",
    columnWidth: "100px"
  },
  button: {
    fontSize: "1em",
    color: "white", 
  }, 
  section: {
    marginTop: "5px",
  }
};



  const itemClasses = {
    "1": "friend",
    "2": "goodfriend",
    "3": "bestfriend",
    "4": "bff",
    "-1": "enemy",
    "5": "ingred"
  };




function Editor() {
  const mainRef = useRef();
  const friendRef = useRef();
  const affinityRef = useRef();
  const editItemRef = useRef();
  const modalRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const [friends, setFriends] = useState([]);
  const [mainId, setMainId] = useState();
  const [inputText, setInputText] = useState("");
  const [friendId, setFriendId] = useState();
  const [affinityId, setAffinityId] = useState(1);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [modal, setModal] = useState();
  const [catId, setCatId] = useState();
  const [cats, setCats] = useState([]);
  const [modalMessage, setModalMessage] = useState("Done!");
  const [modalOk, setModalOk] = useState(false);
  const [modalTitle, setModalTitle] = useState("Success!");
  
  const fetchItems = async () => {
      const data = await APICalls.getAllItems();
      setItems(data);
    };


  useEffect(() => {
    fetchItems();
    if (!editMode) mainRef.current.focus();
    setFieldName("main");
  }, []);  //on load only

  useEffect(() => {
    setModal(
      new Modal(modalRef.current)
    )
  }, []);

  useEffect(() => {
   const getCats = async() => {
     const data = await APICalls.getCats();
     setCats(data);
   };
   getCats();
  }, []);  //only on load


  useEffect(() => {
  if (mainId) {
    const fetchFriends = async() => {
      const data = await APICalls.getFriends(mainId);
      setFriends(data);
    };
    fetchFriends();
  }
  }, [mainId]); //whever mainId changes refetch friends

const openNewFromBtn = () => {
  setInputText("");
  setNewIsOpen(true);
};
const openNewItem = (newText) => {
   setInputText(newText);
   setNewIsOpen(true);
 };

const openEditFromBtn = () => {
  setEditIsOpen(!editIsOpen);
};

//EDIT ITEM
const changeEditMode = () => {
//dont open if there's no id selectd
  if (mainId) {
    setEditMode(!editMode);
    //console.log('curr vals: ', mainId, inputText, catId);
  }
};

const editItemName = (e) => {
  setInputText(e.target.value);
}

 const closeEditItem = () => {
  if (fieldName === "main") {
    friendRef.current.focus();
  } else {
    document.getElementById("addpairingbtn").focus();
  }
   
   setEditIsOpen(false);
 };


 const closeNewItem = () => {
  if (fieldName === "main") {
    friendRef.current.focus();
  } else {
    document.getElementById("addpairingbtn").focus();
  }
   
   setNewIsOpen(false);
 };

  const deletePairing = async() => {
    if (!mainId || !friendId) return;
     //do some validation?
      try {
          await APICalls.deletePairing(mainId, friendId);

          //refresh friends
          const data = await APICalls.getFriends(mainId);
          setFriends(data);
         
         //set focus back on friendId
          friendRef.current.focus();

        } catch(err) {
          console.error(err.message);
        }
  };
  
  const handleMainChange = (id, name, catId) => {
    setMainId(id);  //triggers friends change
    setInputText(name);
    setCatId(catId);
  };

  const handleFriendChange = async(val, name) => {
    if (!val) return;
    setFriendId(val);
    setInputText(name);
    //is this an edit? if so pop in affinity level too
    if (friends) {
      const result = friends.find(f => {
        return f.id === val });
        if (result) {
          setAffinityId(result.affinity_level);
        }
    } else {
      setAffinityId(1); //defalt
    }

    if (fieldName === "main") {
      friendRef.current.focus();
      setFieldName("friend");
    } else {
      document.getElementById("addpairingbtn").focus();
    }
  };

  const handleAffinityChange = (val) => {
    setAffinityId(val);
    document.getElementById("addpairingbtn").focus();
  };

  const handleAddPairing = async () => {
    //do some validation?
    try {
        await APICalls.addNewPairing(mainId, friendId, affinityId);

        //refresh friends
        const data = await APICalls.getFriends(mainId);
        setFriends(data);
       
       //set focus back on friendId
        friendRef.current.focus();

      } catch(err) {
        console.error(err.message);
      }
  };

  const handleItemAdd = async (addedItem) => {
      await fetchItems()

       if( fieldName === "main") {
         handleMainChange(mainId, inputText, catId);
      } else {
         handleFriendChange(friendId, inputText);
      }
     closeNewItem();
  };

  const confirmDelete = () => {
  //get ok
     setModalOk(true);
     setModalMessage(inputText + " and all its pairings will be deleted. Click OK to continue.");
     setModalTitle("Are you sure?");
     modal.show();
  };

  const handleItemDelete = async (addedItem) => {
      await APICalls.deleteItem(mainId)
      .then(() => {
        setModalMessage("Item deleted!");
        setModalOk(false);
        modal.show();
      })


      await fetchItems();

       if( fieldName === "main") {
         handleMainChange(addedItem.id, addedItem.name);
      } else {
         handleFriendChange(addedItem.id, addedItem.name);
      }
     closeNewItem();
  };

  const onClick = (field) => {
    setFieldName(field);
  };

  const selectFriend = (e) => {
    // setFriendId(Number(e.target.attributes["data-id"].value));
    // setAffinityId(Number(e.target.attributes["data-affinity"].value));
   setFriendId(e.id);
   setAffinityId(e.affinity_level);

  }
  
const updateCombo = async() => {
  if (!mainId) return;
   //do some validation?
    try {
      console.log('update started for: ', mainId);
        await APICalls.updateCombo(mainId);
        setModalMessage("All ingredients now relate to eachother");
        modal.show();

      } catch(err) {
        console.error(err.message);
      }
};

  
const EditBtn = () => {
  return (
     <button 
          type="button"
          className="btn btn-sm editItemBtn"
          id="editItemBtn"
          onClick={changeEditMode}
          tabIndex={-1}
      >
         <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"> 
            <path d="M 16.9375 1.0625 L 3.875 14.125 L 1.0742188 22.925781 L 9.875 20.125 L 22.9375 7.0625 C 22.9375 7.0625 22.8375 4.9615 20.9375 3.0625 C 19.0375 1.1625 16.9375 1.0625 16.9375 1.0625 z M 17.3125 2.6875 C 18.3845 2.8915 19.237984 3.3456094 19.896484 4.0214844 C 20.554984 4.6973594 21.0185 5.595 21.3125 6.6875 L 19.5 8.5 L 15.5 4.5 L 16.9375 3.0625 L 17.3125 2.6875 z M 4.9785156 15.126953 C 4.990338 15.129931 6.1809555 15.430955 7.375 16.625 C 8.675 17.825 8.875 18.925781 8.875 18.925781 L 8.9179688 18.976562 L 5.3691406 20.119141 L 3.8730469 18.623047 L 4.9785156 15.126953 z"/>
         </svg>
    </button>
  )
};

const changeCat = (e) => {
  console.log(e.target.value);
  setCatId(e.target.value);
  //document.getElementById("addItemBtn").focus();
}

const handleEditItem = async(e) => {
  console.log('got here vals:', catId, mainId, inputText);
  const currentMainId = mainId;
  if (!mainId) return;

   //do some validation?
    try {
      console.log('editing: ', mainId);
      let res = await APICalls.updateItem(mainId, inputText, catId);
      if (res) {
        setModalTitle("Success!");
        setModalMessage("Item updated");
        setModalOk(false);
        modal.show();
        //somehow requery item lists
        await fetchItems();
        setMainId(currentMainId);
        setEditMode(false);
      }
    } catch(err) {
      console.error(err.message);
    }
};

const mainOrEdit = (e) => {
  if (editMode) {
    return (
   <div className="w-100 edit-name d-flex-column justify-content-start">
      <label className="control-label" htmlFor="item-edit">Edit Item Name: {mainId}</label>
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
         <ItemSelect
            onClick={() => onClick("main")}
            thisRef={mainRef} 
            data={items}
            value={mainId}
            onChange={handleMainChange}
            label="Main Item"
            onNoMatch={openNewItem}
            onMatch={closeNewItem}
         />
    )
  }
};

  return (

<Fragment>

<div className="pairings-container ">

    <div className="main-row row w-100 d-flex justify-content-start ">

           <div className="col-md-6 gx-0 d-flex align-items-end">
                  {mainOrEdit()}
                  <EditBtn />
           </div>

           <div className="col-md-4 gx-0">
              <label className="control-label" htmlFor="selectcontrol">Main Category: {catId}</label>
              <select 
                className="form-control form-select" 
                id="selectcontrol" 
                onChange={changeCat}
                required
                value={catId}
              >
                {cats && cats.map(c => (
                  <option key={c.cat_id} value={c.cat_id}>{c.cat}</option>
                ))}
              </select>
           </div>

           <div className="btns-container col-md-2 d-flex justify-content-start align-items-end">
                <button 
                    type="button"
                    className="btn btn-sm btn-success"
                    id="addpairingbtn"
                    onClick={handleEditItem}
                >
                  <i className="fas fa-arrow-up"></i>
                </button>
                <button 
                    type="button"
                    className="btn btn-sm editItemBtn"
                    id="AddItembtn"
                    onClick={openNewFromBtn}
                    tabIndex={-1}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm deletePairingBtn"
                    id="deleteItemBtn"
                    onClick={confirmDelete}
                    tabIndex={-1}
                    >
                    <i className="fas fa-trash-alt"></i>
                </button>
                   <button
                    type="button"
                    className="btn btn-sm updateComboBtn"
                    id="updateComboBtn"
                    onClick={updateCombo}
                    tabIndex={-1}
                    >
                <i className="fab fa-connectdevelop"></i>
                </button>
            </div>

    </div>


    <div className="row gx-sm-0 gx-md-3 d-flex align-items-end">

             <div className="col-md-3" >
              <ItemSelect
                    thisRef={friendRef}
                    onClick={() => onClick("friend")}
                    data={items} 
                    value={friendId}
                    onChange={handleFriendChange}
                    label="Pairs With"
                    onNoMatch={openNewItem}
                    onMatch={handleFriendChange}
               />
            </div>

              <div className="col-md-3">
                <AffinitySelect 
                    thisRef={affinityRef}
                    value={affinityId}
                    onChange={handleAffinityChange}
                    label="Affinity Level"
                />
              </div>
        
              <div className="btns-container col-md-2 d-flex justify-content-start align-items-end">
                <button 
                    type="button"
                    className="btn btn-sm btn-success"
                    id="addpairingbtn"
                    onClick={handleAddPairing}
                >
                 <i className="fas fa-arrow-down"></i>
               </button>
                <button 
                    type="button"
                    className="btn btn-sm editItemBtn"
                    id="AddItembtn"
                    onClick={openNewFromBtn}
                    tabIndex={-1}
                >
                 <i className="fas fa-plus"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm deletePairingBtn"
                    id="deletePairingBtn"
                    onClick={deletePairing}
                    tabIndex={-1}
                    >
                    <i className="fas fa-trash-alt"></i>
                </button>
                   <button
                    type="button"
                    className="btn btn-sm updateComboBtn"
                    id="updateComboBtn"
                    onClick={updateCombo}
                    tabIndex={-1}
                    >
                <i className="fab fa-connectdevelop"></i>
                </button>
            </div>
  

        
  </div>
</div> 

<div className="friends-container mh-25">
             <div>
               <ul id="friendslist"  className="friends-group">
               {friends && friends.map(i => (
                <li 
                    onClick={() => selectFriend(i)} 
                    key={i.id}
                    data-id={i.id}
                    data-name={i.name}
                    data-affinity={i.affinity_level}
                    >
           
                    
                   <span 
                       className={itemClasses[i.affinity_level].concat(" listitem ")}
                       key={i.id}
                       data-id={i.id}
                       data-name={i.name}
                       data-affinity={i.affinity_level}
                       onClick={()=> selectFriend(i)}
                  >
                       {i.name}
                    </span>
                  </li> ))}
                  </ul>
                 
           </div>
        </div>


 <NewItem 
  text={inputText} 
  onAdd={handleItemAdd} 
  onClose={closeNewItem}
  isOpen={newIsOpen}
/> 
<ItemEdit 
  defaultItemId={mainId}
  data={items} 
  onClose={closeEditItem}
  thisRef={editItemRef}
  isOpen={editIsOpen}
/>
<SimpleModal
  title={modalTitle}
  thisRef={modalRef}
  modal={modal}
  okBtn={modalOk}
  onOk={handleItemDelete}
  >{modalMessage}
</SimpleModal>
 
</Fragment>
  );
}

export default Editor;