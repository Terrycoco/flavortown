import React from 'react';

//a modal component which will be used by other components & pages
const SimpleModal = ({ children, title, thisRef, modal, okBtn, onOk}) => {

const handleOKClick = (e) => {
   onOk();
   modal.hide();
};

const getOkBtn = () => {
  if (okBtn) {
    return (
      <button type="button" className="btn btn-primary" onClick={handleOKClick}>OK</button>
    )
  }
}

  return (
    <div className="modal fade" ref={thisRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
              <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-secondary" onClick={() => modal.hide()}>Close</button>
             {getOkBtn()}
            </div>
          </div>
        </div>
      </div>
    );
};
 

export default SimpleModal;