import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followersActions from '../actions/followers';
import InfiniteScroll from '../components/InfiniteScroll'
import { Accounts } from '../../domain/models/Accounts'

class FollowersContainer extends Component {

  componentWillMount() {
    const { account } = this.props;
    const { fetchFollowers } = this.props.actions;
    fetchFollowers(account.id);
  }

  onLoad() {
    const { fetchFollowersOlderThan } = this.props.actions;
    const { account, nextCursor } = this.props;

    fetchFollowersOlderThan(account.id, nextCursor);
  }

  render() {
    const { users } = this.props;

    return (
      <InfiniteScroll
        className={"UserList"}
        onLoad={this.onLoad.bind(this)}>
        <UserList users={users}/>
      </InfiniteScroll>
    );
  }

}

FollowersContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { followers, accounts } = state;
  const account = Accounts.fromJson(accounts).primary;

  return {
    account: account,
    users: followers.users,
    nextCursor: followers.nextCursor,
    title: 'Followers',
    isLoading: followers.users.length == 0,
    navigatableBySwipe: true
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, followersActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(FollowersContainer));
