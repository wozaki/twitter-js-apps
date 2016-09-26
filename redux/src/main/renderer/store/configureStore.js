import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'

const KEY_REDUX_LOCAL_STORAGE = "persistent_states";
const persistentStates = ['accounts'];
const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  persistState(
    persistentStates,
    {
      key: KEY_REDUX_LOCAL_STORAGE
    }),
);
const store = createStore(rootReducer, enhancer);

export default store
