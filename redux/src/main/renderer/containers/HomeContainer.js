import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import MainContainerWrapper from '../containers/MainContainerWrapper';
import TweetsContainer from '../containers/TweetsContainer';
import * as timelineActions from '../actions/timeline';

class HomeContainer extends Component {

  render() {
    const { fetchOldHomeTimeline } = this.props.actions;
    const { tweets } = this.props;

    return (
      <TweetsContainer
        tweets={tweets}
        fetchOldTweet={(offsetTweetId) => fetchOldHomeTimeline(offsetTweetId)}
        />
    );
  }
}

function mapStateToProps(state) {
  const { timeline } = state;

  return {
    tweets: timeline,
    title: 'Home',
    isLoading: timeline.tweets.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, timelineActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(HomeContainer));
