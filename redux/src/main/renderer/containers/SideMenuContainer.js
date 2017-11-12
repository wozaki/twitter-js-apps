import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideMenu from '../components/SideMenu';
import { Accounts } from '../../domain/models/Accounts';
import * as accountActions from '../actions/account';
import * as modalActions from '../actions/modal';

class SideMenuContainer extends Component {

  onClickSubAccount(account) {
    const { switchPrimaryAccountTo } = this.props.actions;
    switchPrimaryAccountTo(account)
  }

  onClickColumn() {
    const { showModal } = this.props.actions;
    showModal('ListSelectModal')
  }

  render() {
    const { account, subAccounts } = this.props;

    return (
      <SideMenu
        account={account}
        subAccounts={subAccounts}
        onClickSubAccount={(account) => this.onClickSubAccount(account)}
        onClickColumn={() => this.onClickColumn()}
      />
    );
  }

}

SideMenuContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, accountActions, modalActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { accounts } = state;
  const _accounts = Accounts.fromObjects(accounts);
  const account = _accounts.primary;
  const subAccounts = _accounts.subAccounts;

  return {
    account: account,
    subAccounts: subAccounts,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);
