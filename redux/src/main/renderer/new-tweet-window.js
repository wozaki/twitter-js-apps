import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import NewTweetContainer from './containers/NewTweetContainer.js'
import configureStore from './store/configureStore'
import * as registries from './registries/electron'

window.registries = registries;

render(
    <Provider store={configureStore(registries)}>
        <NewTweetContainer />
    </Provider>,
    document.getElementById('root')
);
