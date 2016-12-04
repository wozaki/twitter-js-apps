import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import { Users } from '../../domain/models/Users'
import LinkItem from '../components/LinkItem';
import * as userActions from '../actions/user';

class UserDetailContainer extends Component {

  componentWillMount() {
    const { userId }    = this.props;
    const { fetchUser } = this.props.actions;

    fetchUser(userId);
  }

  render() {
    const { user } = this.props;

    return (
      <ul className="lists">
        <LinkItem label="Tweets" path={"/my-timeline"} count={user.tweetCount}/>
        <LinkItem label="Followers" path={"/followers"} count={user.followersCount}/>
        <LinkItem label="Following" path={"/followings"} count={user.followingCount}/>
      </ul>
    );
  }
}

UserDetailContainer.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  navigatableBySwipe: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, userActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state, props) {
  const { users }  = state;
  const { userId } = props.params;
  const user       = Users.fromObjects(users).find(userId);

  return {
    user: user,
    userId: userId,
    title: _.defaultTo(user.screenName,''),
    navigatableBySwipe: true
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(UserDetailContainer));
