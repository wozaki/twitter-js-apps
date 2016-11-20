import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import MainContainerWrapper from '../containers/MainContainerWrapper';
import TweetsContainer from '../containers/TweetsContainer';
import * as myTimelineActions from '../actions/my-timeline';

class MyTimelineContainer extends Component {

  componentWillMount() {
    const { fetchMyTimeline } = this.props.actions;
    fetchMyTimeline();
  }

  render() {
    const { fetchOldMyTimeline } = this.props.actions;
    const { tweets } = this.props;

    return (
      <TweetsContainer
        tweets={tweets}
        fetchOldTweet={(offsetTweetId) => fetchOldMyTimeline(offsetTweetId)}
        />
    );
  }
}

MyTimelineContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  tweets: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { myTimeline } = state;
  return {
    tweets: myTimeline.tweets,
    title: 'Tweets',
    isLoading: myTimeline.tweets.length == 0,
    navigatableBySwipe: true
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, myTimelineActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(MyTimelineContainer));
