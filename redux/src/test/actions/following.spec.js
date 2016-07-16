import expect from 'expect'
import rewire from 'rewire'
import sinon from 'sinon'
import * as types from '../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'
import FollowUsecase from '../../main/domain/usecases/FollowUsecase'

let followingActions = rewire('../../main/renderer/actions/following');

describe('following actions', () => {
  function stubUsecase(stub) {
    followingActions.__set__('followUsecase', stub);
  }

  it('fetchFollowing should create RECEIVED_FOLLOWING action', (done) => {
    const fixtureFollowing = { users: [1, 2, 3] };
    const fixtureMyId = "123";
    const stubFollowUsecase = sinon.createStubInstance(FollowUsecase);
    stubFollowUsecase
      .getFollowing
      .withArgs(fixtureMyId)
      .returns(new Promise((resolve) => resolve(fixtureFollowing)));
    stubUsecase(stubFollowUsecase);

    const expectedActions = [
      { type: types.RECEIVED_FOLLOWING, following: fixtureFollowing }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(followingActions.fetchFollowing(fixtureMyId));
  });

});
