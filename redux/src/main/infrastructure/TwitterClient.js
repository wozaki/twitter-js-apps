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

  favoritesCreate({ tweetId }) {
    return new Promise((resolve, reject) => {
      this._underlying().post(
        'favorites/create',
        { id: tweetId },
        (error, tweet, response) => {
          resolve({ response, tweet });
        }
      );
    });
  }

  favoritesDestroy({ tweetId }) {
    return new Promise((resolve, reject) => {
      this._underlying().post(
        'favorites/destroy',
        { id: tweetId },
        (error, tweet, response) => {
          resolve({ response, tweet });
        }
      );
    });
  }

  fetchUser() {
    return new Promise((resolve, reject) => {
      this._underlying().get(
        'account/verify_credentials',
        (error, user, response) => {
          resolve({ user, response });
        }
      );
    });
  }

  fetchLists() {
    return new Promise((resolve, reject) => {
      this._underlying().get(
        'lists/list',
        (error, lists, response) => {
          resolve({ lists, response });
        }
      );
    });
  }

  statusesHomeTimeline({ count, sinceId, maxId, trimUser, excludeReplies, contributorDetails, includeEntities }) {
    return new Promise((resolve, reject) => {
      this._underlying().get(
        'statuses/home_timeline',
        {
          count: count,
          since_id: sinceId,
          max_id: maxId,
          trim_user: trimUser,
          exclude_replies: excludeReplies,
          contributor_details: contributorDetails,
          include_entities: includeEntities
        },
        (error, tweets, response) => {
          resolve({ tweets, response });
        }
      );
    });
  }

  fetchListTweets({ listId }) {
    return new Promise((resolve, reject) => {
      this._underlying().get(
        'lists/statuses',
        {
          list_id: listId
        },
        (error, tweets, response) => {
          resolve({ tweets, response });
        }
      );
    });
  }

  postTweet({ text }) {
    return new Promise((resolve, reject) => {
      this._underlying().post(
        'statuses/update',
        {
          status: text
        },
        (error, tweet, response) => {
          resolve({ tweet, response });
        }
      );
    });
  }

  searchTweets({ queryString }) {
    return new Promise((resolve, reject) => {
      this._underlying().get(
        'search/tweets',
        {
          q: queryString
        },
        (error, data, response) => {
          resolve({ tweets: data.statuses, response });
        }
      );
    });
  }

  /*
   * @return {EventEmitter}
   */
  subscribeFilteredStream({ queryString }) {
    const eventEmitter = new EventEmitter();
    this._underlying().stream(
      'statuses/filter',
      {
        track: queryString
      },
      (stream) => {
        stream.on('data', (data) => {
          eventEmitter.emit('tweet', data);
        });
      }
    );
    return eventEmitter;
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
