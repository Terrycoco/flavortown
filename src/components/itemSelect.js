import React, { useState, useEffect} from 'react';
import Select from 'react-select';
import '../styles/itemSelect.css';

const ItemSelect = ({thisRef, 
                     data, 
                     value, 
                     onChange, 
                     onNoMatch, 
                     onMatch, 
                     onClick, 
                     label,
                     sideBtn}) => {
  
  const [items, setItems] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [item, setItem] = useState({});


  useEffect(() => {
    if (data) {
    setItems(data);
  }
  }, [data]);

  //try to update value when it changes?
  useEffect(() => {
    console.log('data is:', data, 'mainid:', value);
    setItems(data);
    setInputValue(value);
    if (data && value > 0) {
       const findObj = data.find(it => it.id === value);
       setItem(findObj);
    }
  }, [value, data]);

  function handleChange(it) {
    if (it) {
     let id = parseInt(it.id);
     let catId = parseInt(it.cat_id);
     setItem(it);
     onChange(id, it.name, catId);
     onMatch(id, it.name, catId);
   }
  }


  function filterOption(option, inputText)  {
    setInputValue(inputText);
    if (option.label.toLowerCase().startsWith(inputText.toLowerCase())) {
        setNoMatch(false);
        return option.label.toLowerCase().startsWith(inputText.toLowerCase());
    } else {
      setNoMatch(true);
      setInputValue(inputText);
    }
  }

  const handleSubmit = (e) => {
   e.preventDefault();
    if (noMatch === true) {
      onNoMatch(inputValue); //opens form
    } else {
      onMatch();
    }

  };

//takes 100% of parent's width
  return (
    <span className="item-select w-100 d-flex">
    <form onSubmit={handleSubmit} className="w-100">
      <div className="w-100 input-group d-flex">
         <label htmlFor="itemSelect" className="control-label">{label}: {item.id}</label>
         <Select
             ref={thisRef}
             value={item}
             options={items}
             filterOption={filterOption}
             getOptionLabel={(option)=>option.name}
             getOptionValue={(option)=>option.id}
             onChange={it => handleChange(it)}
             onFocus={onClick}
             className="item-select-dropdown"
             classNamePrefix="item-select"
          />
         {sideBtn}
        </div>
      </form>
    </span>
  );

   
}

export default ItemSelect;