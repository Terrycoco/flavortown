import React, {Fragment} from 'react';




const ItemCard  = ({item}) => {
 
return (
<div class="card" key={item.parent_id}>
  <h5 class="card-title">{item.parent}</h5>
  <div class="card-body">
    Something interesting about this recipe
  </div>
</div>
  );

};



export default ItemCard;