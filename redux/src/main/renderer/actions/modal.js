import {
  SHOW_MODAL,
  UPDATE_MODAL,
  HIDE_MODAL,
} from '../constants/ActionTypes'

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const showDefaultModal = (modalType, modalProps) => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

export const showModal = (modalType, props = {}) => (dispatch) => {
  const modalProps = {
    ...props,
    hideModal: () => dispatch(hideModal()),
  };

  dispatch(showDefaultModal(modalType, modalProps))
};

export const updateModal = modalProps => ({
  type: UPDATE_MODAL,
  modalProps,
});
