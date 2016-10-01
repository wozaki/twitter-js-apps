import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'
import { twitterClientMiddleware } from "../middlewares/twitterClient"

const KEY_REDUX_LOCAL_STORAGE = "persistent_states";
const persistentStates = ['accounts'];

export default function configureStore(registries) {
  const enhancer = compose(
    applyMiddleware(twitterClientMiddleware(registries.twitterCredential), thunkMiddleware),
    persistState(
      persistentStates,
      {
        key: KEY_REDUX_LOCAL_STORAGE
      }),
  );

  return createStore(rootReducer, enhancer);
}
