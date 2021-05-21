import React, {Fragment, useState, useEffect, useCallback} from 'react';
import APICalls from '../apiCalls';
import "../styles/friends.css";
import cats from '../utilities/cats';
import {groupDataByFieldname, objectIsEmpty} from '../utilities/data';
import Item from '../components/Item';
const bootstrap = require('bootstrap');


const FlavorFinderList = ({selected, onSelect}) => {
   const [catsArr, setCatsArr] = useState([]); ///hard code for speed?
   const [catId, setCatId] = useState(0);
   const [itemsObj, setItemsObj] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [openParents, setOpenParents] = useState([]);

//on initial load at least get the cats
useEffect(() => {
 initCats();
}, []);

//initial call - no items selected yet
const fetchItemsByCat = useCallback(
  async(thisCatId) => {
    console.log('got to fetchby cat', thisCatId, catId);
     let keys = Object.keys(itemsObj).map(Number);
      console.log('keys in data', keys);
    // if (!thisCatId || thisCatId === 0){
    //   initCats();
    //   return;
    // }
    setCatId(thisCatId);
    if (thisCatId in itemsObj) {
      return;
    }
    const items = await APICalls.getItemsByCat(thisCatId);
    console.log('items received:', items);

    let thisObj = {};
    let newObj;
    thisObj[thisCatId] = items;
    if (itemsObj === undefined) {
       newObj = {
      ...itemsObj,
      ...thisObj
      };
    } else {
       newObj = thisObj;
    }
    return newObj;
},[selected.length]);

useEffect(() =>  {
    if (selected.length === 0){
      setIsLoading(true);
      initCats();
      resetCatsArr();
      setItemsObj(prev => {});
      setIsLoading(false);
    } else {
      resetCatsArr();
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
           setItemsObj({});
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
     // setCatId(0);
    } else {
      setCatsArr(cats);
    //  setCatId(0);
    }
}




// async function fetchIngredients(catId, itemId) {
//   if (catId !== 12 || catId !== 13) return;
//     // const ingreds = await APICalls.getIngredients(itemId);
//    //  console.log('ingeds:', ingreds);
//      return ingreds;
// }



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
     const id = parseInt(e.target.attributes["data-id"].value);
     const name = e.target.attributes["data-name"].value;
     const cid = parseInt(catId);

     //change catId to close everything
     setCatId(0);

     onSelect({id: id, name: name}); //sends back to parent
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
  //console.log('itemsObj:', itemsObj, 'catId:', catId);
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


const onCatClick = (e) => {
    const thisCatId = parseInt(e.target.attributes["data-cat-id"].value);
    setCatId(thisCatId);
    console.log('thiscatid:', thisCatId);
    console.log('catId:', catId);
    if (!(thisCatId in itemsObj)) {
        fetchItemsByCat(thisCatId);
        setCatId(thisCatId);
    } else if (thisCatId === catId) {
      //close cat
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