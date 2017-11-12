import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followingActions from '../actions/following';
import InfiniteScroll from '../components/InfiniteScroll'

/**
 * Render specific user's following
 * @extends Component
 */
class FollowingContainer extends Component {

  componentWillMount() {
    const { userId } = this.props;
    const { fetchFollowing } = this.props.actions;
    fetchFollowing(userId);
  }

  onLoad() {
    const { fetchFollowingOlderThan } = this.props.actions;
    const { userId, nextCursor } = this.props;

    fetchFollowingOlderThan(userId, nextCursor);
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

function mapStateToProps(state, props) {
  const { following } = state;
  const { userId } = props.params;

  const users = following.userId == userId ? following.users : [];

  return {
    userId: userId,
    users: users,
    nextCursor: following.nextCursor,
    title: 'Following',
    isLoading: users.length == 0,
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
