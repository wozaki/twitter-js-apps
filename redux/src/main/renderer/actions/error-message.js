import * as types from '../constants/ActionTypes';

export function addErrorMessage(message, title) {
  return {
    type: types.ADD_ERROR_MESSAGE,
    message,
    title
  };
}
