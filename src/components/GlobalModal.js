import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {closeModal} from '../actions/modalActions';
import colors from '../styles/colors';


const GlobalModal = ({dispatch, paramObject, title, show, content, showActionBtn, action, actionBtnText, hasParamObject}) => {
    const [currObj, setCurrObj] = useState({});
    
    const closeRef = useRef();


   useEffect(() => {
     setCurrObj(paramObject);
   },[]);


   function createMarkup() { 
    return {__html: content};
  }



  const handleClose = () => {
     dispatch(closeModal());
  };

  return (
  <Modal
      show={show} 
      onHide={handleClose} 
      backdrop="static"
      autoFocus={false}
      onEntered={() => closeRef.current.focus()}
  >
    <Modal.Header style={{background: colors.lightgreen, color: colors.pink, border: 'none'}}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
        
    <Modal.Body className="text-center" dangerouslySetInnerHTML= {createMarkup()} >
    </Modal.Body>
  
    <Modal.Footer>
    {showActionBtn && showActionBtn === true &&
    <Button variant="primary" className="btn btn-primary ModalButton" onClick={action}>
         {actionBtnText}
    </Button>
    }
    <Button id="global-modal-close" variant="primary" className="btn btn-secondary btn-default" ref={closeRef} onClick={handleClose} >Close</Button>
    </Modal.Footer>
  </Modal >
)
};
 

const mapStoreToProps = (store) => {
  return {
  title: store.modal.title,
  content: store.modal.content,
  showActionBtn: store.modal.showActionBtn,
  actionBtnText: store.modal.actionBtnText,
  action: store.modal.action,
  show: store.modal.show,
  hasParamObject: store.modal.hasParamObject,
  paramObject: store.modal.paramObject
  };
}

export default connect(mapStoreToProps)(GlobalModal);


