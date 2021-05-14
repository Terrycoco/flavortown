import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {updateItem} from '../actions/editorActions';
import colors from '../styles/colors';


const cats = [
{cat_id:3,cat:"Aromatics & Other Flavorings"},
{cat_id:2,cat:"Beans & Nuts"},
{cat_id:12, cat: "Classic Combos"},
{cat_id:8,cat:"Cuisines"},
{cat_id:7,cat:"Dairy & Eggs"},
{cat_id:11,cat:"Dish Types"},
{cat_id:10,cat:"Fats"},
{cat_id:4,cat:"Fruit"},
{cat_id:1,cat:"Herbs & Spices"},
{cat_id:5,cat:"Proteins"},
{cat_id:9,cat:"Starches"},
{cat_id:6,cat:"Vegetables"},
{cat_id:13,cat:"Sauces & Dressings"}
];


const ItemEditModal = ({dispatch, selectedMain, onClose, show}) => {
   const [item, setItem] = useState({});

   useEffect(() => {
      setItem(() => Object.assign({}, selectedMain));
   },[selectedMain]); //might be a delay in getting here

  const handleClose = () => {
    console.log('got to handle close')
    onClose();
  };

   const onChange = (e) => {
    switch (e.target.id) {
      case ('edit-name'):
        setItem({...item, name: e.target.value});
        break;
      case ('is_parent'):
      console.log('now checked?', e.target.checked, typeof e.target.checked );
        setItem({...item, is_parent: e.target.checked ? 1 : 0});
        break;
      case ('hide_children'):
        setItem({...item, hide_children: e.target.checked ? 1 : 0});
        break;
      default:
      return;
    }
   }

   const changeCat = (e)  => {
     let found = cats.find(c => c.cat_id === parseInt(e.target.value));

     console.log('found:', found);
      setItem({...item, cat_id: found.cat_id, cat: found.cat})
   }

   const onSave = () => {
    console.log('saving: ', item);
    dispatch(updateItem(item));
    onClose();
   }


  return (
  <Modal 
      show={show} 
      onHide={handleClose} 
      autoFocus
      backdrop="static"
  >
    <Modal.Header style={{background: colors.lightgreen, color: colors.pink, border: 'none'}}>
      <Modal.Title>Edit Item</Modal.Title>
    </Modal.Header>

    <Modal.Body className="text-center"  >
     <>
       <div>
        <label className="control-label" htmlFor="item-edit">Name: {item.id}</label>
        <textarea 
            type="text" 
            className="form-control" 
            id="edit-name" 
            onChange={onChange}
            defaultValue={item.name}
        />
        <label className="control-label" htmlFor="selectcontrol">Category: {item.cat_id}</label>
        <select 
          className="rbt-input-main form-control rbt-input form-control-sm" 
          id="edit-cat" 
          required
          defaultValue={item.cat_id}
          tabIndex="2"
          onChange={changeCat}
        >
          {cats && cats.map(c => (
            <option key={c.cat_id} data-cat={c.cat} value={c.cat_id}>{c.cat}</option>
          ))}
        </select>
          <div className="d-flex justify-content-start align-items-center edit-checkbox-row" >
            <input tabIndex="-1" className="checkbox" type="checkbox" id="is_parent" defaultChecked={item.is_parent} onInput={onChange}/>
            <label tabIndex="-1" className="form-check-label" htmlFor="inlineCheckbox2">Is Parent</label>
            <input tabIndex="-1" className="checkbox" type="checkbox" id="hide_children" defaultChecked={item.hide_children} onInput={onChange}/>
            <label tabIndex="-1" className="form-check-label" htmlFor="inlineCheckbox2">Hide Children</label>
          </div>
      </div>
     </>
    </Modal.Body>

    <Modal.Footer>
    <Button variant="primary" className="btn btn-primary ModalButton" onClick={onSave}>
       Save Edits
    </Button>
    <Button variant="primary" className="btn btn-secondary btn-default" autoFocus onClick={handleClose} >Close</Button>
    </Modal.Footer>
  </Modal >
)
};
 

const mapStoreToProps = (store) => {
  return {
    selectedMain: store.editor.selectedMain
  };
}

export default connect(mapStoreToProps)(ItemEditModal);


