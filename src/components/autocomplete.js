import React, { Fragment, useState, useEffect } from 'react';


const Autocomplete = ({id, text, setValueFunc}) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedText, setSelectedText] = useState("");
  const inputId = `input-${id}`;
  const btnId = `btn-${id}`;

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();

      setItems(jsonData);
      setFilteredItems(jsonData);

    } catch(err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();  //initialize data
  }, []);




const styles = {
    container: {
      position: "relative",
      padding: 0,
      width: "100%"
    },

    input: {
      position: "absolute",
      top: 0,
      left: "3px",
      paddingLeft: "1em",
      width: "85%",
      backgroundColor: "transparent",
      color: "black",
      zIndex: 7
    },

    list: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: "3px",
      paddingLeft: "1em",
      zIndex: 1
    },

    listitem: {
      width: "100%",
      position: "absolute",
      top: "3px",
      left: "18px",
      zIndex: 2,
      borderColor: "white",
      color: "darkgray",
      listStyleType: "none",
      textAlign: "left",
    },


};

function filterList(inputText)  {
  // console.log('text to test:', inputText);
  // console.log('current State:', filteredItems.length);
  let filtered = items.filter(function(it) {
    return it.item.toLowerCase().startsWith(inputText);
  });
  return filtered;
};


const handleInputChange = (e) => {
  setSelectedText(e.target.value);
  setFilteredItems(filterList(e.target.value.toLowerCase()));
};

const handleKeyDown = (e) => {
   if (e.key === "Tab") {
      e.preventDefault();
      //just auto fill what's in filtered box
      if (filteredItems[0]) {
        setSelectedText(filteredItems[0].item);
        setSelectedId(filteredItems[0].item_id);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      //open modal if not there
      if (filteredItems[0] === undefined) {
        //open modal
        console.log('new item detected!' & document.getElementById(inputId).value);
        setValueFunc(document.getElementById(inputId).value);
        document.getElementById(btnId).click();
      }
    }
};


const renderItems = () => {
  if (filteredItems.length > 0) {
    return (
    <li
      style={styles.listitem}
      id={filteredItems[0].item_id}
      key={filteredItems[0].item_id}
    >

      {filteredItems[0].item}

    </li>
   )
  }
  return true
};

              // 
return (
    <Fragment>
      <label htmlFor={inputId} className="control-label">{`${id} id: ${selectedId} ${selectedText}`}</label>
      <div id={`autocomplete${id}`} style={styles.container}>
            <input
               id={inputId}
               style={styles.input}
               type="text"
               value={selectedText}
               onChange={handleInputChange}
               onKeyDown={handleKeyDown}
             />
         <ul
           style={styles.list}
         >
         {renderItems()}
         </ul>
      </div>


  </Fragment>
  );
}

export default Autocomplete;