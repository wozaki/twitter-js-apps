import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import PreferencesContainer from './containers/prefrence/PreferencesContainer'
import store from './store/configureStore'

render(
    <Provider store={store}>
        <PreferencesContainer />
    </Provider>,
    document.getElementById('root')
);
