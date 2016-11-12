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

  getTweets(listId, sinceId) {
    return this.twitterClient.listsStatuses({ listId: listId, sinceId: sinceId });
  }

}

export default ListsUsecase
