import _ from 'lodash';

// https://dev.twitter.com/overview/api/entities
class UrlEntity {

  /**
   * @param {object} object
   */
  constructor(object) {
    this._object = object;
  }

  /**
   * @return {string|undefined}
   */
  get forDisplay() {
    return _.get(this._object, 'display_url');
  }

  /**
   * @return {string|undefined}
   */
  get expanded() {
    return _.get(this._object, 'expanded_url');
  }

  /**
   * @return {string|undefined} `t.co` link
   */
  get wrapped() {
    return _.get(this._object, 'url');
  }

}

export default UrlEntity
