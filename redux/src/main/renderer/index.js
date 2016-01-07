import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={App}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
