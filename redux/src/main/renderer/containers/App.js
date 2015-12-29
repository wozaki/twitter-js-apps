import _ from 'lodash';
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as accountActions from '../actions/account';
import * as timelineActions from '../actions/timeline';
import * as tweetActions from '../actions/tweet';

import {twitterClient} from '../registories/registory'
import SideMenu from '../components/SideMenu';
import Tweets from '../components/Tweets'
import Header from '../components/Header'
import Editor from '../components/Editor'

export default class App extends Component {
    componentDidMount() {
        const {fetchAccount, fetchHomeTimeline} = this.props.actions;

        fetchAccount();
        fetchHomeTimeline();
    }

    render() {
        const {account, tweets} = this.props;
        const {postTweet} = this.props.actions;

        return (
            <div className="application">
                <SideMenu
                    account={account}
                    />
                <main className="main">
                    <Header title={this.title}/>
                    <Editor key="editor" onTweetSubmitted={postTweet}/>
                    <Tweets
                        tweets={tweets}
                        />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    const actions = _.assign({}, accountActions, timelineActions, tweetActions);
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

function mapStateToProps(state) {
    const {account, timeline} = state;
    return {
        account: account,
        tweets: timeline
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
