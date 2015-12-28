import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchAccount} from '../actions/account'
import SideMenu from '../components/SideMenu';
import {twitterClient} from '../registories/registory'

export default class App extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccount());
    }

    render() {
        return (
            <div className="application">
                <SideMenu
                    account={this.props.account}
                    />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {account} = state;
    return {
        account: account
    }
}

export default connect(mapStateToProps)(App)
