export default class FollowingUsecase {

  /**
   * @param {TwitterClient} twitterClient
   */
  constructor(twitterClient) {
    this.twitterClient = twitterClient;
  }

  /**
   * @param {string} myId
   * @param {number} count
   * @returns {Promise<Object>}
   */
  getFollowing(myId, count) {
    return this.twitterClient.friendsList({ userId: myId, count: count });
  }

}
