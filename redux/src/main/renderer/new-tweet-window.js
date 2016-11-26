import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import NewTweetContainer from './containers/NewTweetContainer.js'
import configureStore from './store/configureStore'

render(
    <Provider store={configureStore()}>
        <NewTweetContainer />
    </Provider>,
    document.getElementById('root')
);
