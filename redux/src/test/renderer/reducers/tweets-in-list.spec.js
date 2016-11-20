import expect from 'expect'
import { spy } from 'sinon'
import * as tweetFixture from '../../fixtures/tweet'
import * as types from '../../../main/renderer/constants/ActionTypes';
import reducer from '../../../main/renderer/reducers/tweets-in-list'

describe('tweets in list reducer', () => {
  const initialState = {};
  const listId       = "123456789";

  describe('RECEIVED_FIRST_TWEETS_IN_LIST', () => {
    context("when receiving the action for the first time", () => {
      it('returns tweets with listId', () => {
        const actual = reducer(initialState, {
          type: types.RECEIVED_FIRST_TWEETS_IN_LIST,
          tweets: [tweetFixture.tweet1],
          listId: listId
        });
        expect(actual[listId]).toEqual([tweetFixture.tweet1]);
      });
    });

    context("when the same list's tweets exist", () => {
      const otherListTweets = { listId: [tweetFixture.tweet1] };
      it('returns refreshed tweets with listId', () => {
        const actual = reducer(otherListTweets, {
          type: types.RECEIVED_FIRST_TWEETS_IN_LIST,
          tweets: [tweetFixture.tweet2],
          listId: listId
        });
        expect(actual[listId]).toEqual([tweetFixture.tweet2]);
      });
    });

    context("when other list's tweets exist", () => {
      const otherListTweets = { "123": [tweetFixture.tweet1] };
      it('returns tweets with listId', () => {
        const actual = reducer(otherListTweets, {
          type: types.RECEIVED_FIRST_TWEETS_IN_LIST,
          tweets: [tweetFixture.tweet1],
          listId: listId
        });
        expect(actual[listId]).toEqual([tweetFixture.tweet1]);
      });
    });
  });


  describe('RECEIVED_OLDER_TWEETS_IN_LIST', () => {
    context("when the same list's tweets exist", () => {
      const otherListTweets = { [listId]: [tweetFixture.tweet1] };
      it('returns concatenated tweets with listId', () => {
        const actual = reducer(otherListTweets, {
          type: types.RECEIVED_OLDER_TWEETS_IN_LIST,
          tweets: [tweetFixture.tweet2],
          listId: listId
        });
        expect(actual[listId]).toEqual([tweetFixture.tweet1, tweetFixture.tweet2]);
      });
    });

    context("when other list's tweets exist", () => {
      const otherListTweetsId = "123";
      const otherListTweets  = { [otherListTweetsId]: [tweetFixture.tweet1] };

      it('returns tweets with listId', () => {
        const actual = reducer(otherListTweets, {
          type: types.RECEIVED_OLDER_TWEETS_IN_LIST,
          tweets: [tweetFixture.tweet1],
          listId: listId
        });
        expect(actual[listId]).toEqual([tweetFixture.tweet1]);
      });

      it("keeps other list's tweets", () => {
        const actual = reducer(otherListTweets, {
          type: types.RECEIVED_OLDER_TWEETS_IN_LIST,
          tweets: [tweetFixture.tweet1],
          listId: listId
        });
        expect(actual[otherListTweetsId]).toEqual(otherListTweets[otherListTweetsId]);
      });
    });
  });


  describe('other type', () => {
    it('returns initialState', () => {
      const actual = reducer(initialState, {
        type: types.ADD_ERROR_MESSAGE,
        tweets: [tweetFixture.tweet1],
        listId: listId
      });
      expect(actual).toEqual(initialState);
    });
  });

});
