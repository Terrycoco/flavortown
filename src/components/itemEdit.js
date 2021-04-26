import React, {useState, useRef, useEffect} from 'react';
import ItemSelect from '../components/itemSelect';





const ItemEdit = ({isOpen, items, defaultItemId, thisRef, onClose}) => {
    const [itemId, setItemId] = useState();
    const [catId, setCatId] = useState();
    const [parentId, setParentId] = useState();
    const mainRef = useRef();


    useEffect(() => {
      if (defaultItemId && defaultItemId > 0) {
        setItemId(defaultItemId)
      }
    }, [defaultItemId]);

    const handleClickItem = (e) => {

    };

    const handleItemChange = (val, name) => {
      console.log('got here', val, name);
      setItemId(val);
      setCatId(items[val])
    };

    const closeMe = () => onClose();

    const onNoMatch = () => {};
    const onMatch = () => {};


  if (!isOpen) {
    return false;
  }
  return (
      <div className="editItemForm d-flex flex-column justify-content-between">
          <ItemSelect
                thisRef={thisRef}
                onClick={handleClickItem}
                data={items} 
                value={itemId}
                onChange={handleItemChange}
                label="Item"
                onNoMatch={onNoMatch}
                onMatch={onMatch}
           />
          <div className="button-group justify-self-end d-flex justify-content-around">
            <button 
               className="btn btn-secondary btn-sm"
               onClick={closeMe}
             >Close</button>
            <button 
               className="btn btn-primary btn-sm"
             >Save Edit</button>
          </div>

      </div>


 
  );

};



export default ItemEdit;