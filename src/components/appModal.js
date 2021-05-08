import React, {useState} from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const AppModal = (props) => {

return (

<Modal show={show}>
    <Modal.Header closeButton>
        <Modal.Title>Login Form</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {props.children}
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
    </Modal.Footer>
</Modal>
)
};