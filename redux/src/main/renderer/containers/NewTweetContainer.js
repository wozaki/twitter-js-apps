import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as tweetActions from '../actions/tweet';
import Editor from '../components/Editor';

export default class NewTweetContainer extends Component {

  componentWillMount() {
    const {setUp} = this.props.actions;
    setUp();
  }

  render() {
    const { account } = this.props;
    const { postTweet } = this.props.actions;

    // TODO: render account image and place
    // TODO: post image

    return (
      <Editor key="editor" onTweetSubmitted={postTweet}/>
    );
  }
}

NewTweetContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, appActions, tweetActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account: account
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTweetContainer);
