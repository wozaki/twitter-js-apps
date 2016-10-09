import _ from 'lodash';
import sinon from 'sinon'
import * as types from '../../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'
import FavoriteUsecase from '../../../main/domain/usecases/FavoriteUsecase'
import favoriteActions from '../../../main/renderer/actions/favorite'
import { toggleFavorite } from '../../../main/renderer/actions/favorite'
import * as accountFixture from '../../fixtures/account'

const accounts = { accounts: [accountFixture.primaryAccount] };

describe('favorite actions', () => {
  function stubUsecase(stub) {
    favoriteActions.__Rewire__('favoriteUsecase', (mockTwitterClient) => stub);
  }

  const fixtureTweet = { id_str: "123", text: "hoge" };

  it('toggleFavorite should create DESTROYED_FAVORITE action if current status is favorite', (done) => {
    const stubFavoriteUsecase = sinon.createStubInstance(FavoriteUsecase);
    stubFavoriteUsecase
      .remove
      .withArgs(fixtureTweet.id_str)
      .returns(new Promise((resolve) => resolve(fixtureTweet)));
    stubUsecase(stubFavoriteUsecase);

    const expectedActions = [
      { type: types.DESTROYED_FAVORITE, tweet: fixtureTweet }
    ];
    const store = mockStore(accounts, expectedActions, done);
    store.dispatch(toggleFavorite(true, fixtureTweet.id_str));
  });

  it('toggleFavorite should create DESTROYED_FAVORITE action if current status is unfavorite', (done) => {
    const stubFavoriteUsecase = sinon.createStubInstance(FavoriteUsecase);
    stubFavoriteUsecase
      .add
      .withArgs(fixtureTweet.id_str)
      .returns(new Promise((resolve) => resolve(fixtureTweet)));
    stubUsecase(stubFavoriteUsecase);

    const expectedActions = [
      { type: types.CREATED_FAVORITE, tweet: fixtureTweet }
    ];
    const store = mockStore(_.assign(accounts, { tweet: 0 }), expectedActions, done);
    store.dispatch(toggleFavorite(false, fixtureTweet.id_str));
  });
});
