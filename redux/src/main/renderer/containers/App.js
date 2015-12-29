import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchAccount} from '../actions/account'
import {fetchHomeTimeline} from '../actions/timeline'
import SideMenu from '../components/SideMenu';
import Main from '../components/Main';
import {twitterClient} from '../registories/registory'

export default class App extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccount());
        dispatch(fetchHomeTimeline());
    }

    render() {
        return (
            <div className="application">
                <SideMenu
                    account={this.props.account}
                    />
                <Main
                    homeTimeline={this.props.tweets}
                    />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {account, timeline} = state;
    return {
        account: account,
        tweets: timeline
    }
}

export default connect(mapStateToProps)(App)
