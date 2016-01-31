import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from '../components/Header';
import TweetsContainer from '../containers/TweetsContainer';
import * as timelineActions from '../actions/timeline';

export default class HomeContainer extends Component {

  get title() {
    return 'Home';
  }

  render() {
    const { fetchOldHomeTimeline } = this.props.actions;
    const { tweets } = this.props;

    return (
      <main className="Main">
        <Header title={this.title}/>
        <TweetsContainer
          tweets={tweets}
          fetchOldTweet={(offsetTweetId) => fetchOldHomeTimeline(offsetTweetId)}
          />
      </main>
    );
  }
}

HomeContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { account, timeline } = state;
  return {
    account: account,
    tweets: timeline
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, timelineActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
