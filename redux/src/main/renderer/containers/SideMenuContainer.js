import _ from 'lodash';
import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideMenu from '../components/SideMenu';
import { Accounts } from '../../domain/models/Accounts';
import * as accountActions from '../actions/account';

class SideMenuContainer extends Component {

  onClickedNewTweet() {
    ipcRenderer.send('open-new-tweet-window');
  }

  onClickSubAccount(account) {
    const { switchPrimaryAccountTo } = this.props.actions;
    switchPrimaryAccountTo(account)
  }

  render() {
    const { account, subAccounts } = this.props;

    return (
      <SideMenu
        account={account}
        subAccounts={subAccounts}
        onClickedNewTweet={this.onClickedNewTweet.bind(this)}
        onClickSubAccount={(account) => this.onClickSubAccount(account)}
      />
    );
  }

}

SideMenuContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, accountActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);
