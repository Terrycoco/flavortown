import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import "../styles/itemNew.css";
import { addItem,
        selectItem,
        } from '../actions/editorActions';




const NewItem = ({dispatch, cats, text, onAdd, onClose, isOpen, itemType}) => {
  const [newText, setNewText] = useState("");
  const [catId, setCatId] = useState(3);

  useEffect(() => {
    console.log('text is:', text);
    setNewText(text);
  }, [text]);  //on load and whenever text (from calling form) changes


  const onSubmitForm = async(e) => {
      e.preventDefault();
      try {
         dispatch(addItem(newText, catId, itemType)) 
         //auto refreshes items
         //selects new item in store
         onClose(catId); //to update filter
      } catch(err) {
        console.error(err.message);
      }
  }

const enterInput = (e) => {
  //when user inputs for good
  console.log("Entered:" & e.target.value);
  setNewText(e.target.value);
}

const enterCat = (e) => {
  console.log(e.target.value);
  setCatId(parseInt(e.target.value));
}

const handleOnClose = () => {
  onClose();
}

if (isOpen) {
  return (
<Fragment >
<form id="newItemForm" 
      className="item-form" 
      onSubmit={onSubmitForm} 
>
  <div className="d-flex flex-column">
    <h4>Enter New Item</h4>
    <label className="control-label" htmlFor="inputBox">New Item</label>
    <textarea 
        type="text" 
        className="form-control" 
        id="item-entry" 
        placeholder="Enter New Item" 
        value={newText}
        onChange={enterInput}
        autoFocus={true}

      />

      <label className="control-label" htmlFor="selectcontrol">Main Category</label>
        <select 
          className="form-control form-select" 
          id="selectcontrol" 
          onChange={enterCat}
          required
          value={catId}
        >
          
          {cats && cats.map(c => (
            <option key={c.cat_id} value={c.cat_id}>{c.cat}</option>
          ))}
        </select>
                
    </div>
       <br />
       <br />
       <div className="d-grid gap-2 d-flex justify-content-md-start">  
         <button type="cancel" onClick={handleOnClose} className="btn btn-secondary">Close</button>           
         <button id="addItemBtn" type="submit" className="btn btn-success" default>Add</button>
         
       </div>
  </form>
</Fragment>
)
} else {
  return null
}

};

const mapStoreToProps = (store) => ({
  cats: store.editor.cats,
});



export default connect(mapStoreToProps)(NewItem);