import _ from 'lodash';
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as accountActions from '../actions/account';
import * as appActions from '../actions/app';
import * as timelineActions from '../actions/timeline';
import * as tweetActions from '../actions/tweet';

import {twitterClient} from '../registories/registory'
import SideMenu from '../components/SideMenu';
import Header from '../components/Header'
import Editor from '../components/Editor'
import TweetsContainer from '../containers/TweetsContainer'

export default class App extends Component {
    componentDidMount() {
        const {setUp} = this.props.actions;

        setUp();
    }

    render() {
        const {account} = this.props;
        const {postTweet} = this.props.actions;

        return (
            <div className="application">
                <SideMenu
                    account={account}
                    />
                <main className="main">
                    <Header title={this.title}/>
                    <Editor key="editor" onTweetSubmitted={postTweet}/>
                    <TweetsContainer />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    const actions = _.assign({}, appActions, tweetActions);
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

function mapStateToProps(state) {
    const {account} = state;
    return {
        account: account
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
