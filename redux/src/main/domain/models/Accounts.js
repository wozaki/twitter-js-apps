import _ from 'lodash';
import Entity from './Entity';

class Accounts {
  constructor(accounts) {
    this._accounts = accounts;
  }

  static get dummy() {
    return new Accounts([Account.dummy]);
  }

  get primary() {
    if (this._accounts.length === 1) {
      return _.head(this._accounts);
    }

    return _.chain(this._accounts)
      .filter(account => account.isPrimary)
      .head()
      .value();
  }

  get asArray() {
    return this._accounts;
  }

  refresh(account) {
    const rejected = _.reject(this._accounts, e => e.isDummy || e.equals(account));
    const updatedAccounts = _.concat(rejected, account);
    return new Accounts(updatedAccounts);
  }
}

class Account extends Entity {
  constructor(raw, isPrimary, isDummy) {
    super(raw.id_str);
    this._raw = raw;
    this._isPrimary = isPrimary;
    this._isDummy = isDummy;
  }

  static get dummy() {
    return new Account({}, false, true);
  }

  static fromJson(userJson, isPrimary) {
    return new this(userJson, isPrimary, false);
  }

  get id() {
    return this._raw.id_str;
  }

  get isPrimary() {
    return this._isPrimary && this.isDummy;
  }

  get isDummy() {
    return this._isDummy;
  }

  get profileImageUrl() {
    return this._raw.profile_image_url;
  }

  get screenName() {
    return this._raw.screen_name;
  }

  get tweetCount() {
    return this._raw.statuses_count;
  }

  get followersCount() {
    return this._raw.followers_count;
  }

  get followingCount() {
    return this._raw.friends_count;
  }
}

export { Accounts, Account };
