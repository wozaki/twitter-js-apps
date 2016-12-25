export default class TimelineUsecase {

  /**
   * @param {TwitterClient} twitterClient
   */
  constructor(twitterClient) {
    this.twitterClient = twitterClient;
  }

  //TODO: rename fetch to get

  fetchHomeTweets() {
    return this.twitterClient.statusesHomeTimeline({});
  }

  fetchHomeTweetsOlderThan(maxTweetId) {
    return this.twitterClient
      .statusesHomeTimeline({ maxId: maxTweetId })
      .then(tweets => {
        return tweets.filter(t => t.id_str !== maxTweetId);
      });
  }

  /**
   * @param {string} userId
   * @return {Promise.<Object>}
   */
  getUserTweets(userId) {
    return this.twitterClient.statusesUserTimeline({ userId })
  }

  /**
   * @param {string} userId
   * @param {string} maxTweetId
   * @return {Promise.<Object>}
   */
  getTweetsOlderThan(userId, maxTweetId) {
    return this.twitterClient
      .statusesUserTimeline({ userId, maxId: maxTweetId })
      .then(tweets => {
        return tweets.filter(t => t.id_str !== maxTweetId);
      });
  }

}

