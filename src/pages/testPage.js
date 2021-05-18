import React, {Fragment, useState, useEffect, useCallback} from 'react';
import { connect } from 'react-redux';
import {
        showSuccessModal} from '../actions/modalActions.js';
import {getCats,
        getItems
        } from '../actions/editorActions';

import APICalls from '../apiCalls';
import "../styles/test.css";
import {nestChildren} from '../utilities/data';



const TestPage = ({dispatch, cats, selectedMain}) => {
   let result;
   const [testItems, setTestItems] = useState([]);

   const getTestItems = useCallback(
    async() => {
      let data = await APICalls.getItemsByCat(13);
      console.log('items from server:', data)
      setTestItems(data);
    },[]);


  useEffect(() => {
    dispatch(getCats());
    getTestItems();
  }, [dispatch]);

 const styles = {
   parent: {
     fontWeight: 'bold'
   },
   child: {
   }
 };


  const runThis = () => {
    //DO SOMETHING OR DO ANOTHER ACTION
    dispatch(showSuccessModal({content: 'clicked'}))
  };

const toggleNested = (e) => {
  e.target.classList.toggle("caret-down");
  e.target.nextSibling.classList.toggle("active");
}

const renderParent = (parent) => {
  return  (
    <Fragment>
      <div className="caret" key={parent.id} onClick={toggleNested}>{parent.parent}</div>
      <ul className="nested" id={parent.id + '-ul'}>
        {parent.children.map(c => (
           <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </Fragment>
  )
}


const renderItems = () => {

   let nested = nestChildren(testItems);
   console.log('nested:', nested);

   return nested.map(n => (
     <>
       {(n.is_parent ? renderParent(n) : <div className="item" key={n.id}>{n.name}</div>)}
     </>
   ))
};


return (
    <Fragment>
     <div>{renderItems()}</div>
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



    