import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import NewTweetContainer from './containers/NewTweetContainer.js'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <NewTweetContainer />
    </Provider>,
    document.getElementById('root')
);
