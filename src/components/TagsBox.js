import React, {useState, useEffect} from 'react';
import '../styles/tags.css';

const TagsBox = ({selectedItems, onSelect, onRemove, thisRef}) => {
   const [thisArray, setThisArray] = useState([]);

  useEffect(() => {
    console.log('selected Items passed:', selectedItems);
       if (thisArray.length === selectedItems.length) {
        //do nothing
       } else {
         setThisArray(oldarr => selectedItems);
         document.getElementById("tags-container").focus();
       }
  }, [selectedItems, thisArray.length]);

  const handleRemove = (e) => {
    e.stopPropagation();
    let id = parseInt(e.target.attributes["data-id"].value);
    const remainingArray = thisArray.filter(it => {
      return parseInt(it.id) !== id;
    })
   // console.log('remianingarray:', remainingArray);
    setThisArray(oldArray => remainingArray);
    onRemove(remainingArray);
  };

  return (

        <div className="tags-container"
              ref={thisRef}
              id="tags-container"
        >
          {thisArray && (thisArray.length > 0) && thisArray.map(it => {
            return (
              <span 
                 className="tag"
                 key={it.id}
                 id={it.id}
                 role="button"
                 data-id={it.id}
                 data-name={it.name}
                 onClick={handleRemove}

              >
                  {it.name}
              </span>
             )
           })}
        </div> 


  );

};



export default TagsBox;