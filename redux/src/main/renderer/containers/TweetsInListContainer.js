import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import * as tweetsInListActions from '../actions/tweets-in-list';
import TweetsContainer from '../containers/TweetsContainer';

class TweetsInListContainer extends Component {

  componentWillMount() {
    const { fetchTweets } = this.props.actions;
    const { listId }      = this.props.params;
    fetchTweets(listId);
  }

  render() {
    const { tweetsInList }     = this.props;
    const { listId }           = this.props.params;
    const { fetchOlderTweets } = this.props.actions;

    return (
      <TweetsContainer
        tweets={tweetsInList.tweets}
        fetchOldTweet={(offsetTweetId) => fetchOlderTweets(listId, offsetTweetId)}
      />
    );
  }

}

TweetsInListContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  tweets: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  const { tweetsInList }    = state;
  const { name }            = props.location.query;

  //TODO: extract tweets from tweetsInList
  //TODO: use List model
  return {
    tweetsInList: tweetsInList,
    title: name,
    navigatableBySwipe: true
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, tweetsInListActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(TweetsInListContainer));
