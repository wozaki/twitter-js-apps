import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import * as listsActions from '../actions/lists';
import { Accounts } from '../../domain/models/Accounts'

class ListContainer extends Component {

  componentWillMount() {
    const { account }       = this.props;
    const { listId }        = this.props.params;

    //TODO: fetch tweet on list
    console.log("listId", this.props.params.listId)
    console.log("name", this.props.location.query.name)
  }

  render() {
    //TODO: render tweets on list

    return (
      <div>
        <ul className="lists">
        </ul>
      </div>
    );
  }

}

ListContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  const { lists, accounts } = state;
  const account             = Accounts.fromJson(accounts).primary;
  const { name }            = props.location.query;

  //TODO: use List model
  return {
    account: account,
    lists: lists,
    title: name,
    isLoading: lists.lists.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, listsActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(ListContainer));
