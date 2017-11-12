import {
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_MODAL,
} from '../constants/ActionTypes'

const initialState = {
  modalType: null,
  modalProps: {},
}

export default function modal(state = initialState, action) {
  const { type, modalType, modalProps } = action

  switch (type) {
    case SHOW_MODAL:
      return {
        modalProps: {
          ...modalProps,
          showModal: true,
        },
        modalType,
      }
    case HIDE_MODAL:
      return {
        ...state,
        modalProps: {
          ...state.modalProps,
          context: null,
          showModal: false,
        },
      }
    case UPDATE_MODAL:
      return {
        ...state,
        modalProps: {
          ...state.modalProps,
          ...modalProps,
        },
      }
    default:
      return state
  }
}
