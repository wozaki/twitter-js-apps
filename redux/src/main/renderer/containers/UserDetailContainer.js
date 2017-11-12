import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import { Users } from '../../domain/models/Users'
import LinkItem from '../components/LinkItem';
import * as userActions from '../actions/user';
import * as dialogService from '../registries/dialogService';

class UserDetailContainer extends Component {

  componentWillMount() {
    const { userId }    = this.props;
    const { fetchUser } = this.props.actions;

    fetchUser(userId);
  }

  componentWillReceiveProps(nextProps) {
    const { userId }             = this.props;
    const { userId: nextUserId } = nextProps;
    const { fetchUser }          = this.props.actions;

    // We needs to fetch user in componentWillReceiveProps because nothing is rendered when executing the following flow:
    //  1. open others UserDetailsContainer
    //  2. click the account icon in SideMenu
    //  3. nothing is rendered
    // In above follow, DOM is not destroyed so `componentWillMount` or `render` is not called
    if (userId != nextUserId) {
      fetchUser(nextUserId);
    }
  }

  _onUrlClicked = (event) => {
    event.preventDefault();
    dialogService.openUrl(event.currentTarget.href);
  };

  render() {
    const { user } = this.props;

    //TODO: Implement LinkItems
    return (
      <div>
        <div className="main"
             style={{
               display: 'flex',
               justifyContent: 'center',
               width: '100%',
               flexDirection: 'column',
               alignItems: 'center',
               padding: '20px'
             }}>
          <img className="Tweet-avatar" src={user.profileImageUrl.original}
               style={{ height: "120px", width: "120px", marginBottom: '10px' }}/>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{user.name}</p>
          <p style={{ fontSize: '17px', marginBottom: '10px' }}>{user.screenNameWithAt}</p>
          <p style={{ marginBottom: '10px' }}>{user.description}</p>
          <p style={{ color: 'gray' }}>{user.location}</p>
          <a href={user.url.expanded} onClick={this._onUrlClicked}>{user.url.forDisplay}</a>
        </div>
        <ul className="lists">
          <LinkItem label="Tweets" path={`/users/${user.id}/tweets`} count={user.tweetCount}/>
          <LinkItem label="Followers" path={`/users/${user.id}/followers`} count={user.followersCount}/>
          <LinkItem label="Following" path={`/users/${user.id}/following`} count={user.followingCount}/>
        </ul>
      </div>
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
    title: _.defaultTo(user.screenName, ''),
    navigatableBySwipe: true
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(UserDetailContainer));
