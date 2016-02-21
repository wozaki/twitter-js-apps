import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import UserList from '../components/UserList';
import * as followingActions from '../actions/following';
import my from '../registries/my';

class FollowingContainer extends Component {

  componentWillMount() {
    const { fetchFollowing } = this.props.actions;
    fetchFollowing(my.userId);
  }

  render() {
    const { users } = this.props;

    return (
      <UserList users={users}/>
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
