export default class FollowUsecase {

  /**
   * @param {TwitterClient} twitterClient
   */
  constructor(twitterClient) {
    this.twitterClient = twitterClient;
  }

  get defaultCount() {
    return 50;
  }

  /**
   * @param {string} myId
   * @param {number} count
   * @returns {Promise<Object>}
   */
  getFollowing(myId, count = this.defaultCount) {
    return this.twitterClient.friendsList({ userId: myId, count: count });
  }

  /**
   * @param {string} myId
   * @param {string} nextCursor
   * @param {number} count
   * @returns {Promise.<Object>}
   */
  getFollowingOlderThan(myId, nextCursor, count = this.defaultCount) {
    return this.twitterClient.friendsList({ userId: myId, cursor: nextCursor, count: count });
  }

}
