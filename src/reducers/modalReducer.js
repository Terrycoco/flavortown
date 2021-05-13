import * as a from '../actions/modalActions';

const INITIAL = {
  title: '',
  content: '',
  showActionBtn: false,
  actionBtnText: 'OK',
  action: '',
  show: false,
  hasParamObject: false,
  paramObject: {}
};


function modalReducer(state=INITIAL, action) {
    switch (action.type) {

      case a.CHANGE_PARAM_OBJECT:
           let newobj = Object.assign({}, state.paramObject);
           newobj[action.payload.fieldname] = action.payload.value;
           console.log('newobj:', newobj);
           return Object.assign({}, state, {paramObject: newobj});
           
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

      case a.FORM:
          return Object.assign({}, state, {
            show: true, 
            showActionBtn: true,
            hasParamObject:true,
            ...action.payload
          });
      
      case a.INFO: 
            return Object.assign({}, state, {show: true, ...action.payload});

      case a.LOAD_PARAM_OBJECT:
            return Object.assign({}, state, {paramObject: action.payload});
       
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