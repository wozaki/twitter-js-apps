import _ from 'lodash';
import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tweetActions from '../actions/tweet';
import Header from '../components/Header'
import Editor from '../components/Editor'
import TweetsContainer from '../containers/TweetsContainer'

export default class Home extends Component {
    render() {
        const {postTweet} = this.props.actions;

        return (
            <main className="main">
                <Header title={this.title}/>
                <Editor key="editor" onTweetSubmitted={postTweet}/>
                <TweetsContainer />
            </main>
        );
    }
}

Home.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    const actions = _.assign({}, tweetActions);
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
