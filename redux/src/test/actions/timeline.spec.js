import expect from 'expect'
import sinon from 'sinon'
import rewire from 'rewire'
import * as types from '../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'
import TimelineUsecase from '../../main/domain/usecases/TimelineUsecase'

let timelineActions = rewire('../../main/renderer/actions/timeline');

describe('timeline actions', () => {
  function stubUsecase(stub) {
    timelineActions.__set__('timelineUsecase', stub);
  }

  it('fetchHomeTimeline should create RECEIVED_HOME_TIMELINE', (done) => {
    const fixtureTweets = "123";
    const stubTimelineUsecase = sinon.createStubInstance(TimelineUsecase);
    stubTimelineUsecase.fetchHomeTweets
      .withArgs()
      .returns(new Promise((resolve) => resolve({ tweets: fixtureTweets })));
    stubUsecase(stubTimelineUsecase);

    const expectedActions = [
      { type: types.RECEIVED_HOME_TIMELINE, tweets: fixtureTweets }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(timelineActions.fetchHomeTimeline());
  });

  it('fetchHomeTimeline should create RECEIVED_OLD_HOME_TIMELINE', (done) => {
    const fixtureTweets = "123";
    const maxTweetId = "543";
    const stubTimelineUsecase = sinon.createStubInstance(TimelineUsecase);
    stubTimelineUsecase.fetchHomeTweetsOlderThan
      .withArgs(maxTweetId)
      .returns(new Promise((resolve) => resolve({ tweets: fixtureTweets })));
    stubUsecase(stubTimelineUsecase);

    const expectedActions = [
      { type: types.RECEIVED_OLD_HOME_TIMELINE, tweets: fixtureTweets }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(timelineActions.fetchOldHomeTimeline(maxTweetId));
  });

});
