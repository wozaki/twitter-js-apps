import _ from 'lodash';
import { Accounts } from '../../domain/models/Accounts'
import TwitterClient from '../../infrastructure/TwitterClient'

export class TwitterAction {
  constructor({ invoke, credential }) {
    if (!_.isFunction(invoke)) {
      throw Error("invoke must be function");
    }

    this.invoke     = invoke;
    this.credential = credential;
  }
}

//TODO: remove consumerSecret
export const twitterClientMiddleware = ({ consumerKey, consumerSecret }) => ({ dispatch, getState }) => {
  return next => action => {

    if (!isTargetAction(action)) {
      if (_.isUndefined(next)) {
        return action(dispatch, getState);
      } else {
        return next(action);
      }
    }

    const { invoke, credential } = action;
    const { accounts }           = getState();
    const primaryAccount         = Accounts.fromObjects(accounts).primary;

    if (_.isUndefined(credential) && _.isUndefined(primaryAccount)) {
      throw Error("please pass credential if primary account doesn't exist");
    }

    const realCredential                     = _.defaultTo(credential, primaryAccount.credential);
    const { accessToken, accessTokenSecret } = realCredential;
    const twitterClient                      = new TwitterClient(
      {
        consumerKey: consumerKey,
        consumerSecret: consumerSecret,
        accessToken: accessToken,
        accessTokenSecret: accessTokenSecret
      }
    );

    next(invoke(twitterClient, dispatch, getState));
  }
};

function isTargetAction(action) {
  return action instanceof TwitterAction;
}
