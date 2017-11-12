import _ from 'lodash';

const COLUMN_TYPE_LIST   = 'COLUMN_TYPE_LIST';
const COLUMN_TYPE_SEARCH = 'COLUMN_TYPE_SEARCH';

class Columns {

  //uniqueness in users local device
  static get generateId() {
    return new Date().valueOf();
  }

  /**
   * @param {Account[]} accounts
   */
  constructor(columns) {
    this._columns = columns;
  }

  remove(position) {
    const rejected = _.reject(this._columns, (c) => c.position === position);
    return new Columns(rejected);
  }

  get raw() {
    return this._columns;
  }
}

export { Columns, COLUMN_TYPE_LIST, COLUMN_TYPE_SEARCH };
