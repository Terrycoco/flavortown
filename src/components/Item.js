import React, {useState, useEffect} from 'react';
import '../styles/friends.css';



const Item = ({item, onOpen, onSelect, openParents}) => {
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
    onOpen(item.parent_id);
  }

  const selectMe = (e) => {
    onSelect(e);
  }


const renderItem = () => {
  if (i.is_parent && i.hide_children) {
      return <div className="listitem parent caret" 
                  onClick={openMe} 
                  key={i.id} 
                  data-id={i.id}>{i.parent}</div>

    } else if (item.is_parent && !i.hide_children) {
      return <div className="listitem parent" 
                  key={i.id}
                  data-parent-id={i.parent_id}>{i.parent}</div>

    } else if (i.is_child && i.hide_children) {
      return <div className={`listitem nested ${cl}`}
                  key={i.id} 
                  data-parent-id={i.parent_id}
                  data-id={i.id}
                  data-name={i.name}
                  onClick={selectMe}>{i.name}</div>

    } else if (i.is_child && i.hide_children === 0) {
      return <div className={"listitem nested active"}
                  key={i.id} 
                  data-parent-id={i.parent_id}
                  data-id={i.id}
                  data-name={i.name}
                  onClick={selectMe}>{i.name}</div>

    } else {
      return <div className="listitem" 
                   key={i.id} 
                   data-id={i.id}
                   data-name={i.name}
                   onClick={selectMe}>{i.name}</div>
    }
};


return (
  <>
  {renderItem()}
  </>
);



};



export default Item;