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
      .then(({ tweets }) => {
        const filteredOffsetTweet = tweets.filter(t => t.id_str !== maxTweetId);
        return { tweets: filteredOffsetTweet };
      });
  }

  getMyTweets() {
    return this.twitterClient.statusesUserTimeline({})
  }

  getMyTweetsOlderThan(maxTweetId) {
    return this.twitterClient
      .statusesUserTimeline({ maxId: maxTweetId })
      .then(({ tweets }) => {
        const filteredOffsetTweet = tweets.filter(t => t.id_str !== maxTweetId);
        return { tweets: filteredOffsetTweet };
      });
  }

}

