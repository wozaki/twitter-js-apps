import _ from 'lodash';
import Entity from './Entity';

class Accounts {
  constructor(accounts) {
    this._accounts = accounts;
  }

  static fromJson(json) {
    const accounts = json.map(j => Account.fromJson(j));
    return new Accounts(accounts);
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
}

class Account extends Entity {
  constructor(raw) {
    super(raw.id_str);
    this._raw = raw;
  }

  static fromJson(userJson) {
    return new this(userJson);
  }

  get id() {
    return this._raw.id_str;
  }

  get isPrimary() {
    return this._raw.is_primary;
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
