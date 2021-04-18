import React, { Fragment  } from 'react';



const ItemsList = ({data, selected, onSelect}) => {

  const selectItem = (e) => {
   const id = e.target.attributes["data-friend-id"].value;
   const name = e.target.attributes["data-label"].value;
   onSelect({value: name, id: id});
  };

  const renderItems = (items) => {
    if (items) {
      return items.map(i => {
        return (
       
           <li className="friend" 
               onClick={selectItem} 
               key={i.friend_id}
               data-friend-id={i.friend_id}
               data-label={i.friend}
            >
               {i.friend}

          </li>
        
        )
     })
    }
  };




  const renderCats = () => {
     const keys = Object.keys(data);


     const result = keys.map((k, idx) => {
        return (
           <div className="row align-items-start catheader" key={idx}>
              {k}
              <ul className="friendslist">
                {renderItems(data[k])}
             </ul>
            </div>
        )
     });
    return result;
 };



   return (
    <Fragment>
      <div className="list-container">
          {renderCats()}
      </div>
    </Fragment>
)};

export default ItemsList;