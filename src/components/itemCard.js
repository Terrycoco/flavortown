import React, {Fragment} from 'react';




const ItemCard  = ({item}) => {
 
return (
     <Fragment>
     <div key={item.id}>{item.name}</div>
     </Fragment>
  );

};



export default ItemCard;