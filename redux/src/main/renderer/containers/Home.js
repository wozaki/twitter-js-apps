import _ from 'lodash';
import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import TweetsContainer from '../containers/TweetsContainer'

export default class Home extends Component {
    render() {
        return (
            <main className="main">
                <Header title={this.title}/>
                <TweetsContainer />
            </main>
        );
    }
}

Home.propTypes = {
    account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {account} = state;
    return {
        account: account
    }
}

export default connect(mapStateToProps)(Home)
