import React, {Fragment, useState, useEffect, useRef} from 'react';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NewItem from '../components/newItem';
import ItemSelect from '../components/itemSelect';
import AffinitySelect from '../components/affinitySelect';
import "./pairings.css";
// import useKeyPress from '../useKeyPress';

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




function EnterPairing() {
  const mainRef = useRef(null);
  const friendRef = useRef(null);
  const [items, setItems] = useState([]);
  const [mainId, setMainId] = useState();
  const [item, setItem] = useState("");
  const [friendId, setFriendId] = useState();
  const [affinityId, setAffinityId] = useState(1);
  const [friends, setFriends] = useState([]);
  const [fieldName, setFieldName] = useState("");


//load lists of items
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();

      setItems(jsonData);

    } catch(err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
    closeNewItem();
  }, []); 

  const openNewItem = (newText) => {
   setItem(newText);
   document.getElementById("newItemForm").style.display = "block";
 };

 const closeNewItem = () => {
   document.getElementById("addpairingbtn").focus();
   document.getElementById("newItemForm").style.display = "none";
 }


  useEffect(() => {
  if (mainId) {
    getFriends(mainId);
  }
  }, [mainId]);


  
  const handleMainChange = (val, name) => {
    setMainId(val);
    setItem(name);
    getFriends(val); //latent 
  };

  const handleFriendChange = async(val, name) => {
    await setFriendId(val);
    await setItem(name);
    await handleAddPairing();
  };

  const handleAffinityChange = (val) => {
    setAffinityId(val);
  };

  const handleAddPairing = async () => {
    //do some validation
    try {
      const body = {item1_id: mainId, item2_id: friendId, level: affinityId};
       // console.log(body);
        await fetch("http://localhost:5000/pairing/new", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });

        getFriends(mainId); //update friends list
       //set focus back on friendId
       friendRef.current.focus();

      } catch(err) {
        console.error(err.message);
      }
  };

  const handleItemAdd = (addedItem) => {
     console.log('item added: ', addedItem);
     getData();
     setItem(addedItem.item);
     fieldName === "main" ? handleMainChange(addedItem.item_id, addedItem.item) : handleFriendChange(addedItem.item_id, addedItem.item);
     closeNewItem();
  };

  const getFriends = async(itemId) => {
     try {
      console.log('fetching friends of ', itemId);
      const response = await fetch("http://localhost:5000/friends/".concat(itemId));
      const jsonData = await response.json();
      setFriends(jsonData);
  

    } catch(err) {
      console.error(err.message);
    }
  };
  

  return (
    <Fragment>
    
        <div className="container">
 
           <div className="row align-items-start">
  
             

             <div className="col-sm-4" >
              <ItemSelect
                    onClick={()=>setFieldName("main")}
                    thisRef={mainRef} 
                    data={items}
                    value={mainId}
                    onChange={handleMainChange}
                    label="Main Item"
                    onNoMatch={openNewItem}
                    onMatch={closeNewItem}
          
               />
              </div>


              <div className="col-sm-3">
                <AffinitySelect 
                    value={affinityId}
                    onChange={handleAffinityChange}
                    label="Affinity Level"
                />
              </div>

             <div className="col-sm-4" >
              <ItemSelect
                    thisRef={friendRef}
                    onClick={()=>setFieldName("friend")}
                    data={items} 
                    value={friendId}
                    onChange={handleFriendChange}
                    label="Pairs With"
                    onNoMatch={openNewItem}
                    onMatch={handleFriendChange}
         
               />
              </div>
            <div className="btn-row d-flex align-items-start">
                  <button 
                      type="submit"
                      className="btn btn-success"
                      id="addpairingbtn"
                      onClick={handleAddPairing}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" style={styles.button} className="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg></button>
            
            </div>

      </div> 

      </div> 


      <div className="container">
          <div className="row align-items-start">
             <label htmlFor="friendslist" className="control-label">Existing Friends</label>
          </div>
          <div className="row align-items-start">
             <ul style={styles.friends} d="friendslist">
             {friends && friends.map(f => (
              <li key={f.friend_id}>{f.friend}</li>))}
             </ul>
         </div>
      </div>


      <div className="container">
        <NewItem 
          text={item} 
          onAdd={handleItemAdd} 
          onClose={closeNewItem}
        />
      </div>
 
   </Fragment>
  );
}

export default EnterPairing;