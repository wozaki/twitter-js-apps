import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followersActions from '../actions/followers';
import InfiniteScroll from '../components/InfiniteScroll';

class FollowersContainer extends Component {

  componentWillMount() {
    const { userId }         = this.props;
    const { fetchFollowers } = this.props.actions;
    fetchFollowers(userId);
  }

  _onLoad = () => {
    const { fetchFollowersOlderThan } = this.props.actions;
    const { nextCursor, userId }      = this.props;

    fetchFollowersOlderThan(userId, nextCursor);
  };

  render() {
    const { users } = this.props;

    return (
      <InfiniteScroll
        className={"UserList"}
        onLoad={this._onLoad}>
        <UserList users={users}/>
      </InfiniteScroll>
    );
  }

}

FollowersContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  const { userId } = props.params;
  const followers  = state.followers[userId];
  const users      = _.get(followers, 'users', []);
  const nextCursor = _.get(followers, 'nextCursor', -1); //TODO: reference cursor

  return {
    users: users,
    userId: userId,
    nextCursor: nextCursor,
    title: 'Followers',
    isLoading: users.length === 0,
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
