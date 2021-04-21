import React, {Fragment, useEffect} from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import '../styles/autocomplete.css';




const Autocomplete = ({data, selectedArray, onSelect, onRemove, thisRef}) => {

  useEffect(()=> {
  }, []);


  const handleSelect = (selectedList, selectedItem) => {
    onSelect(selectedItem);
  };

  const handleRemove = (selectedList, selectedItem) => {
     onRemove(selectedList);
  };


    return (
      <Fragment>
       <Multiselect
         options={data}
         selectedValues={selectedArray}
         displayValue="name"
         placeholder="Type to search or click on flavors below"
         closeOnSelect={true}
         closeIcon="cancel"
         onSelect={handleSelect}
         onRemove={handleRemove}
         id="ac"
         ref={thisRef}
        />
      </Fragment>
    );
};

export default Autocomplete;