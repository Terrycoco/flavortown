import React, {useState, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import {matchSorter} from 'match-sorter';
import { useThrottle } from 'react-use';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "../styles/itemSelect.css";
import { selectItem } from '../actions/editorActions';



const ItemCombobox = ({dispatch, id, items, itemType, onSelect, thisRef, selectedMain, selectedFriend, autofocus, onNoMatch, text}) => {
  const [term, setTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const listRef = useRef();
  const results = useItemMatch(term);


   useEffect(() => {
    console.log('rendering inital again');
    if (autofocus) {
      thisRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (itemType === "main") {
      setSelectedItem(selectedMain);
      setTerm("");
      thisRef.current.value = "";
      thisRef.current.placeholder = selectedMain.name;
    }
  },[ selectedMain.id]);

  
  useEffect(() => {
    if (itemType === "friend") {
      setSelectedItem(selectedFriend);
      setTerm("");
      thisRef.current.value = "";
      thisRef.current.placeholder = selectedFriend.name;
    }
  },[ selectedFriend.id]);

  function useItemMatch(term) {
    //pace this out
    const throttledTerm = useThrottle(term, 100);

    //memoize this function for efficiency
    return useMemo(

     //return function
     () =>

     //if no term do nothing
     !items || term.trim() === ""
     ? null

     //else match using matchSorter
     : matchSorter(items, term, {
        keys: ['name'], //can also use alias!
        threshold: matchSorter.rankings.WORD_STARTS_WITH //or WORD_STARTS_WITH?
     }),
     [throttledTerm]
    );
  }

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleFocus = (e) => {
   // console.log('focus fired');
    //e.target.select();
  };

  const handleKeyDown = (e) => {
   let elem;
   switch (e.keyCode) {
     case 13:
      //there's a dropdown (something matches)
      if (listRef.current) {
         //there's one selected (tabbed into)
         if (listRef.current.children.length) {
             elem = listRef.current.querySelector("li[aria-selected=true]");
            if (!elem) {
              //just pressed enter take first one
              elem = listRef.current.firstChild;
            }
          console.log(elem);
         let item = JSON.parse(elem.getAttribute('data-item'));
         dispatch(selectItem(item, itemType));
         listRef.current.value = item.name;
         onSelect();

         //not one selected
         } else {
          console.log('got here')
         }

      //there's no dropdown
      } else { 
        //if the current value <> selectedItem val
        if (term !== selectedItem.name) {
             onNoMatch(term);
        } else {
          onSelect(); //just move on nothing to see here
        }
      }
      break;
   //   case 27:
   //     setTerm(""); 
   //     e.target.value = "";
   //     break;
       }
  };

  const optionClick = (e) => {
    
  };

  return (
     <div className="w-100">
      <label className="control-label" >{`${itemType} Item ${selectedItem.id}`}</label>
      <Combobox aria-label="items">
        <ComboboxInput
           ref={thisRef}
           className="form-select"
           onChange={handleChange}
           onKeyDown={handleKeyDown}
           onFocus={handleFocus}
           selectOnClick={true}
           placeholder={selectedItem.name}
        />
        {results && (
        <ComboboxPopover className="shadow-popup">
          {results.length > 0 ? (
          <ComboboxList 
              ref={listRef}
              persistSelection={false}
          >
            {results.slice(0, 20).map((result, index) => (
                 <ComboboxOption
                    key={`${index}-${id}`}
                    value={result.name}
                    data-item={JSON.stringify(result)}
                    onClick={optionClick}
                    tabIndex={index}
                  />
              ))}
          </ComboboxList>
          ) : (
          <span style={{display: "block", margin: 8 }}>
             No results found
          </span>
          )}
        </ComboboxPopover>
        )}
      </Combobox>
     </div>
  );

};





const mapStoreToProps = (store) => {
  return {
    items: store.editor.items,
    selectedMain: store.editor.selectedMain,
    selectedFriend: store.editor.selectedFriend
  };
};

export default connect(mapStoreToProps)(ItemCombobox);