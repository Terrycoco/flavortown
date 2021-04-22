import React, { Fragment  } from 'react';
import "../styles/friends.css";


  // const itemClasses = {
  //   "1": "friend",
  //   "2": "goodfriend",
  //   "3": "bestfriend",
  //   "4": "bff",
  //   "-1": "enemy"
  // };



const ItemsList = ({data, selected, onSelect}) => {



   const selectItem = (e) => {
     console.log(e.target);
     const id = e.target.attributes["data-id"].value;
     const name = e.target.attributes["data-name"].value;
     onSelect({name: name, id: id});
  };



  const renderItems = (items) => {
    if (items) {
      return items.map(i => {
        return (
          <li className="friend" 
               onClick={selectItem} 
               key={i.id}
               data-id={i.id}
               data-name={i.name}
            >
           <span 
               className="listitem"
               key={i.id}
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
          <div className="accordion-item">
            <div className="accordion-header catheader " id={`heading${idx}`}>
              <div className="accordion-button collapsed" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse${idx}`}
                      aria-expanded="false" 
                      aria-controls={`#collapse${idx}`}>
                {k}
              </div>
            </div>
            <div id={`collapse${idx}`}
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