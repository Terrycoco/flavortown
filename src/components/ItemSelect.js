import React, {useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import '../styles/itemSelect.css';
import { selectItem } from '../actions/editorActions';

//note:  add new item code is inside newItem form.

const ItemSelect = ({itemType, dispatch, items, selectedMain, selectedFriend, thisRef, onNoMatch, onSelect}) => {
  const [newText, setNewText] = useState("");

  // useEffect(() => {
  //   if (itemType === "main" && !isEmpty(selectedMain)) {
  //    console.log('selectedMainis:', selectedMain);
  //   // setSelected([selectedMain]);
  //   }
  // },[selectedMain, itemType]);

  // useEffect(() => {
  //   if (itemType === "friend" && !isEmpty(selectedFriend)) {
  //    console.log('selectedFriendis:', selectedFriend);
  // //   setSelected([selectedFriend]);
  //   }
  // },[selectedFriend, itemType]);


  // const onKeyDown = useCallback(
  //   (e) => {
  //    console.log('onkeydown:', e.keyCode, activeIndex)
  //     //tab or enter select first in list
  //     if ((e.keyCode === 13 || e.keyCode === 9) && activeIndex === -1) {
  //     //  console.log('submit', e);
  //       let elem = document.getElementById(`item-select-${itemType}-item-0`);
  //       console.log('first child:', elem);
  //       if (elem) {
  //         elem.click();
  //         //setActiveIndex(0);
  //         onSelect();

  //         //not in list
  //       } else {
  //         let input = e.nativeEvent.target.value;
  //         onNoMatch(input);
  //       }

  //      //escape clear what's there
  //     } else {
  //       if (e.keyCode === 27) {
  //         //setSelected([]);
  //         //TODO: reset selectedItem in store?
  //       } else if (e.keyCode === 13) {
  //       }
  //     }
  //   }, [activeIndex, onSelect, onNoMatch, itemType]
  // );

   
  const enterField = () => {
  };

  const onChange = (e ) => {
    console.log(thisRef.current.value);
    const idx = parseInt(thisRef.current.value);
    let item = items[idx];

    console.log('selected: ', item);

    dispatch(selectItem(item, itemType));
   }
 


 const renderOptions = () => {
   return items && items.map(function(i,idx) {
    return (
      <option 
         key={idx} 
         value={idx}
         data-name={i.name}
         data-cat-id={i.cat_id}
         >
         {i.name + '  (' + i.id + ')'}
      </option>
      )
    });
 };


  return (
    <div className="w-100">
         <label className="control-label" htmlFor={"item-select-" + itemType}>Item</label>
         <select 
          className="rbt-input-main form-control rbt-input form-control-sm" 
          ref={thisRef}
          id="selectedItem" 
          onChange={onChange}
          required
          value={selectedMain.id}
          tabIndex="-1"
        >
         {renderOptions()}
        </select>
  </div>
  );

};
function mapStoreToProps (store) {
  console.log(store.editor);
 return {
  items: store.editor.items,
  selectedMain: store.editor.selectedMain,
  selectedFriend: store.editor.selectedFriend
}}

export default connect(mapStoreToProps)(ItemSelect);