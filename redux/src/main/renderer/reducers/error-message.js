import { ADD_ERROR_MESSAGE } from '../constants/ActionTypes';

const initialState = { title: null, content: null };

export default function errorMessage(state = initialState, action) {
  switch (action.type) {
    case ADD_ERROR_MESSAGE:
      return {
        title: action.title || '',
        content: action.message
      };

    default:
      return state;
  }
}
