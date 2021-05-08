import { combineReducers } from 'redux';
import modal from './modalReducer';
import editor from './editorReducer';

const rootReducer = combineReducers({
  modal: modal,
  editor: editor
});


export default rootReducer;