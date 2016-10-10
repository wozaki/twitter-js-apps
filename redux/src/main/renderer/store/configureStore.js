import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'
import { twitterClientMiddleware } from "../middlewares/twitterClient"
import twitterConfig from '../../browser/twitter-config'
import { replaceAccounts } from '../actions/account';

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

  const store = createStore(rootReducer, enhancer);

  subscribeStorage(store);
  return store;
}

//sync store with multi windows
function subscribeStorage(store) {
  function onStorageEvent(storageEvent){
    if (storageEvent.key == KEY_REDUX_LOCAL_STORAGE) {
      if (storageEvent.newValue != storageEvent.oldValue) {
        const updated = JSON.parse(storageEvent.newValue);
        store.dispatch(replaceAccounts(updated.accounts))
      }
    }
  }

  window.addEventListener('storage', onStorageEvent, false);
}
