import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from '../components/Header';
import TweetsContainer from '../containers/TweetsContainer';
import * as myTimelineActions from '../actions/my-timeline';

class MyTimelineContainer extends Component {

  componentWillMount() {
    const { fetchMyTimeline } = this.props.actions;
    fetchMyTimeline();
  }

  get title() {
    return 'Tweets';
  }

  render() {
    const { fetchOldMyTimeline } = this.props.actions;
    const { tweets } = this.props;

    return (
      <main className="Main">
        <Header title={this.title}/>
        <TweetsContainer
          tweets={tweets}
          fetchOldTweet={(offsetTweetId) => fetchOldMyTimeline(offsetTweetId)}
          />
      </main>
    );
  }
}

MyTimelineContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  tweets: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { myTimeline } = state;
  return {
    tweets: myTimeline
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, myTimelineActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTimelineContainer);
