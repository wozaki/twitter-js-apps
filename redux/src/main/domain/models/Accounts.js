import _ from 'lodash';
import Entity from './Entity';

class Accounts {

  /**
   * @param {Account[]} accounts
   */
  constructor(accounts) {
    this._accounts = accounts;
  }

  /**
   * @param {Object[]} accountObjects
   * @return {Accounts}
   */
  static fromObjects(accountObjects) {
    const accounts = _.isEmpty(accountObjects)
      ? [Account.dummy]
      : accountObjects.map(obj => Account.fromObject(obj));
    return new Accounts(accounts);
  }

  /**
   * @returns {Account|undefined}
   */
  get primary() {
    return _.chain(this._accounts)
      .filter(account => account.isPrimary)
      .head()
      .value();
  }

  /**
   * @returns {Account[] | []}
   */
  get subAccounts() {
    return _.reject(this._accounts, (a) => a.isPrimary);
  }

  /**
   * @return {Account[]}
   */
  get asArray() {
    return this._accounts;
  }

  /**
   * @returns {boolean}
   */
  get isEmpty() {
    return _.isEmpty(this._accounts) || (this._accounts.length == 1 && this._accounts[0].isDummy);
  }

}

const dummyAccountObject = {
  created_at: null,
  credential: null,
  followers_count: null,
  friends_count: null,
  id_str: null,
  name: null,
  profile_image_url: null,
  protected: null,
  screen_name: null,
  statuses_count: null,
  is_initial_state: true,
  is_primary: true
};

class Account extends Entity {

  /**
   * @param {Object} object
   */
  constructor(object) {
    super(object.id_str);
    this._object = object;
  }

  /**
   * @param {Object} userObject
   * @return {Account}
   */
  static fromObject(userObject) {
    return new Account(userObject);
  }

  /**
   * @return {Account}
   */
  static get dummy() {
    return new Account(dummyAccountObject);
  }

  /**
   * @return {string}
   */
  get id() {
    return this._object.id_str;
  }

  /**
   * @returns {Credential}
   */
  get credential() {
    return this._object.credential;
  }

  /**
   * @return {boolean}
   */
  get isPrimary() {
    return this._object.is_primary;
  }

  /**
   * @return {boolean}
   */
  get isDummy() {
    return this._object.id_str == null;
  }

  /**
   * @return {string}
   */
  get profileImageUrl() {
    return this._object.profile_image_url;
  }

  /**
   * @return {string}
   */
  get screenName() {
    return this._object.screen_name;
  }

  /**
   * @return {number}
   */
  get tweetCount() {
    return this._object.statuses_count;
  }

  /**
   * @return {number}
   */
  get followersCount() {
    return this._object.followers_count;
  }

  /**
   * @return {number}
   */
  get followingCount() {
    return this._object.friends_count;
  }
}

export { Accounts, Account };
