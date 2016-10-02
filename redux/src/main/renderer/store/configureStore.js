import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'
import { twitterClientMiddleware } from "../middlewares/twitterClient"
import twitterConfig from '../../browser/twitter-config'

const KEY_REDUX_LOCAL_STORAGE = "persistent_states";
const persistentStates = ['accounts'];

export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(twitterClientMiddleware(twitterConfig), thunkMiddleware),
    persistState(
      persistentStates,
      {
        key: KEY_REDUX_LOCAL_STORAGE
      }),
  );

  return createStore(rootReducer, enhancer);
}
