import React, {Fragment, useState, useEffect, useCallback} from 'react';
import APICalls from '../apiCalls';
import "../styles/friends.css";
import cats from '../utilities/cats';
import {groupDataByFieldname, nestChildren} from '../utilities/data';

const ItemsListFull = ({selected, onSelect}) => {
   const [catsArr, setCatsArr] = useState([]); ///hard code for speed?
   const [catId, setCatId] = useState(0);
   const [itemsObj, setItemsObj] = useState({});
   const [isLoading, setIsLoading] = useState(true);


//initial call - no items selected yet
const fetchItemsByCat = useCallback(
  async() => {
    if (!catId || catId === 0) return;
    if (catId in itemsObj) {
      return;
    }
    const items = await APICalls.getItemsByCat(catId);
    const nested = nestChildren(items);
   // console.log('items received:', items);
    let thisObj = {};
    let newObj;
    thisObj[catId] = nested;
    if (itemsObj === undefined) {
       newObj = {
      ...itemsObj,
      ...thisObj
      };
    } else {
       newObj = thisObj;
    }
    return newObj;
},[catId, selected.length]);

useEffect(() =>  {
    if (selected.length === 0){
      setIsLoading(true);
      initCats();
      setIsLoading(false);
    }
  }, [selected.length]); 


//mutual friends list
const fetchFriends = useCallback(
  async() => {
    let selectedIds = [];
   // console.log('fetchFriends called, selectedObs:', selected);
     if (!selected || selected.length === 0) {
      //return all
       selectedIds = [];
     } else {
       selected.map(i => {
          return selectedIds.push(parseInt(i.id));
        });
     }
   //  console.log('selectedIds:', selectedIds);
     const ungrouped = await APICalls.getMutual(selectedIds); 
     const grouped = groupDataByFieldname(ungrouped, "cat_id", true);
     return {ungrouped, grouped}
 // eslint-disable-next-line     
  }, [selected.length]); //every time ids change reload friends



//cat list - no combos when nothing selected
function initCats() {
     if (!selected || selected.length < 1) {
      setCatsArr(cats.filter(function( obj ) {
           return obj.cat_id !== 12;
        }));
    } else {
      setCatsArr(cats);
    }
    setCatId(0);
}



function resetCatsArr(groupedData) {
    if (groupedData && typeof groupedData === 'object') {
      let keys = Object.keys(groupedData).map(Number);
      //console.log('keys', keys);
      function filterCats(cat) {
        return keys.includes(cat.cat_id);
      }

      let newcats = cats.filter(filterCats);
      console.log('newcats:', newcats);
      setCatsArr(newcats);
    } else {
      setCatsArr(cats);
    }
}


async function fetchIngredients(catId, itemId) {
  if (catId !== 12 || catId !== 13) return;
     const ingreds = await APICalls.getIngredients(itemId);
   //  console.log('ingeds:', ingreds);
     return ingreds;
}

//on initial load at least get the cats
useEffect(() => {
 initCats();
}, []);

  //when user selects different catid
useEffect(() => {
  //all items
    if (selected.length === 0) {
      fetchItemsByCat(catId) 
      .then(data => {
      //  console.log('cat items returned: ', data);
        setItemsObj({...data});
      })
    //by cat
    } else {
      fetchFriends()
      .then(data => {
      //  console.log('grouped data returned: ', data.grouped);
        setItemsObj({...data.grouped});
        resetCatsArr(data.grouped);
      })
   }
}, [catId, fetchItemsByCat, selected.length, fetchFriends]);


   const selectItem = (e) => {
  // console.log(e.target.attributes);
     const id = parseInt(e.target.attributes["data-id"].value);
     const name = e.target.attributes["data-name"].value;
     const cid = parseInt(catId);

     // console.log('cid:', catId );
    if (cid === 12 || cid === 13) {
     fetchIngredients(cid, id)
       .then(data => {
         if (!data) {
          onSelect({id: id, name: name});
         } else {
         // console.log('data fetched:', data)
          onSelect(data);
        }
      });
    } else {
     onSelect({id: id, name: name}); //sends back to parent
    }
   };

const toggleNested = (e) => {
  e.target.classList.toggle("caret-down");
  e.target.nextSibling.classList.toggle("active");
}


const renderParent = (parent) => {
  return  (
    <Fragment>
      <div className="listitem caret" key={parent.id} onClick={toggleNested}>{parent.parent}</div>
      <ul className="nested" id={parent.id + '-ul'}>
        {parent.children.map(c => (
           <li className="listitem" key={c.id}>{c.name}</li>
        ))}
      </ul>
    </Fragment>
  )
}


const renderItems = () => {
 if (itemsObj && itemsObj[catId]) {
   return itemsObj[catId].map(n => (
     <>
       {(n.is_parent ? renderParent(n) : <div className="listitem" key={n.id}>{n.name}</div>)}
     </>
   ))
 }
};



// const renderItems = () => {
//     if (itemsObj && itemsObj[catId]) {
//       return itemsObj[catId].map((i,idx) => {
//         let cl = "listitem";
//         cl =  cl + (i.is_parent ? " parent" : "");
//         cl =  cl + (i.is_child ? " child" : "");
//         cl =  cl + (i.hide_children ? " hiddenchildren" : "");
//         cl = cl + (i.friend_type===5 ? " ingred" : "");
//         return    <li  className="friend" 
//                  onClick={selectItem} 
//                  key={idx}
//                  data-id={i.id}
//                  data-name={i.name}
//               >
//                  <span 
//                      className={cl}
//                      key={`s{id}`}
//                      data-id={i.id}
//                      data-name={i.name}
//                   >
//                      {i.name}
//                   </span>
//             </li>     
//        })
//      }
// };

const loaderOrList = () => {
      if (isLoading) {
          return (
            <div className="h-75 d-flex justify-content-center align-items-center">
              <div className="spinner-border d-flex text-info" role="status">
                 <span className="visually-hidden">Loading flavors...</span>
              </div>
            </div>
          )
       } else {
        return renderItems()
      }
};


const onCatClick = (e) => {
    const thisCatId = parseInt(e.target.attributes["data-cat-id"].value);
    console.log('thiscatid:', thisCatId);
    if (catId !== thisCatId) {
       setCatId(thisCatId);
        if (!(thisCatId in itemsObj)) {
          fetchItemsByCat(thisCatId);
       } 
    } else {
      setCatId(0);
    }
  };

const renderCats = () => {
    const result = catsArr.map((cat, idx) => {
      let id = parseInt(cat.cat_id);

      //console.log('rendering cat', id);
      let cl = "accordion-collapse collapse";
      let btncl = "accordion-button";
      if (id === catId) {
        cl = cl + " show";
      } else {
        btncl = btncl + " collapsed";
      }
       return (
        <div className="accordion-item" 
             key={`item${id}`}
        >
                 <div className="accordion-header catheader " 
                      key={`header${id}`} 
                      id={`heading${id}`}
                      onClick={onCatClick}

                      >
                  <div className={btncl}
                      key={`button${id}`}
                      data-cat-id={id}
                      >
                    {cat.cat}
                  </div>
                </div>
                <div id={`collapse${id}`}
                     key={`arrow${id}`}
                     className={cl} 
                     aria-labelledby={`heading${id}`} 
                     data-bs-parent="#item-accordion"
                >
                    <div className="accordion-body">
                      <ul className="friends-group">
                        {loaderOrList()}
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
      <div className="list-container accordion accordion-flush" 
           id="item-accordion"
           key="ItemList"
           >
          {renderCats()}
      </div>
    </Fragment>
)};

export default ItemsListFull;