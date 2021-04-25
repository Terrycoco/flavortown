import React, {Fragment, useState, useEffect} from 'react';
import Select from 'react-select';
import '../styles/selectStyles.css';

const ItemSelect = ({thisRef, data, value, onChange, onNoMatch, onMatch, onClick, label}) => {
  const [items, setItems] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [item, setItem] = useState({});


  useEffect(() => {
    setItems([...data]);
  }, [data]);

  //try to update value when it changes?
  useEffect(() => {
    setInputValue(value);
    if (items && value > 0) {
       const findObj = items.find(it => it.id === value);
       setItem(findObj);
    }
  }, [value, items]);

  function handleChange(it) {
    if (it) {
     setItem(it);
     onChange(it.id, it.name);
     onMatch(it.id, it.name);
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

  return (
    <Fragment>
    <form onSubmit={handleSubmit}>
    <div className="select-control-group">
    <label htmlFor="itemSelect" className="control-label">{label}: {item.id}</label>
     <Select
         ref={thisRef}
         value={items.find(it => {
           return it.id === value
          })}
         options={items}
         filterOption={filterOption}
         getOptionLabel={(option)=>option.name}
         getOptionValue={(option)=>option.id}
         onChange={it => handleChange(it)}
         onFocus={onClick}
         className="react-select-container"
         classNamePrefix="react-select"
      />
      </div>
      </form>
    </Fragment>
  );

   
}

export default ItemSelect;