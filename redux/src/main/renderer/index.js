import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FavoritesContainer from './containers/FavoritesContainer'
import ListsContainer from './containers/ListsContainer'
import TweetsInListContainer from './containers/TweetsInListContainer'
import App from './containers/AppContainer'
import Followers from './containers/FollowersContainer'
import Following from './containers/FollowingContainer'
import HomeContainer from './containers/HomeContainer.js'
import UserDetailContainer from './containers/UserDetailContainer'
import UserTimelineContainer from './containers/UserTimelineContainer'
import configureStore from './store/configureStore'

render(
    <Provider store={configureStore()}>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={HomeContainer}/>
                    <Route path='/favorites' component={FavoritesContainer}/>
                    <Route path='/lists' component={ListsContainer}/>
                    <Route path='/lists/:listId/tweets' component={TweetsInListContainer}/>
                    <Route path='/users/:userId' component={UserDetailContainer}/>
                    <Route path='/users/:userId/followers' component={Followers}/>
                    <Route path='/users/:userId/following' component={Following}/>
                    <Route path='/users/:userId/tweets' component={UserTimelineContainer}/>
                </Switch>
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
);
