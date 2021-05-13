export const OPEN ='OPEN';
export const CLOSE = 'CLOSE';
export const SUCCESS = 'SUCCESS';
export const CONFIRM='CONFIRM';
export const ERROR= 'ERROR';
export const INFO='INFO';
export const FORM='FORM';
export const CHANGE_PARAM_OBJECT='CHANGE_PARAM_OBJECT';
export const LOAD_PARAM_OBJECT='LOAD_PARAM_OBJECT';



export function closeModal() {
  return {
    type: CLOSE
  };
};


export function changeParamObject(fieldname, value) {
  return {
    type: CHANGE_PARAM_OBJECT,
    payload: {fieldname: fieldname, value: value}
  }
};


export function loadParamObject(paramObj) {
  console.log('got to loadParamObject;', paramObj)
  return {
    type: LOAD_PARAM_OBJECT,
    payload: paramObj
  }
};

export function openConfirmModal(payload) {
  console.log('openConfirm payload: ', payload);
  return {
    type: CONFIRM,
    payload: payload
  };
};

export function showSuccessModal(payload) {
 // console.log('showSuccess payload: ', payload);
  return {
    type: SUCCESS,
    payload: payload
  };
};

export function showModal(payload) {
 // console.log('showSuccess payload: ', payload);
  return {
    type: INFO,
    payload: payload
  };
};

export function showErrorModal(payload) {
  return {
    type: ERROR,
    payload: payload
  };
};

export function showFormModal(payload) {
  return {
    type: FORM,
    payload: payload
  };
};

