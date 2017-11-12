import {
  ADD_COLUMN,
  DELETE_COLUMN
} from '../constants/ActionTypes';

export function addColumn(columnType, columnProps) {
  return {
    type: ADD_COLUMN,
    columnType,
    columnProps
  };
}

export function deleteColumn(columnId) {
  return {
    type: DELETE_COLUMN,
    columnId
  };
}
