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
    return this.twitterClient.statusesHomeTimeline({ maxId: maxTweetId });
  }

}

