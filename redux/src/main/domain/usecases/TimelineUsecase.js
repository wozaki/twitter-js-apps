export default class TimelineUsecase {

  /**
   * @param {TwitterClient} twitterClient
   */
  constructor(twitterClient) {
    this.twitterClient = twitterClient;
  }

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

}

