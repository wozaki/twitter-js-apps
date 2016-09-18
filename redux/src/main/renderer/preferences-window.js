import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import PreferencesContainer from './containers/prefrence/PreferencesContainer'

const store = configureStore();

render(
    <Provider store={store}>
        <PreferencesContainer />
    </Provider>,
    document.getElementById('root')
);
