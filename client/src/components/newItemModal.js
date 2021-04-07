import React from 'react';
import Modal from './modal';



function NewItemModal({value}) {
  return (
    <Modal title="Add New Item">
        <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              value={value}
            />
          </form>
    </Modal>
)

};


export default NewItemModal;