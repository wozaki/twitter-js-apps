import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followingActions from '../actions/following';
import my from '../registries/my';
import InfiniteScroll from '../components/InfiniteScroll'

class FollowingContainer extends Component {

  componentWillMount() {
    const { fetchFollowing } = this.props.actions;
    fetchFollowing(my.userId);
  }

  onLoad() {
    const { fetchFollowingOlderThan } = this.props.actions;
    const { nextCursor } = this.props;

    fetchFollowingOlderThan(my.userId, nextCursor);
  }

  render() {
    const { users, isOld } = this.props;

    return (
      <InfiniteScroll
        className={"UserList"}
        onLoad={this.onLoad.bind(this)}
        loadCompleted={isOld}>
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
  const { following } = state;
  return {
    users: following.users,
    nextCursor: following.nextCursor,
    isOld: following.isOld,
    title: 'Following',
    isLoading: following.users.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, followingActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(FollowingContainer));
