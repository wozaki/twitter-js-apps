import * as types from '../constants/ActionTypes';
import ListsUsecase from '../../domain/usecases/ListsUsecase';
import { onError } from './error-handler';
import { TwitterAction } from '../middlewares/twitterClient';

/**
 * @param {string} myId
 * @returns {TwitterAction}
 */
export function fetchOwnLists(myId) {
  return new TwitterAction({
    invoke: twitterClient => dispatch => {
      new ListsUsecase(twitterClient)
        .getOwnLists(myId)
        .then(lists => {
          dispatch(receivedOwnLists(lists));
        })
        .catch(error => dispatch(onError(error)));
    }
  });
}

function receivedOwnLists(lists) {
  return {
    type: types.RECEIVED_OWN_LISTS,
    lists
  };
}
