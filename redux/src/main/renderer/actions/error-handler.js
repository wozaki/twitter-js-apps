import { addErrorMessage } from './error-message';

export function onError(error) {
  console.error(error);
  const errorMessage = toUserErrorMessage(error);
  return dispatch => {
    dispatch(addErrorMessage(errorMessage));
  }
}

function toUserErrorMessage(error) {
  //TODO: handle each error types
  //TODO: return title
  return error.message;
}
