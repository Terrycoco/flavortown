export const OPEN ='OPEN'
export const CLOSE = 'CLOSE'
export const SUCCESS = 'SUCCESS'
export const CONFIRM='CONFIRM'
export const ERROR= 'ERROR'


export function closeModal() {
  return {
    type: CLOSE
  };
};

export function openConfirmModal(payload) {
 // console.log('openConfirm payload: ', payload);
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

export function showErrorModal(payload) {
  return {
    type: ERROR,
    payload: payload
  };
};