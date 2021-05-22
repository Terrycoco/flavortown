import React, {Fragment, useState, useEffect, useCallback} from 'react';
import APICalls from '../apiCalls';
import "../styles/friends.css";
import cats from '../utilities/cats';
import {groupDataByFieldname, objectIsEmpty} from '../utilities/data';
import Item from '../components/Item';
const bootstrap = require('bootstrap');


const FlavorFinderList = ({selected, onSelect}) => {
   const [catsArr, setCatsArr] = useState(cats); ///hard code for speed?
   const [catId, setCatId] = useState(0);
   const [itemsObj, setItemsObj] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [openParents, setOpenParents] = useState([]);


//initial call - no items selected yet
const fetchItemsByCat = useCallback(
  async(thisCatId) => {
    console.log('fetchy cat', thisCatId, catId);
    const items = await APICalls.getItemsByCat(thisCatId);
    console.log('items received:', items);
    return(items);
  },[catId]);


//mutual friends list
const fetchMutual = () => {
  return new Promise( async(resolve,reject)=> {
   let selectedIds = [];

 // parse out selected Ids from their object array);
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
   //console.log('ungrouped', ungrouped);
   groupDataByFieldname(ungrouped, "cat_id", true)
   .then(grouped => {
     console.log('grouped', grouped);
     resolve(grouped);
   });
  });//end promise
};



//when catId changes
useEffect(() => {
      //ignore if just shutting drawer
      if (catId === 0) {
         return;
      //only refetch if nothing selected
      } else if (selected.length === 0) {
          //and not already in dataset
          if (!itemsObj.hasOwnProperty(catId)) {
            setIsLoading(true);
            fetchItemsByCat(catId)
            .then(arr => {
              setItemsObj(prev => ({...prev, [catId]: arr}));
              setIsLoading(false);
            });
           ;
          }
      }
}, [catId, selected.length]);


//when user selects or clears a tag
useEffect(() => {
  if (selected.length === 0) {
     resetAll();
   } else {
    //something selected whole dataset changes
    setIsLoading(true);
    fetchMutual()
    .then(grouped => {
      console.log('grouped:', grouped);
      resetCatsArr(grouped);
      setItemsObj(grouped);
      setCatId(0); //will call above side effect
      setIsLoading(false);
    });
  }
}, [selected.length])

//no combos when nothing selected
function resetAll() {
    setCatsArr(cats);
    setItemsObj({});
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
     // setCatId(0);
    } else {
      setCatsArr(cats);
    //  setCatId(0);
    }
}


const selectItem = (e) => {
     const id = parseInt(e.target.attributes["data-id"].value);
     const name = e.target.attributes["data-name"].value;
     const cid = parseInt(catId);

     //change catId to close everything
     setCatId(0);

     onSelect({id: id, name: name}); //will trigger the select change
};

const toggleNested = (parentId) => {
  const index = openParents.indexOf(parentId);
  let arr = openParents.splice();

  //its there remove it
  if (index > -1) {
     arr.splice(index, 1);
  } else {
    arr.push(parentId);
  }

  setOpenParents(old => arr);

  // e.target.classList.toggle("caret-down");
  // var parentId = e.target.getAttribute('data-id');
  // var container = document.getElementById(`item-list-${catId}`);
  // var matches = container.querySelectorAll(`div[data-parent-id="${parentId}"]`);
  // console.log('matches:', matches);

  //  matches.forEach(function(item) {
  //    item.classList.add("active");
  //    item.classList.remove("nested");
  //  });
}

function showParent() {
  return (!selected || selected.length === 0);
}

const renderItems = () => {
  if (objectIsEmpty(itemsObj) || !itemsObj.hasOwnProperty(catId)) return null;
   console.log('got to renderItems itemsObj:', itemsObj, 'catId:', catId);
  return itemsObj[catId].map(i => {
    return <Item 
            item={i} 
            onSelect={selectItem} 
            onOpen={toggleNested} 
            openParents={openParents}
            showParent={showParent()} />
  });
};

const loaderOrList = () => {
  console.log('isloading:', isLoading, 'catID:', catId, 'itemsObj:', itemsObj)
      if (isLoading || !catId|| !itemsObj) {
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


const onCatClick = async(e) => {
    const thisCatId = parseInt(e.target.attributes["data-cat-id"].value);
    console.log('thiscatid:', thisCatId);
    console.log('catId:', catId);
    if (thisCatId === catId) {
      setCatId(0);
    } else {
      setCatId(thisCatId);
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
                     

                      >
                    <div className={btncl}
                        key={`button${id}`}
                        data-cat-id={id}
                         id={`heading${id}`}
                        onClick={onCatClick}
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
                      <ul className="friends-group" id={`item-list-${catId}`}>
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

export default FlavorFinderList;