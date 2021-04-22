import React, {Fragment, useState, useEffect, useRef} from 'react';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NewItem from '../components/newItem';
import ItemSelect from '../components/itemSelect';
import AffinitySelect from '../components/affinitySelect';
import "../styles/friends.css";
import APICalls from '../apiCalls';
import editIcon from '../images/edit_pencil.svg';


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




function EnterPairing() {
  const mainRef = useRef(null);
  const friendRef = useRef(null);
  const affinityRef = useRef(null);

  const [items, setItems] = useState([]);
  const [friends, setFriends] = useState([]);
  const [API, setAPI] = useState("");
  const [mainId, setMainId] = useState();
  const [inputText, setInputText] = useState("");
  const [friendId, setFriendId] = useState();
  const [affinityId, setAffinityId] = useState(1);
  const [itemFormIsOpen, setItemFormIsOpen] = useState(true);
  const [fieldName, setFieldName] = useState("");


//side effects - in order
  useEffect(() => {
    const fetchAPI = async () => {
      let api = await APICalls.API;
      setAPI(api);
    };
    fetchAPI();
   }, []); //on load only


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
    setMainId(val);  //triggers friends change
    setInputText(name);
    setFieldName("main");
  };

  const handleFriendChange = async(val, name) => {
    await setFriendId(val);
    await setInputText(name);
    //is this an edit? if so pop in affinity level too
    if (friends) {
      const result = friends.find(f => {
        return f.friend_id === friendId });
        if (result) {
          setAffinityId(result.affinity_level);
        }
    } else {
      setAffinityId(1); //defalt
    }

    if (fieldName === "main") {
      friendRef.current.focus();
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
      const body = {item1_id: mainId, item2_id: friendId, level: affinityId};
       // console.log(body);
        await fetch(API + "/pairing/new", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });

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
  

  return (
<Fragment>


  <div className="pairings-container">
           <div className="row align-items-start ">
             <div className="col-md-4" >
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


             <div className="col-md-4" >
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
        
              <div className="btn-row d-flex justify-content-between align-items-middle">
                <span className="control-label">Existing Friends</span>
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
                    onClick={openNewItem}
                >
                    <img  className="editsvg" src={editIcon} alt="Edit Item" width="32" height="32"   />
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

export default EnterPairing;