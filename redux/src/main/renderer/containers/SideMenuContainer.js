import {ipcRenderer} from 'electron'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import SideMenu from '../components/SideMenu'

class SideMenuContainer extends Component {
    render() {
        const {account} = this.props;

        return (
            <SideMenu
                account={account}
                onClickedNewTweet={this.onClickedNewTweet.bind(this)}
                />
        );
    }

    onClickedNewTweet() {
        ipcRenderer.send('open-new-tweet-window');
    }

}

SideMenuContainer.propTypes = {
    account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {account} = state;
    return {
        account: account
    }
}

export default connect(mapStateToProps)(SideMenuContainer)
