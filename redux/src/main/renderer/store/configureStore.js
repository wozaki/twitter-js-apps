import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'

const KEY_STORE_LOCAL_STORAGE = "store_local_storage";
const persistentStates = ['account'];

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  persistState(persistentStates, { key: KEY_STORE_LOCAL_STORAGE }),
);
const store = createStore(rootReducer, enhancer);

export default store
