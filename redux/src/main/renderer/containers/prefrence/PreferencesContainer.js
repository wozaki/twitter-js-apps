import _ from 'lodash';
import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditableList from '../../components/EditableList';
import IconNameItem from '../../components/IconNameItem';
import { Accounts } from '../../../domain/models/Accounts'
import * as accountActions from '../../actions/account';

class PreferencesContainer extends Component {

  _renderAccount(account) {
    return (
      <div
        key={account.id}>
        <IconNameItem
          account={account}
        />
      </div>
    );
  };

  _onAddAccount() {
    const { fetchAccount } = this.props.actions;

    ipcRenderer.send('add-account');
    ipcRenderer.on('added-account', (event, credential) => {
      fetchAccount(credential);
    });
  }

  _onRemoveAccount(selectedItem, index) {
    const { removeAccount } = this.props.actions;
    removeAccount(selectedItem);
  }

  render() {
    const { accounts } = this.props;

    return (
      <div className="Preferences">
        <EditableList
          className="account-list"
          items={accounts.asArray}
          itemContent={this._renderAccount}
          onCreateItem={this._onAddAccount.bind(this)}
          onDeleteItem={this._onRemoveAccount.bind(this)}
        />
      </div>
    );
  }
}

PreferencesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, accountActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { accounts } = state;
  const accountsModel = Accounts.fromJson(accounts);

  return {
    accounts: accountsModel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesContainer);
