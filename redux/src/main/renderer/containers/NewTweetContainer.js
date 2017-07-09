import _ from 'lodash';
import classNames from 'classNames';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as tweetActions from '../actions/tweet';
import * as mediaActions from '../actions/media';
import keyStringDetector from '../registries/keyStringDetector';
import Tweet from '../../domain/models/Tweet';
import Media from '../../domain/models/Media';
import { Accounts } from '../../domain/models/Accounts'
import * as dialogService from '../registries/dialogService';

class NewTweetContainer extends Component {

  constructor(props) {
    super(props);
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

    const { account, mediaToTweet } = this.props;
    const { postTweet }             = this.props.actions;

    postTweet(this.state.text, account.credential, mediaToTweet.mediaId);
    this.setState(this.initialState()); // TODO: init text area if succeed to tweet
  }

  onChooseImage() {
    dialogService.chooseImageFile({ extensions: Media.IMAGE_FILE_EXTENSIONS }, (filePaths) => {
      if (_.isUndefined(filePaths)) return;
      const media             = Media.build(filePaths[0]);
      const { uploadToTweet } = this.props.actions;
      uploadToTweet(media);
    });
  }

  getRestTextLength() {
    return Tweet.LIMIT_CHARA_LENGTH - this.state.text.length;
  }

  initialState() {
    return { text: '', isExceededLimitCharLength: false };
  }

  get tweetCounterClassName() {
    return classNames({
      'NewTweet-main-tweetCounter': true,
      'is-overLimit': this.state.isExceededLimitCharLength
    });
  }

  get tweetLabelClassName() {
    return classNames({
      'NewTweet-footer-tweetLabel': true,
      'is-active': this.state.text.length > 0,
      'is-overLimit': this.state.isExceededLimitCharLength
    });
  }

  decodeImage(media) {
    if (media === null) return;
    const base64    = media.toBase64();
    const extension = media.extension;
    return `data:image/${extension};base64,${base64}`;
  }

  render() {
    const { account, mediaToTweet } = this.props;

    // TODO: render place

    return (
      <div className="NewTweet">
        <main className="NewTweet-main">
          <div className="NewTweet-main-left">
            <img className="Tweet-avatar" src={account.profileImageUrl}/>
          </div>
          <div className="NewTweet-main-center">
            <textarea
              autoFocus
              className="Editor-textarea"
              onChange={this.onTextareaChanged.bind(this)}
              onKeyDown={this.onTextareaKeyDown.bind(this)}
              value={this.state.text}>
            </textarea>
          </div>
          { mediaToTweet.media && (
            <div className="NewTweetMedia">
              <img src={this.decodeImage(mediaToTweet.media)}/>
              <i className="fa fa-times-circle fa-lg fa-times"/>
            </div>
          )}
          <div className={this.tweetCounterClassName}>
            {this.getRestTextLength()}
          </div>
        </main>
        <footer className="NewTweet-footer">
          <div className={this.tweetLabelClassName} onClick={this.onChooseImage.bind(this)}>
            Image
          </div>
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
  const actions = _.assign({}, appActions, tweetActions, mediaActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { accounts, mediaToTweet } = state;
  const account                    = Accounts.fromObjects(accounts).primary;

  return {
    account: account,
    mediaToTweet: mediaToTweet,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTweetContainer);
