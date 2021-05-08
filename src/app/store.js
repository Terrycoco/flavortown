import {configureStore} from '@reduxjs/toolkit';
import modalReducer from '../reducers/modalReducer';
import editorReducer from '../reducers/editorReducer';


export default configureStore({
  reducer: {
    modal: modalReducer,
    editor: editorReducer
  }
});