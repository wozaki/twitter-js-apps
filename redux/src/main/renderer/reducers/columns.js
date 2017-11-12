import _ from 'lodash';
import { ADD_COLUMN, DELETE_COLUMN } from '../constants/ActionTypes';
import { Columns, COLUMN_TYPE_LIST, COLUMN_TYPE_SEARCH } from '../../domain/models/Column'

const initialState = [];

function shape(action, nextPosition) {
  const base = {
    id: Columns.generateId,
    position: nextPosition,
    columnType: action.columnType,
  };

  switch (action.columnType) {
    case COLUMN_TYPE_LIST:
      return {
        ...base,
        detail: {
          listId: action.columnProps.listId,
          listName: action.columnProps.listName,
        }
      };
    case COLUMN_TYPE_SEARCH:
      return {
        ...base,
        detail: {
          searchQuery: action.columnProps.searchQuery,
        }
      };
    default:
      throw Error("unknown type:" + action.columnType)
  }
}

export default function columns(state = initialState, action) {
  switch (action.type) {
    case ADD_COLUMN:
      const nextPosition = _.defaultTo(_.maxBy(state, (s) => s.position), 0) + 1;
      return _.chain(state)
        .concat(shape(action, nextPosition))
        .sortBy('position')
        .value();

    case DELETE_COLUMN:
      console.log("DELETE_COLUMN!", action.columnId)
      return _.reject(state, (s) => s.id === action.columnId);

    default:
      return state;
  }
}
