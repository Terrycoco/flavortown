import React, {Fragment, useState, useEffect, useCallback} from 'react';
import APICalls from '../apiCalls';
import "../styles/friends.css";
import cats from '../utilities/cats';
import {groupDataByFieldname} from '../utilities/data';

const ItemsListFull = ({selected, onSelect}) => {
   const [catsArr, setCatsArr] = useState([]); ///hard code for speed?
   const [catId, setCatId] = useState();
   const [itemsObj, setItemsObj] = useState({});
   const [isLoading, setIsLoading] = useState(true);



const fetchItemsByCat = useCallback(
  async() => {
    if (catId in itemsObj) {
      return;
    }
    setIsLoading(true);
    const items = await APICalls.getItemsByCat(catId);
   // console.log('items received:', items);
    let thisObj = {};
    let newObj;
    thisObj[catId] = items;
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



const fetchFriends = useCallback(
  async() => {
    let selectedIds = [];
    console.log('fetchFriends called, selectedObs:', selected);
     if (!selected || selected.length === 0) {
      //return all
       selectedIds = [];
     } else {
       selected.map(i => {
          return selectedIds.push(parseInt(i.id));
        });
     }
     console.log('selectedIds:', selectedIds);
     const ungrouped = await APICalls.getMutual(selectedIds);
     const grouped = groupDataByFieldname(ungrouped, "cat_id", true);
     return {ungrouped, grouped}
 // eslint-disable-next-line     
  }, [selected.length]); //every time ids change reload friends


  function initCats() {
    setCatsArr(cats);
    setCatId();
  };


 




  function resetCatsArr(groupedData) {
    if (groupedData && typeof groupedData === 'object') {
      let keys = Object.keys(groupedData).map(Number);
      console.log('keys', keys);
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
  if (catId !== 12) return;
     const ingreds = await APICalls.getIngredients(itemId);
     console.log('ingeds:', ingreds);
     return ingreds;
  }

   //on initial load at least get the cats
   useEffect(() => {
     initCats();
   }, []);

  //when user selects different catid
   useEffect(() => {
    if (selected.length === 0) {
      setIsLoading(true);
      fetchItemsByCat(catId)
      .then(data => {
        console.log('cat items returned: ', data);
        setItemsObj({...data});
      })
    } else {
      setIsLoading(true);
      fetchFriends()
      .then(data => {
        console.log('grouped data returned: ', data.grouped);
        setItemsObj({...data.grouped});
        resetCatsArr(data.grouped);
      })
    }

    setIsLoading(false);
   }, [catId, fetchItemsByCat, selected.length, fetchFriends]);







   const selectItem = (e) => {
  // console.log(e.target.attributes);
     const id = e.target.attributes["data-id"].value;
     const name = e.target.attributes["data-name"].value;
     const cid = parseInt(catId);

     // console.log('cid:', catId );
    if (cid === 12) {
     fetchIngredients(cid, id)
       .then(data => {
         // console.log('data fetched:', data)
          onSelect(data);
      });
    } else {
     onSelect({id: id, name: name}); //sends back to parent
    }
   };




  const renderItems = () => {
    if (itemsObj && itemsObj[catId]) {
      return itemsObj[catId].map((i,idx) => {
        return    <li  className="friend" 
                 onClick={selectItem} 
                 key={idx}
                 data-id={i.id}
                 data-name={i.name}
              >
                 <span 
                     className="listitem"
                     key={`s{id}`}
                     data-id={i.id}
                     data-name={i.name}
                  >
                     {i.name}
                  </span>
            </li>     
       })
     }
  };








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
  // console.log('curr itemsObj:', itemsObj);
  // console.log('e.target:', e.target);
  if (e.target.attributes["aria-expanded"].value === "true") {
    const thisCatId = e.target.attributes["data-cat-id"].value;
    setCatId(thisCatId); 
    if (!(thisCatId in itemsObj)) {
      fetchItemsByCat(thisCatId);
    }
  }
};


  const renderCats = () => {

     console.log('rendering: selected:', selected, 'catsArr:', catsArr);

    if (!catsArr.length) return null;


    const result = catsArr.map((cat, idx) => {
      let id = cat.cat_id;
       return (
        <div className="accordion-item" 
             key={`item${id}`}
        >
                <div  className="accordion-header catheader " 
                      key={`header${id}`} 
                      id={`heading${id}`}
                       onClick={onCatClick}
                      >
                  <div className="accordion-button collapsed in" 
                      key={`button${id}`}
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse${id}`}
                      aria-expanded="false" 
                      aria-controls={`#collapse${id}`}
                      data-cat-id={cat.cat_id}
                      >
                    {cat.cat}
                  </div>
                </div>
                <div id={`collapse${id}`}
                     key={`arrow${id}`}
                     className="accordion-collapse collapse" 
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