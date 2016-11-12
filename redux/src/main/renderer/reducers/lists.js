import { RECEIVED_OWN_LISTS } from '../constants/ActionTypes';
import { defaultCursor } from '../../infrastructure/cursor';

const initialState = { lists: [], nextCursor: defaultCursor };

function shapeLists(listInAction) {
  return {
    id_str: listInAction.id_str,
    name: listInAction.name,
    mode: listInAction.mode,
    member_count: listInAction.member_count,
  }
}

export default function lists(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_OWN_LISTS:
      return {
        lists: action.lists.lists.map(shapeLists),
        nextCursor: action.lists.next_cursor_str
      };

    default:
      return state;
  }
}
