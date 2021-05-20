import React, {Fragment, useState, useEffect, useCallback} from 'react';
import { connect } from 'react-redux';
import {
        showSuccessModal} from '../actions/modalActions.js';
import {getCats,
        getItems
        } from '../actions/editorActions';

import APICalls from '../apiCalls';
import "../styles/friends.css";

import Item from '../components/Item';


const TestPage = ({dispatch, cats, selectedMain}) => {
   let result;
   const [testItems, setTestItems] = useState([]);

   const getTestItems = useCallback(
    async() => {
      let data = await APICalls.getItemsByCat(13);
      setTestItems(data);
    },[]);


  useEffect(() => {
    dispatch(getCats());
    getTestItems();
  }, [dispatch]);

 // const styles = {
 //   parent: {
 //     fontWeight: 'bold'
 //   },
 //   child: {
 //   }
 // };


  const runThis = () => {
    //DO SOMETHING OR DO ANOTHER ACTION
    dispatch(showSuccessModal({content: 'clicked'}))
  };

const toggleNested = (e) => {
  e.target.classList.toggle("caret-down");
  var parentId = e.target.getAttribute('data-id');
  var container = document.getElementById("item-list");
  var matches = container.querySelectorAll(`div[data-parent-id='${parentId}']`);
   matches.forEach(function(item) {
     item.classList.toggle("active")
   });
}


// const renderParent = (parent) => {
//   return  (
//     <Fragment>
//       <div className="caret" key={parent.id} onClick={toggleNested}>{parent.parent}</div>
//       <ul className="nested" id={parent.id + '-ul'}>
//         {parent.children.map(c => (
//            <li key={c.id}>{c.name}</li>
//         ))}
//       </ul>
//     </Fragment>
//   )
// }


const renderItems = () => {
  return testItems.map(i => {
    if (i.is_parent && i.hide_children) {
      return <div className="listitem parent caret" onClick={toggleNested} key={i.id} data-id={i.id}>{i.parent}</div>
    } else if (i.is_parent && i.hide_children === 0) {
      return <div className="listitem parent" key={i.id} data-parent-id={i.parent_id}>{i.parent}</div>
    } else if (i.is_child && i.hide_children) {
      return <div className="listitem child nested" key={i.id} data-parent-id={i.parent_id}>{i.name}</div>
    } else if (i.is_child && i.hide_children === 0) {
      return <div className="listitem child active" key={i.id} data-parent-id={i.parent_id}>{i.name}</div>
    } else {
      return <div className="listitem" key={i.id}>{i.name}</div>
    }
  });
};


return (
    <Fragment>
     <div id="item-list">{renderItems()}</div>
     </Fragment>
  )
};

const mapStoreToProps = (store) => {
 // console.log('store: ', store)
  return (
    {show: store.modal.show,
    items: store.editor.items,
    cats: store.editor.cats,
    selectedMain: store.editor.selectedMain
  // hasErrors: state.editor.hasErrors
})};

export default connect(mapStoreToProps)(TestPage);



    