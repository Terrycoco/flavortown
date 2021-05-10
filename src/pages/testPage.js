import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import {
        showSuccessModal} from '../actions/modalActions.js';
import {getCats,
        getItems
        } from '../actions/editorActions';
import ItemCombobox from '../components/ItemCombobox';



const TestPage = ({dispatch, cats, items, selectedMain}) => {
   let result;

  useEffect(() => {
    dispatch(getCats());
    dispatch(getItems());
  }, [dispatch]);


  const runThis = () => {
    //DO SOMETHING OR DO ANOTHER ACTION
    dispatch(showSuccessModal({content: 'Item was deleted'}))
  };



  return (
    <Fragment>
  
      <ItemCombobox />
     

     </Fragment>
  )
}

const mapStoreToProps = (store) => {
  console.log('store: ', store)
  return (
    {show: store.modal.show,
    items: store.editor.items,
    cats: store.editor.cats,
    selectedMain: store.editor.selectedMain
  // hasErrors: state.editor.hasErrors
})};

export default connect(mapStoreToProps)(TestPage);
