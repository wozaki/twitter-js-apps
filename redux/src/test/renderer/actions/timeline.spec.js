import sinon from 'sinon'
import * as types from '../../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'
import TimelineUsecase from '../../../main/domain/usecases/TimelineUsecase'
import timelineActions from '../../../main/renderer/actions/timeline'
import { fetchHomeTimeline, fetchOldHomeTimeline } from '../../../main/renderer/actions/timeline'
import * as accountFixture from '../../fixtures/account'

const dummyTwitterClient = {};
const credential         = { accessToken: "test accessToken", accessTokenSecret: "test accessTokenSecret" };
const accounts           = { accounts: [accountFixture.primaryAccount] };

describe('timeline actions', () => {
  function stubUsecase(stub) {
    timelineActions.__Rewire__('twitterAction', (credential, action) => action(dummyTwitterClient));
    timelineActions.__Rewire__('timelineUsecase', (mockTwitterClient) => stub);
  }

  it('fetchHomeTimeline should create REFRESH_HOME_TIMELINE', (done) => {
    const fixtureTweets       = "123";
    const stubTimelineUsecase = sinon.createStubInstance(TimelineUsecase);
    stubTimelineUsecase.fetchHomeTweets
      .withArgs()
      .returns(new Promise((resolve) => resolve(fixtureTweets)));
    stubUsecase(stubTimelineUsecase);

    const expectedActions = [{ type: types.REFRESH_HOME_TIMELINE, tweets: fixtureTweets }];
    const store           = mockStore(accounts, expectedActions, done);
    store.dispatch(fetchHomeTimeline(credential));
  });

  it('fetchHomeTimeline should create RECEIVED_OLD_HOME_TIMELINE', (done) => {
    const fixtureTweets       = "123";
    const maxTweetId          = "543";
    const stubTimelineUsecase = sinon.createStubInstance(TimelineUsecase);
    stubTimelineUsecase.fetchHomeTweetsOlderThan
      .withArgs(maxTweetId)
      .returns(new Promise((resolve) => resolve(fixtureTweets)));
    stubUsecase(stubTimelineUsecase);

    const expectedActions = [
      { type: types.RECEIVED_OLD_HOME_TIMELINE, tweets: fixtureTweets }
    ];
    const store           = mockStore(accounts, expectedActions, done);
    store.dispatch(fetchOldHomeTimeline(maxTweetId));
  });

});
