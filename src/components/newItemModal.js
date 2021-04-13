// import React from 'react';
// import Modal from './modal';



// function NewItemModal({text, id, setValueFunc}) {
//   const modalInputId = `modalInputId${id}`;


//   const handleInputChange = (e) => {
//      setValueFunc(e.target.value);  //sets newText up at page level
//   }



//     return (
//       <Modal title="Add New Item"  >
//           <form onSubmit={e => e.preventDefault()}>
//               <input
//                 className="form-control"
//                 id={modalInputId}
//                 type="text"
//                 value={text}
//                 onChange={handleInputChange}
//               />
//             </form>
//       </Modal>
//   )

// };


export default NewItemModal;