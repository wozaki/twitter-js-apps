import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import { Accounts } from '../../domain/models/Accounts';

class SideMenuContainer extends Component {

  onClickedNewTweet() {
    ipcRenderer.send('open-new-tweet-window');
  }

  onClickSubAccount() {
    //TODO
    console.log('onClickSubAccount!!');
  }

  render() {
    const { account, subAccounts } = this.props;

    return (
      <SideMenu
        account={account}
        subAccounts={subAccounts}
        onClickedNewTweet={this.onClickedNewTweet.bind(this)}
        onClickSubAccount={this.onClickSubAccount.bind(this)}
      />
    );
  }

}

SideMenuContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { accounts } = state;
  const _accounts = Accounts.fromJson(accounts);
  const account = _accounts.primary;
  const subAccounts = _accounts.subAccounts;

  return {
    account: account,
    subAccounts: subAccounts,
  };
}

export default connect(mapStateToProps)(SideMenuContainer);
