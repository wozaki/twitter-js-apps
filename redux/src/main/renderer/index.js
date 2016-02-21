import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import AccountInfo from './containers/AccountInfoContainer'
import FavoritesContainer from './containers/FavoritesContainer'
import MyTimelineContainer from './containers/MyTimelineContainer'
import App from './containers/App'
import Following from './containers/FollowingContainer'
import HomeContainer from './containers/HomeContainer.js'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={HomeContainer}/>
                <Route path='/account-info' component={AccountInfo}/>
                <Route path='/favorites' component={FavoritesContainer}/>
                <Route path='/my-timeline' component={MyTimelineContainer}/>
                <Route path='/followings' component={Following}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
