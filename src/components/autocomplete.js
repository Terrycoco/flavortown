import React, {useEffect} from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import '../styles/autocomplete.css';




const Autocomplete = ({data, loading, selectedArray, onSelect, onRemove, thisRef}) => {

  useEffect(()=> {
  }, []);


  const handleSelect = (selectedList, selectedItem) => {
    onSelect(selectedItem);
  };

  const handleRemove = (selectedList, selectedItem) => {
     document.activeElement.blur();
     onRemove(selectedList);
  };


    return (
      <div className="autocomplete">

       <Multiselect
         options={data}
         selectedValues={selectedArray}
         displayValue="name"
         hidePlaceholder={true}
         placeholder="Add a flavor to your dish"
         closeOnSelect={true}
         closeIcon="cancel"
         onSelect={handleSelect}
         onRemove={handleRemove}
         id="ac"
         ref={thisRef}
        />
      </div>
    );
};

export default Autocomplete;