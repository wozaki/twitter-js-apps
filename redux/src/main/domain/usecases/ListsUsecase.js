class ListsUsecase {

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
  getOwnLists(myId, count = 50) {
    return this.twitterClient.listsOwnership({ userId: myId, count: count });
  }

  getTweets(listId) {
    return this.twitterClient.listsStatuses({ listId: listId });
  }

  getOlderTweets(listId, maxTweetId) {
    return this.twitterClient
      .listsStatuses({ listId: listId, maxId: maxTweetId })
      .then(tweets => {
        return tweets.filter(t => t.id_str !== maxTweetId);
      });
  }

}

export default ListsUsecase
