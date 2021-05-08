import React from 'react';
import { connect } from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {closeModal} from '../actions/modalActions';



const GlobalModal = ({dispatch, ...props}) => {

  const handleClose = () => {
     dispatch(closeModal());
  };

  return (
  <Modal show={props.show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body className="text-center"  dangerouslySetInnerHTML={{__html: props.content}}>

    </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >Close</Button>
        {props.showActionBtn && props.showActionBtn === true &&
            <Button variant="primary" className="ModalButton" onClick={props.action}>
             {props.actionBtnText}
         </Button>
        }
    </Modal.Footer>
  </Modal >
)
};
 

const mapStateToProps = (state) => state.modal;


export default connect(mapStateToProps)(GlobalModal);
