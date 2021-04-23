import React, {Fragment, useState, useEffect, useRef} from 'react';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NewItem from '../components/newItem';
import ItemSelect from '../components/itemSelect';
import AffinitySelect from '../components/affinitySelect';
import "../styles/editor.css";
import APICalls from '../apiCalls';



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
    "-1": "enemy"
  };




function Editor() {
  const mainRef = useRef(null);
  const friendRef = useRef(null);
  const affinityRef = useRef(null);
  const [items, setItems] = useState([]);
  const [friends, setFriends] = useState([]);
  const [mainId, setMainId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [friendId, setFriendId] = useState(null);
  const [affinityId, setAffinityId] = useState(1);
  const [itemFormIsOpen, setItemFormIsOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");


  useEffect(() => {
    const fetchItems = async () => {
      const data = await APICalls.getAllItems();
      setItems(data);
    };
    fetchItems();
    mainRef.current.focus();
    setFieldName("main");
  }, []);  //on load only


  useEffect(() => {
  if (mainId) {
    const fetchFriends = async() => {
      const data = await APICalls.getFriends(mainId);
      setFriends(data);
    };
    fetchFriends();
  }
  }, [mainId]); //whever mainId changes refetch friends

const openFromBtn = () => {
  setInputText("");
  setItemFormIsOpen(true);
};

  const openNewItem = (newText) => {
   setInputText(newText);
   setItemFormIsOpen(true);
 };

 const closeNewItem = () => {
  if (fieldName === "main") {
    friendRef.current.focus();
  } else {
    document.getElementById("addpairingbtn").focus();
  }
   
   setItemFormIsOpen(false);
 };


  
  const handleMainChange = (val, name) => {
    console.log('got here', val, name);
    setMainId(val);  //triggers friends change
    setInputText(name);
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
     const data = await APICalls.getAllItems();
     setItems(data);

     if( fieldName === "main") {
       handleMainChange(addedItem.item_id, addedItem.item);
    } else {
       handleFriendChange(addedItem.item_id, addedItem.item);
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
  

  return (
<Fragment>
<div className="pairings-container">
           <div className="row align-items-start ">
             <div className="col-md-3" >
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
              </div>


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
        
              <div className="btns col-md-3 d-flex align-self-end justify-content-start align-items-bottom">
                <button 
                    type="button"
                    className="btn btn-sm btn-success"
                    id="addpairingbtn"
                    onClick={handleAddPairing}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" style={styles.button} className="bi bi-arrow-down" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                   </svg>
                </button>
                <button 
                    type="button"
                    className="btn btn-sm editItemBtn"
                    id="editItembtn"
                    onClick={openFromBtn}
                >
                   <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"> 
                      <path d="M 16.9375 1.0625 L 3.875 14.125 L 1.0742188 22.925781 L 9.875 20.125 L 22.9375 7.0625 C 22.9375 7.0625 22.8375 4.9615 20.9375 3.0625 C 19.0375 1.1625 16.9375 1.0625 16.9375 1.0625 z M 17.3125 2.6875 C 18.3845 2.8915 19.237984 3.3456094 19.896484 4.0214844 C 20.554984 4.6973594 21.0185 5.595 21.3125 6.6875 L 19.5 8.5 L 15.5 4.5 L 16.9375 3.0625 L 17.3125 2.6875 z M 4.9785156 15.126953 C 4.990338 15.129931 6.1809555 15.430955 7.375 16.625 C 8.675 17.825 8.875 18.925781 8.875 18.925781 L 8.9179688 18.976562 L 5.3691406 20.119141 L 3.8730469 18.623047 L 4.9785156 15.126953 z"/>
                   </svg>
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
  isOpen={itemFormIsOpen}
/> 
     </Fragment>
  );
}

export default Editor;