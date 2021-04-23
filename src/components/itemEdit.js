import React, {Fragment, useState, useRef, useEffect} from 'react';
import ItemSelect from '../components/itemSelect';





const ItemEdit = ({items, defaultItemId}) => {
    const [itemId, setItemId] = useState(null);
    const [catId, setCatId] = useState(null);
    const [parentId, setParentId] = useState(null);
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

    const openNewItem = () => {

    }

    const closeNewItem = () => {

    }

  return (
     <Fragment>
      <form >
          <ItemSelect
              onClick={handleClickItem}
              thisRef={mainRef} 
              data={items}
              value={itemId}
              onChange={handleItemChange}
              label="Item"
              onNoMatch={openNewItem}
              onMatch={closeNewItem}
               />
          
      </form>


     </Fragment>
  );

};



export default ItemEdit;