import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import { Accounts } from '../../domain/models/Accounts';

class SideMenuContainer extends Component {

  onClickedNewTweet() {
    ipcRenderer.send('open-new-tweet-window');
  }

  render() {
    const { account } = this.props;

    return (
      <SideMenu
        account={account}
        onClickedNewTweet={this.onClickedNewTweet.bind(this)}
      />
    );
  }

}

SideMenuContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { accounts } = state;
  const account = Accounts.fromJson(accounts).primary;

  return {
    account: account
  };
}

export default connect(mapStateToProps)(SideMenuContainer);
