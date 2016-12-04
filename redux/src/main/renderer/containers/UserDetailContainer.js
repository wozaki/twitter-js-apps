import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
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

  _onUrlClicked = (event) => {
    event.preventDefault();
    dialogService.openUrl(event.currentTarget.href);
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="main"
             style={{
               display: 'flex',
               justifyContent: 'center',
               width: '100%',
               flexDirection: 'column',
               alignItems: 'center',
               padding: '10px'
             }}>
          <img className="Tweet-avatar" src={user.profileImageUrl.original} height="120" width="120"/>
          <div className="body-wrapper"
               style={{
                 display: 'flex',
                 justifyContent: 'center',
                 width: '100%',
                 flexDirection: 'column',
                 alignItems: 'center',
                 padding: '20px'
               }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{user.name}</p>
            <p style={{ fontSize: '17px' }}>{user.screenNameWithAt}</p>
            <p>{user.description}</p>
            <a href={user.url.expanded} onClick={this._onUrlClicked}>{user.url.forDisplay}</a>
          </div>
        </div>
        <ul className="lists">
          <LinkItem label="Tweets" path={"/my-timeline"} count={user.tweetCount}/>
          <LinkItem label="Followers" path={"/followers"} count={user.followersCount}/>
          <LinkItem label="Following" path={"/followings"} count={user.followingCount}/>
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
