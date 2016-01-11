import _ from 'lodash';
import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as accountActions from '../actions/account';
import * as appActions from '../actions/app';
import * as timelineActions from '../actions/timeline';
import * as tweetActions from '../actions/tweet';

import {twitterClient} from '../registories/registory'
import SideMenuContainer from '../containers/SideMenuContainer';

export default class App extends Component {
    componentDidMount() {
        const {setUp} = this.props.actions;

        setUp();
    }

    render() {
        const {children} = this.props;

        return (
            <div className="application">
                <SideMenuContainer />
                {children}
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
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
