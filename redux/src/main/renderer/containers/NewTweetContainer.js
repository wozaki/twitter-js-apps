import _ from 'lodash';
import classNames from 'classNames';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as tweetActions from '../actions/tweet';
import keyStringDetector from '../registries/keyStringDetector';
import Tweet from '../../domain/models/Tweet';

export default class NewTweetContainer extends Component {

  componentWillMount() {
    const { setUp } = this.props.actions;
    setUp();

    this.state = this.initialState();
  }

  onTextareaChanged(event) {
    const text = event.target.value;
    this.setState({ text: text }, () => {
      const isExceededLimitCharLength = this.getRestTextLength() < 0;
      this.setState({ isExceededLimitCharLength: isExceededLimitCharLength });
    });
  }

  onTextareaKeyDown(event) {
    if (keyStringDetector.detect(event) === 'Return') {
      event.preventDefault();
      this.onTweetSubmitted();
    }
  }

  onTweetSubmitted() {
    if (this.state.isExceededLimitCharLength) {
      return;
    }

    const { postTweet } = this.props.actions;

    postTweet(this.state.text);
    this.setState(this.initialState()); // TODO: init text area if succeed to tweet
  }

  getRestTextLength() {
    return Tweet.LIMIT_CHARA_LENGTH - this.state.text.length;
  }

  initialState() {
    return { text: '', isExceededLimitCharLength: false };
  }

  get editorCounterClassName() {
    return this.state.isExceededLimitCharLength
      ? 'Editor-counter-exceeded'
      : 'Editor-counter';
  }

  get tweetLabelClassName() {
    return classNames({
      'NewTweet-footer-tweetLabel': true,
      'is-active': this.state.text.length > 0,
      'is-overLimit': this.state.isExceededLimitCharLength
    });
  }

  render() {
    const { account } = this.props;

    // TODO: render place
    // TODO: post image

    return (
      <div className="NewTweet">
        <main className="NewTweet-main">
          <aside className="NewTweet-main-left">
            <img className="Tweet-avatar" src={account.profile_image_url}/>
          </aside>
          <div className="NewTweet-main-center">
            <div className="Editor">
              <textarea
                name="name"
                rows="2"
                cols="40"
                className="Editor-textarea"
                onChange={this.onTextareaChanged.bind(this)}
                onKeyDown={this.onTextareaKeyDown.bind(this)}
                placeholder="What's happening?"
                value={this.state.text}>
              </textarea>
              <div className={this.editorCounterClassName}>
                {this.getRestTextLength()}
              </div>
            </div>
          </div>
        </main>
        <footer className="NewTweet-footer">
          <div className={this.tweetLabelClassName} onClick={this.onTweetSubmitted.bind(this)}>
            Tweet
          </div>
        </footer>
      </div>
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
