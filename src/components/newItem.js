import React, {Fragment, useEffect, useState} from 'react';
import config from '../config';

const API = config.API;

const styles = {
  form: {
    border: "2px",
    position: "absolute",
    bottom: "0",
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 10,
    backgroundColor: "lightblue",
    padding: "3px"
  }
};

const NewItem = ({text, onAdd, onClose}) => {
  const [cats, setCats] = useState([]);
  const [newText, setNewText] = useState("");
  const [catId, setCatId] = useState(1);

  const getData = async () => {
    try {
      const response = await fetch(API.concat("/cats"));
      const jsonData = await response.json();

      setCats(jsonData);

    } catch(err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();  //initialize cats
  }, []);

  useEffect(() => {
    setNewText(text);
  }, [text]);


  const onSubmitForm = async(e) => {
      e.preventDefault();
      try {
        const body = {item: newText, cat_id: catId};
       // console.log(body);
        const response = await fetch(API.concat("/items/new"), {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        console.log('response: ', jsonData); //returned id?

         onAdd(jsonData);
       // onClose();

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
  setCatId(e.target.value);
}

const handleOnClose = () => {
  onClose();
}


  return (
<Fragment >
<form id="newItemForm" style={styles.form} onSubmit={onSubmitForm} className="container-fluid">
  <div className="d-flex flex-column">
    <h4>Enter New Item</h4>
    <label className="control-label" htmlFor="inputBox">New Item</label>
    <input 
        type="text" 
        className="form-control" 
        id="inputBox" 
        placeholder="Enter New Item" 
        value={newText}
        onChange={enterInput}
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
         <button type="close" onClick={handleOnClose} className="btn btn-secondary">Close</button>           
         <button type="submit" className="btn btn-success" default>Add</button>
         
       </div>
  </form>
</Fragment>
  );
}

export default NewItem;