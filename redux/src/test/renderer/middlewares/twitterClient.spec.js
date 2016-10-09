import expect from 'expect'
import { spy } from 'sinon'
import assert from 'assert'
import { twitterClientMiddleware, TwitterAction } from '../../../main/renderer/middlewares/twitterClient'
import TwitterClient from '../../../main/infrastructure/TwitterClient'
import * as accountFixture from '../../fixtures/account'

describe('twitterClientMiddleware', () => {
  const doDispatch = () => {};
  const doGetState = () => {};
  const handler    = twitterClientMiddleware({ consumerKey: "", consumerSecret: "" });

  context('when action is not target', () => {
    const nextHandler = handler({ dispatch: doDispatch, getState: doGetState });
    const actionObj   = { type: 'RECEIVED_FOLLOWING' };

    it('passes action to next without manipulation', (done) => {
      const actionHandler = nextHandler(action => {
        expect(action).toEqual(actionObj);
        done();
      });
      actionHandler(actionObj);
    });

    it('returns value of next', () => {
      const expected      = 'twitter-js-apps';
      const actionHandler = nextHandler(() => expected);

      const outcome = actionHandler();
      expect(outcome).toEqual(expected);
    });

    it('return value of action', () => {
      const expected      = 'rocks';
      const actionHandler = nextHandler();

      const outcome = actionHandler(() => expected);
      expect(outcome).toEqual(expected);
    });
  });


  context('when credential and primaryAccount are undefined', () => {
    const accounts    = { accounts: [accountFixture.subAccount] };
    const nextHandler = handler({
      dispatch: doDispatch,
      getState: () => accounts
    });
    const action      = new TwitterAction({ invoke: ()=> {} });

    it('throws error', (done) => {
      const actionHandler = nextHandler();
      try {
        actionHandler(action);
      } catch (e) {
        done()
      }
    });
  });


  context('when action has credential', () => {
    const next        = spy();
    const accounts    = { accounts: [accountFixture.primaryAccount] };
    const nextHandler = handler({
      dispatch: doDispatch,
      getState: () => accounts
    });
    const credential  = { accessToken: "test accessToken", accessTokenSecret: "test accessTokenSecret" };

    it('calls invoke with passing twitterClient which consists of credential in action', (done) => {
      const expectedTwitterClient = new TwitterClient(
        {
          consumerKey: "",
          consumerSecret: "",
          accessToken: credential.accessToken,
          accessTokenSecret: credential.accessTokenSecret
        }
      );
      const invoke                = (twitterClient, dispatch, getState) => {
        expect(twitterClient).toEqual(expectedTwitterClient);
        done()
      };
      const action                = new TwitterAction({ invoke: invoke, credential });

      nextHandler(next)(action);
      assert(next.calledOnce);
    });
  });


  context('when action does not have credential', () => {
    const next        = spy();
    const accounts    = { accounts: [accountFixture.primaryAccount] };
    const nextHandler = handler({
      dispatch: doDispatch,
      getState: () => accounts
    });

    it('calls invoke with passing twitterClient which consists of credential in primary account', (done) => {
      const invoke = (twitterClient, dispatch, getState) => {
        expect(twitterClient.accessToken).toEqual(accountFixture.primaryAccount.credential.accessToken);
        expect(twitterClient.accessTokenSecret).toEqual(accountFixture.primaryAccount.credential.accessTokenSecret);
        done()
      };
      const action = new TwitterAction({ invoke: invoke });

      nextHandler(next)(action);
      assert(next.calledOnce);
    });
  });

});
