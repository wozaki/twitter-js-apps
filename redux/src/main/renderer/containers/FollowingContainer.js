import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followingActions from '../actions/following';
import InfiniteScroll from '../components/InfiniteScroll'
import { Accounts } from '../../domain/models/Accounts'

class FollowingContainer extends Component {

  componentWillMount() {
    const { account } = this.props;
    const { fetchFollowing } = this.props.actions;
    fetchFollowing(account.id);
  }

  onLoad() {
    const { fetchFollowingOlderThan } = this.props.actions;
    const { account, nextCursor } = this.props;

    fetchFollowingOlderThan(account.id, nextCursor);
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

FollowingContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { following, accounts } = state;
  const account = Accounts.fromJson(accounts).primary;

  return {
    account: account,
    users: following.users,
    nextCursor: following.nextCursor,
    title: 'Following',
    isLoading: following.users.length == 0,
    navigatableBySwipe: true
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, followingActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(FollowingContainer));
