import _ from 'lodash';
import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as accountActions from '../actions/account';

//TODO:
export default class AccountInfo extends Component {
    componentDidMount() {
    }

    render() {
        const {account} = this.props;

        return (
            <div className="application2">
            </div>
        );
    }
}

AccountInfo.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    const actions = _.assign({});
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
