import sinon from 'sinon'
import * as types from '../../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'
import FollowUsecase from '../../../main/domain/usecases/FollowUsecase'
import followingActions from '../../../main/renderer/actions/following'
import { fetchFollowing } from '../../../main/renderer/actions/following'
import * as accountFixture from '../../fixtures/account'

const accounts = { accounts: [accountFixture.primaryAccount] };

describe('following actions', () => {
  function stubUsecase(stub) {
    followingActions.__Rewire__('followUsecase', (mockTwitterClient) => stub);
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
      { type: types.RECEIVED_FOLLOWING, userId: fixtureMyId, following: fixtureFollowing }
    ];
    const store = mockStore(accounts, expectedActions, done);
    store.dispatch(fetchFollowing(fixtureMyId));
  });

});
