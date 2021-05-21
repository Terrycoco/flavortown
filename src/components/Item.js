import React, {useState, useEffect} from 'react';
import '../styles/friends.css';
import ItemCard from './ItemCard';


const Item = ({item, onOpen, onSelect, openParents, showParent}) => {
  const [i, setI] = useState({});
  const [cl, setCl] = useState("");


  useEffect(() => {
    setI(item);
  }, []);

  useEffect(() => {
    if (openParents.includes(i.parent_id)) {
      setCl("active");
    } else {
      setCl("");
    }
  }, [openParents]);


  const openMe = (e) => {
    e.target.classList.toggle("caret-down");
    onOpen(item.parent_id);
  }

  const selectMe = (e) => {
    onSelect(e);
  }


const renderItem = () => {
   //console.log('showParent: ', showParent);

  //always show parent in sauces
    if (i.cat_id === 13 && i.desc) {
      return <ItemCard item={item} onSelect={selectMe} />

      //never show children in sauces or combos
    } else if ((i.cat_id === 13 || i.cat_id === 12) && i.is_child) {
      return null;

      //regular item
    } else if (!i.is_parent && !i.is_child) {
      return <div className="listitem" 
                   key={i.id} 
                   data-id={i.id}
                   data-name={i.name}
                   onClick={selectMe}>{i.name}</div>

  //child - not hidden alwasys show
    } else if (i.is_child && !i.hide_children) {
      return <div className={"listitem nested active"}
                  key={i.id} 
                  data-parent-id={i.parent_id}
                  data-id={i.id}
                  data-name={i.name}
                  onClick={selectMe}>{i.name}</div>

      
    } //

  if (showParent) {
     //parent with children
    if (i.is_parent && i.hide_children) {
      return <div className="listitem parent caret" 
                  onClick={openMe} 
                  key={i.id} 
                  data-id={i.id}>{i.parent}</div>

     //parent don't hide children
    } else if (i.is_parent && !i.hide_children) {
      return <div className="listitem parent" 
                  key={i.id}
                  data-parent-id={i.parent_id}>{i.parent}</div>

    //child show children show parent
    } else if (i.is_child && i.hide_children) {
      return <div className={`listitem nested ${cl}`}
                  key={i.id} 
                  data-parent-id={i.parent_id}
                  data-id={i.id}
                  data-name={i.name}
                  onClick={selectMe}>{i.name}</div>
    }

     //child -- if parent isn't showing always show child
    } else if (!showParent) {
        if (i.is_child) {
        return <div className={`listitem nested active`}
                    key={i.id} 
                    data-parent-id={i.parent_id}
                    data-id={i.id}
                    data-name={i.name}
                    onClick={selectMe}>{(i.name === 'a') ? i.parent : i.name}</div>
      }
   }
};


return (
  <>
  {renderItem()}
  </>
);



};



export default Item;