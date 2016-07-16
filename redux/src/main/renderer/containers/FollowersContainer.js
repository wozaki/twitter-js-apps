import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followersActions from '../actions/followers';
import my from '../registries/my';
import InfiniteScroll from '../components/InfiniteScroll'

class FollowersContainer extends Component {

  componentWillMount() {
    const { fetchFollowers } = this.props.actions;
    fetchFollowers(my.userId);
  }

  onLoad() {
    const { fetchFollowersOlderThan } = this.props.actions;
    const { nextCursor } = this.props;

    fetchFollowersOlderThan(my.userId, nextCursor);
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

FollowersContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { followers } = state;
  return {
    users: followers.users,
    nextCursor: followers.nextCursor,
    isOld: followers.isOld,
    title: 'Followers',
    isLoading: followers.users.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, followersActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(FollowersContainer));
