import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import PreferencesContainer from './containers/prefrence/PreferencesContainer'
import configureStore from './store/configureStore'
import * as registries from './registries/electron'

window.registries = registries;

render(
    <Provider store={configureStore()}>
        <PreferencesContainer />
    </Provider>,
    document.getElementById('root')
);
