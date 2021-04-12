import React, {Fragment, useState, useEffect} from 'react';
import Select from 'react-select';
import './selectStyles.css';

const ItemSelect = ({thisRef,  data, value, onChange, onNoMatch, onMatch, label}) => {
  const [items, setItems] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [item, setItem] = useState({});


  useEffect(() => {
      setItems(data);
  }, [data]);

  //try to update value when it changes?
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleChange(it) {
    if (it) {
     setItem(it);
     onChange(it.item_id, it.item);
     onMatch(it.item_id, it.item);
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
    <label htmlFor="itemSelect" className="control-label">{label}: {item.value}</label>
     <Select
         ref={thisRef}
         value={items.find(it => {
           return it.item_id === value
          })}
         options={items}
         filterOption={filterOption}
         getOptionLabel={(option)=>option.item}
         getOptionValue={(option)=>option.item_id}
         onChange={it => handleChange(it)}
         className="react-select-container"
         classNamePrefix="react-select"
      />
      </div>
      </form>
    </Fragment>
  );

   
}

export default ItemSelect;