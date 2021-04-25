import React, { Fragment  } from 'react';
import "../styles/friends.css";


const ItemsList = ({data, selected, onSelect}) => {


   const selectItem = (e) => {
    // console.log(e.target);
     const id = e.target.attributes["data-id"].value;
     const name = e.target.attributes["data-name"].value;
     onSelect({name: name, id: id});
  };



  const renderItems = (items) => {
    if (items) {
      return items.map((i,idx) => {
        return (
          <li className="friend" 
               onClick={selectItem} 
               key={idx}
               data-id={i.id}
               data-name={i.name}
            >
           <span 
               className="listitem"
               key={`s{idx}`}
               data-id={i.id}
               data-name={i.name}>
               {i.name}
            </span>
          </li>     
        
        )
     })
    }
  };




  const renderCats = () => {

     const keys = Object.keys(data);


     const result = keys.map((k, idx) => {
        return (

    <div className="accordion-item" key={`item${idx}`}>
            <div className="accordion-header catheader " key={`header${idx}`} id={`heading${idx}`}>
              <div className="accordion-button collapsed" 
                  key={`button${idx}`}
                  data-bs-toggle="collapse" 
                  data-bs-target={`#collapse${idx}`}
                  aria-expanded="false" 
                  aria-controls={`#collapse${idx}`}>
                {k}
              </div>
            </div>
            <div id={`collapse${idx}`}
                 key={`arrow${idx}`}
                 className="accordion-collapse collapse" 
                 aria-labelledby={`heading${idx}`} 
                 data-bs-parent="#item-accordion">
                <div className="accordion-body">
                  <ul className="friends-group">
                   {renderItems(data[k])}       
                  </ul>
                </div>
            </div>
        </div>
        )
     });
    return result;
 };



   return (
    <Fragment>
      <div className="list-container accordion accordion-flush" id="item-accordion">
          {renderCats()}
      </div>
    </Fragment>
)};

export default ItemsList;