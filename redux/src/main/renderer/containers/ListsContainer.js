import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import * as listsActions from '../actions/lists';
import { Accounts } from '../../domain/models/Accounts'
import LinkItem from '../components/LinkItem';

class ListsContainer extends Component {

  componentWillMount() {
    const { account }       = this.props;
    const { fetchOwnLists } = this.props.actions;
    fetchOwnLists(account.id);
  }

  _createListItems(lists) {
    //TODO: add path
    return lists.map(l => {
      return <LinkItem label={l.name} path={`/lists/${l.id_str}/tweets`} count={l.member_count} query={{ name: l.name }}/>
    });
  }

  render() {
    const { lists } = this.props;

    return (
      <div>
        <ul className="lists">
          {this._createListItems(lists.lists)}
        </ul>
      </div>
    );
  }

}

ListsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { lists, accounts } = state;
  const account             = Accounts.fromJson(accounts).primary;

  //TODO: use Lists model
  return {
    account: account,
    lists: lists,
    title: 'Lists',
    isLoading: lists.lists.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, listsActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(ListsContainer));
