import * as a from '../actions/modalActions';

const INITIAL = {
  title: '',
  content: '',
  showActionBtn: false,
  actionBtnText: 'OK',
  action: '',
  show: false
};


function modalReducer(state=INITIAL, action) {
  console.log('action:', action)
    switch (action.type) {

      case a.CLOSE: 
          return Object.assign({}, INITIAL);
      
      case a.CONFIRM: 
          return Object.assign({}, state, {
            show: true, 
            title: 'Are you sure?', 
            showActionBtn: true,
            ...action.payload
          });
           
      case a.ERROR: 
          return Object.assign({}, state, {
            show: true, 
            title: 'Oops!', 
            showActionBtn: false,
            ...action.payload
          });
      
      case a.INFO: 
            return Object.assign({}, state, {show: true, ...action.payload});
       
      case a.SUCCESS: 
          return Object.assign({}, state, {
            show: true, 
            title: 'SUCCESS!', 
            showActionBtn: false,
            ...action.payload
          });
      
       default:
          return state;
    }
}


export default modalReducer;