export default class FavoriteUsecase {

  /**
   * @param {TwitterClient} twitterClient
   */
  constructor(twitterClient) {
    this.twitterClient = twitterClient;
  }

  add(tweetId) {
    return this.twitterClient.favoritesCreate({tweetId});
  }

  remove(tweetId) {
    return this.twitterClient.favoritesDestroy({tweetId});
  }

  getList(myId) {
    return this.twitterClient.favoriteList({ userId: myId });
  }

  getListOlderThan(myId, maxTweetId) {
    return this.twitterClient
      .favoriteList({ userId: myId, maxTweetId: maxTweetId })
      .then(({ tweets }) => {
        const filteredOffsetTweet = tweets.filter(t => t.id_str !== maxTweetId);
        return { tweets: filteredOffsetTweet };
      });
  }

}
