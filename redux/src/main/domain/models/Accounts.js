import _ from 'lodash';
import Entity from './Entity';

class Accounts {

  /**
   * @param {[Account]} accounts
   */
  constructor(accounts) {
    this._accounts = accounts;
  }

  /**
   * @param {Object} json
   * @return {Accounts}
   */
  static fromJson(json) {
    const accounts = json.map(j => Account.fromJson(j));
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

class Account extends Entity {

  /**
   * @param {Object} raw
   */
  constructor(raw) {
    super(raw.id_str);
    this._raw = raw;
  }

  /**
   * @param {Object} userJson
   * @return {Account}
   */
  static fromJson(userJson) {
    return new this(userJson);
  }

  /**
   * @return {string}
   */
  get id() {
    return this._raw.id_str;
  }

  /**
   * @returns {Credential}
   */
  get credential() {
    return this._raw.credential;
  }

  /**
   * @return {boolean}
   */
  get isPrimary() {
    return this._raw.is_primary;
  }

  /**
   * @return {boolean}
   */
  get isDummy() {
    return this._raw.id_str == null;
  }

  /**
   * @return {string}
   */
  get profileImageUrl() {
    return this._raw.profile_image_url;
  }

  /**
   * @return {string}
   */
  get screenName() {
    return this._raw.screen_name;
  }

  /**
   * @return {number}
   */
  get tweetCount() {
    return this._raw.statuses_count;
  }

  /**
   * @return {number}
   */
  get followersCount() {
    return this._raw.followers_count;
  }

  /**
   * @return {number}
   */
  get followingCount() {
    return this._raw.friends_count;
  }
}

export { Accounts, Account };
