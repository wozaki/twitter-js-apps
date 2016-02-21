import expect from 'expect'
import rewire from 'rewire'
import sinon from 'sinon'
import * as types from '../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'
import FollowingUsecase from '../../main/domain/usecases/FollowingUsecase'

let followingActions = rewire('../../main/renderer/actions/following');

describe('following actions', () => {
  function stubUsecase(stub) {
    followingActions.__set__('followingUsecase', stub);
  }

  it('fetchFollowing should create RECEIVED_FOLLOWING action', (done) => {
    const fixtureFollowing = { users: [1, 2, 3] };
    const fixtureMyId = "123";
    const stubFollowingUsecase = sinon.createStubInstance(FollowingUsecase);
    stubFollowingUsecase
      .getFollowing
      .withArgs(fixtureMyId)
      .returns(new Promise((resolve) => resolve(fixtureFollowing)));
    stubUsecase(stubFollowingUsecase);

    const expectedActions = [
      { type: types.RECEIVED_FOLLOWING, following: fixtureFollowing }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(followingActions.fetchFollowing(fixtureMyId));
  });

});
