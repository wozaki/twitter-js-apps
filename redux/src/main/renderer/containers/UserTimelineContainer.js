import _ from 'lodash'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import MainContainerWrapper from '../containers/MainContainerWrapper';
import TweetsContainer from '../containers/TweetsContainer';
import * as userTimelineActions from '../actions/user-timeline';

/**
 * Render specific user's tweets
 * @extends Component
 */
class UserTimelineContainer extends Component {

  componentWillMount() {
    const { fetchTweets } = this.props.actions;
    const { userId }      = this.props;
    fetchTweets(userId);
  }

  render() {
    const { fetchOldTweets } = this.props.actions;
    const { tweets, userId } = this.props;

    return (
      <TweetsContainer
        tweets={tweets}
        fetchOldTweet={(offsetTweetId) => fetchOldTweets(userId, offsetTweetId)}
      />
    );
  }
}

UserTimelineContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  tweets: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  const { userTimeline } = state;
  const { userId }       = props.params;

  const tweets = userTimeline.userId == userId ? userTimeline.tweets : [];

  return {
    tweets: tweets,
    title: 'Tweets',
    userId: userId,
    isLoading: tweets.length == 0,
    navigatableBySwipe: true
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, userTimelineActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(UserTimelineContainer));
