import { EventEmitter } from 'events';
const Twitter = require('twitter');

export default class TwitterClient {
  constructor({ accessToken, accessTokenSecret, consumerKey, consumerSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  _underlying() {
    if (!this.underlying) {
      this.underlying = new Twitter({
        access_token_key: this.accessToken,
        access_token_secret: this.accessTokenSecret,
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret
      });
    }
    return this.underlying;
  }

  _requestWith(method) {
    return new Promise((resolve, reject) => {
      method((errors, entities) => {
          if (errors !== null) {
            const error = errors[0];
            reject(error);
          } else {
            resolve(entities);
          }
        }
      );
    });
  }

  _get(path, params = {}) {
    return this._requestWith((callback) => this._underlying().get(path, params, callback));
  }

  _post(path, params) {
    return this._requestWith((callback) => this._underlying().post(path, params, callback));
  }

  favoritesCreate({ tweetId }) {
    return this._post(
      'favorites/create',
      { id: tweetId }
    );
  }

  favoritesDestroy({ tweetId }) {
    return this._post(
      'favorites/destroy',
      { id: tweetId }
    );
  }

  favoriteList({ userId, screenName, count, sinceTweetId, maxTweetId, includeEntities }) {
    return this._get(
      'favorites/list',
      {
        user_id: userId,
        screen_name: screenName,
        count: count,
        since_id: sinceTweetId,
        max_id: maxTweetId,
        include_entities: includeEntities
      });
  }

  fetchUser() {
    return this._get(
      'account/verify_credentials'
    );
  }

  /**
   * https://dev.twitter.com/rest/reference/get/friends/list
   *
   * @param {string} userId
   * @param {string|undefined} screenName
   * @param {string|undefined} cursor
   * @param {number|undefined} count
   * @param {boolean|undefined} skipStatus
   * @param {boolean|undefined} includeEntities
   * @returns {Promise<Object>} following
   */
  friendsList({ userId, screenName, cursor, count, skipStatus, includeEntities }) {
    return this._get(
      'friends/list',
      {
        user_id: userId,
        screen_name: screenName,
        cursor: cursor,
        count: count,
        skipStatus: skipStatus,
        include_entities: includeEntities
      });
  }

  /**
   * https://dev.twitter.com/rest/reference/get/followers/list
   *
   * @param {string} userId
   * @param {string|undefined} screenName
   * @param {string|undefined} cursor
   * @param {number|undefined} count
   * @param {boolean|undefined} skipStatus
   * @param {boolean|undefined} includeEntities
   * @returns {Promise<Object>} following
   */
  followersList({ userId, screenName, cursor, count, skipStatus, includeEntities }) {
    return this._get(
      'followers/list',
      {
        user_id: userId,
        screen_name: screenName,
        cursor: cursor,
        count: count,
        skipStatus: skipStatus,
        include_entities: includeEntities
      });
  }

  /**
   * https://dev.twitter.com/rest/reference/get/lists/ownerships
   *
   * @param userId
   * @param screenName
   * @param count
   * @param cursor
   * @return {Promise<Object>}
   */
  listsOwnership({ userId, screenName, count, cursor }) {
    return this._get(
      'lists/ownerships',
      {
        user_id: userId,
        screen_name: screenName,
        count: count,
        cursor: cursor
      });
  }

  statusesHomeTimeline({ count, sinceId, maxId, trimUser, excludeReplies, contributorDetails, includeEntities }) {
    return this._get(
      'statuses/home_timeline',
      {
        count: count,
        since_id: sinceId,
        max_id: maxId,
        trim_user: trimUser,
        exclude_replies: excludeReplies,
        contributor_details: contributorDetails,
        include_entities: includeEntities
      });
  }

  statusesUserTimeline({ userId, screenName, sinceId, count, maxId, trimUser, excludeReplies, contributorDetails, includeRts }) {
    return this._get(
      'statuses/user_timeline',
      {
        user_id: userId,
        screen_name: screenName,
        since_id: sinceId,
        count: count,
        max_id: maxId,
        trim_user: trimUser,
        exclude_replies: excludeReplies,
        contributor_details: contributorDetails,
        include_rts: includeRts
      });
  }

  statusesUpdate({ text }) {
    return this._post(
      'statuses/update',
      {
        status: text
      }
    );
  }

  /**
   * @param userId {string}
   * @returns {EventEmitter}
   */
  subscribeUserStream(userId) {
    const eventEmitter = new EventEmitter();
    this._underlying().stream(
      'user',
      (stream) => {
        stream.on('follow', (data) => {
          eventEmitter.emit('follow', data);
        });
        stream.on('block', (data) => {
          eventEmitter.emit('block', data);
        });
        stream.on('favorite', (data) => {
          if (data.source.id_str !== userId) {
            eventEmitter.emit('favorite', data);
          }
        });
        stream.on('list_created', (data) => {
          eventEmitter.emit('list_created', data);
        });
        stream.on('list_destroyed', (data) => {
          eventEmitter.emit('list_destroyed', data);
        });
        stream.on('list_member_added', (data) => {
          eventEmitter.emit('list_member_added', data);
        });
        stream.on('list_member_removed', (data) => {
          eventEmitter.emit('list_member_removed', data);
        });
        stream.on('list_updated', (data) => {
          eventEmitter.emit('list_updated', data);
        });
        stream.on('list_user_subscribed', (data) => {
          eventEmitter.emit('list_user_subscribed', data);
        });
        stream.on('list_user_unsubscribed', (data) => {
          eventEmitter.emit('list_user_unsubscribed', data);
        });
        stream.on('unblock', (data) => {
          eventEmitter.emit('unblock', data);
        });
        stream.on('unfavorite', (data) => {
          eventEmitter.emit('unfavorite', data);
        });
        stream.on('user_update', (data) => {
          eventEmitter.emit('user_update', data);
        });
        stream.on('data', (data) => {
          if (data.friends) {
            eventEmitter.emit('friends', data);
          } else if (data.event) {
          } else if (data.delete) {
            eventEmitter.emit('delete', data);
          } else if (data.created_at) {
            if (data.retweeted_status && data.retweeted_status.user.id_str === userId) {
              eventEmitter.emit('retweet', data);
            }
            eventEmitter.emit('tweet', data);
          }
        });
      }
    );
    return eventEmitter;
  }

}
