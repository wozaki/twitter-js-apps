import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import * as followingActions from '../actions/following';
import my from '../registries/my';

class FollowingContainer extends Component {

  componentWillMount() {
    const { fetchFollowing } = this.props.actions;
    fetchFollowing(my.userId);
  }

  render() {
    const { users } = this.props;

    //FIXME: apply following to Component
    console.log("FollowingContainer", users);
    return (
      <div>followers_count</div>
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
