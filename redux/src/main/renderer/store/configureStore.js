import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  persistState(),
);
const store = createStore(rootReducer, enhancer);

export default store
