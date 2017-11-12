import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import * as tweetsInListActions from '../actions/tweets-in-list';
import TweetsContainer from '../containers/TweetsContainer';
import TweetsInList from '../../domain/models/TweetsInList';

class TweetsInListContainer extends Component {

  componentWillMount() {
    const { fetchTweets } = this.props.actions;
    const { listId }      = this.props;
    fetchTweets(listId);
  }

  render() {
    const { listId, tweets }   = this.props;
    const { fetchOlderTweets } = this.props.actions;

    return (
      <TweetsContainer
        tweets={tweets}
        fetchOldTweet={(offsetTweetId) => fetchOlderTweets(listId, offsetTweetId)}
      />
    );
  }

}

TweetsInListContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired,
  tweets: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  const tweetsInList = new TweetsInList(state.tweetsInList);

  // Link navigation or MultiColumn
  const listId       = _.get(props, 'params.listId') || props.listId;
  const name         = _.get(props, 'location.query.name') || props.name;
  const tweets       = tweetsInList.tweets(listId);

  return {
    tweets: tweets,
    listId: listId,
    title: name,
    isLoading: tweets.length == 0,
    navigatableBySwipe: true,
    deleteColumnButton: props.deleteColumnButton
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, tweetsInListActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(TweetsInListContainer));
