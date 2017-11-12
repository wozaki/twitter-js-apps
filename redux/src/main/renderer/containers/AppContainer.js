import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import SideMenuContainer from '../containers/SideMenuContainer';
import * as dialogService from '../registries/dialogService';
import { Accounts } from '../../domain/models/Accounts';
import TweetsInListContainer from './TweetsInListContainer'
import ModalRoot from './ModalRoot'
import DeleteColumn from './DeleteColumn'

class AppContainer extends Component {

  componentWillMount() {
    const { accounts } = this.props;
    const { setUp }    = this.props.actions;

    if (accounts.isEmpty) {
      dialogService.addAccount((credential) => setUp(credential));
    } else {
      setUp(accounts.primary.credential);
    }
  }

  showErrorDialogIfNeeded() {
    const { errorMessage } = this.props;

    if (errorMessage.content) {
      dialogService.showErrorDialog({ title: errorMessage.title, body: errorMessage.content });
    }
  }

  get renderColumns() {
    const { columns } = this.props;

    // TODO: window幅をカラムに合わせて調節する
    // windowService.expand(columns.length * 500);

    return columns.map((c) => {
      if (c.columnType === 'COLUMN_TYPE_LIST') {
        return <TweetsInListContainer listId={c.detail.listId} name={c.detail.listName}
                                      deleteColumnButton={<DeleteColumn columnId={c.id}/>}/>
      } else {
        null
      }
    });
  }

  render() {
    const { children } = this.props;

    this.showErrorDialogIfNeeded();

    return (
      <div className="Application">
        <ModalRoot/>
        <SideMenuContainer/>
        {children}
        {this.renderColumns}
      </div>
    );
  }
}

AppContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, appActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { accounts, errorMessage, columns } = state;
  const _accounts                           = Accounts.fromObjects(accounts);

  return {
    accounts: _accounts,
    errorMessage: errorMessage,
    columns: columns,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
