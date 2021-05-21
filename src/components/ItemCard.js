import React, {useState}  from 'react';


const ItemCard  = ({item, onSelect}) => {
   const [isOpen, setIsOpen] = useState(false);

const openMe = (e) => {
  e.target.classList.toggle("caret-down");
  setIsOpen(!isOpen);
}

const selectMe = (e) => {
  onSelect(e);
}
 
return (
 <div className="w-100">
  <div className="w-100"
       key={item.id} 
       data-id={item.id}>
    <a className="w-100 listitem parent caret" 
       onClick={openMe}
       data-bs-toggle="collapse" 
       href={`#card-${item.id}`}
       role="button" 
       aria-expanded="false" 
       aria-controls={`card-${item.id}`}>
        {item.name}
     </a>
  </div>
  <div class="collapse" id={`card-${item.id}`}>
  <div class="card card-body">
   {item.desc}
    <div className="d-flex justify-content-end">
      <button className="btn btn-sm card-btn "
              onClick={selectMe}
              data-id={item.id}
              data-name={item.name}
      >Select</button>
    </div>
  </div>
</div>
 
  </div>

  );

};



export default ItemCard;