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



const ItemCombobox = ({dispatch, id, items, itemType,  thisRef, selectedMain, selectedFriend, autofocus, onNoMatch, text, timestamp}) => {
  const [term, setTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [ts, setTs] = useState(0);
  const [data, setData] = useState([]);
  const listRef = useRef();
  const results = useItemMatch(term);


   useEffect(() => {
    console.log('rendering initial again');
    if (autofocus) {
      thisRef.current.focus();
    }
  }, []);

   useEffect(() => {
     if (timestamp > ts) {
       setData(items);
       setTs(timestamp);
     }
   },[timestamp])

  useEffect(() => {
    if (itemType === "main") {
      console.log('main changed');
      setSelectedItem(selectedMain);
      setTerm("");
    }
  },[ selectedMain.id]);

  
  useEffect(() => {
    if (itemType === "friend") {
      setSelectedItem(selectedFriend);
      setTerm("");
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
     : matchSorter(data, term, {
        keys: ['name'], //can also use alias!
        threshold: matchSorter.rankings.WORD_STARTS_WITH //or WORD_STARTS_WITH?
     }),
     [throttledTerm]
    );
  }


  const handleChange = (e) => {
    setTerm(e.target.value);
  }

 

  const handleKeyDown = (e) => {
   let elem;
   switch (e.keyCode) {
     case 13:
      //there's a dropdown (something matches)
      if (listRef.current) {
         //and it's at least one value
         if (listRef.current.children.length) {

             //there's one selected (tabbed into)
             elem = listRef.current.querySelector("li[aria-selected=true]");
            if (!elem) {
              //just pressed enter take first one
              elem = listRef.current.firstChild;
            }
         console.log(elem);
         let item = JSON.parse(elem.getAttribute('data-item'));
         dispatch(selectItem(item, itemType));

          //clear input box because will be in placeholder now
          setTerm("");



         //not one selected
         } else {
          console.log('got here')
         }

      //there's no dropdown
      } else { 
        //if the current value <> selectedItem val
        if (term.length && term !== selectedItem.name) {
             onNoMatch(term);
        } else {
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
           id={id}
           ref={thisRef}
           className="form-select"
           onChange={handleChange}
           onKeyDown={handleKeyDown}
           selectOnClick={true}
           placeholder={selectedItem.name}
           value={term}
        />
        {results && (
        <ComboboxPopover className="shadow-popup">
          {results.length > 0 ? (
          <ComboboxList 
              ref={listRef}
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
    selectedFriend: store.editor.selectedFriend,
    timestamp: store.editor.timestamp
  };
};

export default connect(mapStoreToProps)(ItemCombobox);