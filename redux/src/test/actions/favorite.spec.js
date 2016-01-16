import expect from 'expect'
import rewire from 'rewire'
import sinon from 'sinon'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as types from '../../main/renderer/constants/ActionTypes'

let favoriteActions = rewire('../../main/renderer/actions/favorite');

const middlewares = [thunk];
function mockStore(getState, expectedActions, onLastAction) {
    if (!Array.isArray(expectedActions)) {
        throw new Error('expectedActions should be an array of expected actions.')
    }
    if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
        throw new Error('onLastAction should either be undefined or function.')
    }

    function mockStoreWithoutMiddleware() {
        return {
            getState() {
                return typeof getState === 'function' ?
                    getState() :
                    getState
            },

            dispatch(action) {
                const expectedAction = expectedActions.shift();
                expect(action).toEqual(expectedAction);
                if (onLastAction && !expectedActions.length) {
                    onLastAction()
                }
                return action
            }
        }
    }

    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware);

    return mockStoreWithMiddleware()
}

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
