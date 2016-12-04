import _ from 'lodash';

// https://dev.twitter.com/basics/user-profile-images-and-banners
class ProfileImageUrl {

  /**
   * @param {string} normal_size_url
   */
  constructor(normal_size_url) {
    this._normal_size_url = _.defaultTo(normal_size_url, '');
  }

  /**
   * @return {string}
   */
  get normal() {
    return this._normal_size_url
  }

  /**
   * @return {string}
   */
  get bigger() {
    return this._normal_size_url.replace('_normal', '_bigger');
  }

  /**
   * @return {string}
   */
  get mini() {
    return this._normal_size_url.replace('_normal', '_mini');
  }

  /**
   * @return {string}
   */
  get original() {
    return this._normal_size_url.replace('_normal', '');
  }

}

export default ProfileImageUrl
