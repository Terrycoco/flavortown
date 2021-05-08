import React, {useState, useEffect, useCallback} from 'react';
import { connect } from 'react-redux';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import '../styles/itemSelect.css';
import find from 'lodash.find';
import isEmpty from 'lodash.find';

const AffinitySelect = ({affinities, onChange, label, thisRef, onSelect, selectedFriend}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState([]);


  useEffect(() => {
    console.log('selectedFriend is:', selectedFriend);
    let optIndex = affinities.findIndex(e => e.affinity_level) === selectedFriend.affinity_level;
    console.log('opt:', optIndex);
    // if (opt && !isEmpty(opt)) {
      //setSelected([opt]);
      //console.log('selected:',selected);
    //}
  }, [selectedFriend, affinities]);


  const onKeyDown = useCallback(
    (e) => {
     console.log('onkeydown:', e.keyCode, activeIndex)
      //tab or enter select first in list
      if ((e.keyCode === 13 || e.keyCode === 9) && activeIndex === -1) {
      //  console.log('submit', e);
        let elem = document.getElementById('affinity-select-item-0');
       // console.log('thisref', thisRef);
        if (elem) {
          elem.click();
          let id = (thisRef.current.state.initialItem ? thisRef.current.state.initialItem.value : thisRef.current.state.selected[0].value)
          onSelect(id);
        }
      }
    }, [activeIndex, onSelect, thisRef]
  );

  return (
    <div className="w-100">
     <label htmlFor="AffinitySelect" className="control-label">{label}</label>

    </div>
  );
}

const mapStoreToProps = (store) => {
  return {
    affinities: store.editor.affinities,
    selectedFriend: store.editor.selectedFriend
  };
}

export default connect(mapStoreToProps)(AffinitySelect);