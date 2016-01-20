import expect from 'expect'
import rewire from 'rewire'
import sinon from 'sinon'
import * as types from '../../main/renderer/constants/ActionTypes'
import mockStore from '../action-helper'

let favoriteActions = rewire('../../main/renderer/actions/favorite');

describe('favorite actions', () => {
    function stubTwitterClient(stub) {
        favoriteActions.__set__('twitterClient', stub);
    }

    it('toggleFavorite should create DESTROYED_FAVORITE action if current status is favorite', (done) => {
        const tweetClientStub = {
            unfavorite: () => new Promise((resolve) => resolve({tweet: "123"}))
        };
        stubTwitterClient(tweetClientStub);

        const expectedActions = [
            {type: types.DESTROYED_FAVORITE, tweet: "123"}
        ];
        const store = mockStore({tweet: 0}, expectedActions, done);
        store.dispatch(favoriteActions.toggleFavorite(true, "123"));
    });

    it('toggleFavorite should create DESTROYED_FAVORITE action if current status is unfavorite', (done) => {
        const tweetClientStub = {
            favorite: () => new Promise((resolve) => resolve({tweet: "123"}))
        };
        stubTwitterClient(tweetClientStub);

        const expectedActions = [
            {type: types.CREATED_FAVORITE, tweet: "123"}
        ];
        const store = mockStore({tweet: 0}, expectedActions, done);
        store.dispatch(favoriteActions.toggleFavorite(false, "123"));
    });
});
