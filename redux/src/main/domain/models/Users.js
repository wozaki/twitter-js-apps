import _ from 'lodash';
import ProfileImageUrl from './ProfileImageUrl';
import UrlEntity from './UrlEntity';

class Users {

  /**
   * @param {Users[]} users
   */
  constructor(users) {
    this._users = users;
  }

  /**
   * @param {Object[]} objects
   * @return {Users}
   */
  static fromObjects(objects) {
    const users = _.isEmpty(objects)
      ? [User.dummy]
      : objects.map(User.fromObject);
    return new Users(users);
  }

  /**
   * @param {string} userId
   * @return {User}
   */
  find(userId) {
    const candidate = _.find(this._users, u => u.id == userId);
    return _.defaultTo(candidate, User.dummy);
  }
}

const dummyObject = {
  id_str: null,
  credential: null,
  followers_count: null,
  following: null,
  friends_count: null,
  description: null,
  name: null,
  profile_image_url: null,
  protected: null,
  screen_name: null,
  statuses_count: null,
  location: null,
  entities: null,
};

class User {

  /**
   * @param {Object} object
   */
  constructor(object) {
    this._object = object;
  }

  /**
   * @param {Object} object
   * @return {User}
   */
  static fromObject(object) {
    return new User(object);
  }

  /**
   * @return {User}
   */
  static get dummy() {
    return new User(dummyObject);
  }

  /**
   * @return {string}
   */
  get id() {
    return this._object.id_str;
  }

  /**
   * @return {boolean}
   */
  get isDummy() {
    return this._object.id_str == null;
  }

  /**
   * @return {ProfileImageUrl}
   */
  get profileImageUrl() {
    return new ProfileImageUrl(this._object.profile_image_url);
  }

  /**
   * @return {string}
   */
  get screenName() {
    return this._object.screen_name;
  }

  /**
   * @return {string}
   */
  get screenNameWithAt() {
    return _.isNull(this.screenName) ? '' : "@" + this.screenName
  }

  /**
   * @return {string}
   */
  get name() {
    return this._object.name;
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

  /**
   * @return {string}
   */
  get description() {
    return this._object.description;
  }

  /**
   * @return {UrlEntity}
   */
  get url() {
    const url = _.get(this._object.entities, 'url.urls[0]');
    return new UrlEntity(url);
  }

  /**
   * @return {string}
   */
  get location() {
    return this._object.location;
  }

}

export { Users, User };
