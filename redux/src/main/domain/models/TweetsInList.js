import _ from 'lodash';

class TweetsInList {
  constructor(raw = {}) {
    this.row = raw;
  }

  //TODO: Use Tweet Model
  /**
   * @param {string} listId
   * @return {[Tweet]}
   */
  tweets(listId) {
    const tweets = this.row[listId];
    return _.defaultTo(tweets, []);
  }
}

export default TweetsInList
