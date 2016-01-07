import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import AccountInfo from './containers/AccountInfo'
import App from './containers/App'
import Home from './containers/Home'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path='/account-info' component={AccountInfo}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
