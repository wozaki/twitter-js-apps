import React, { Component, PropTypes } from 'react';
import keyStringDetector from '../registries/keyStringDetector';
import Tweet from '../../domain/models/Tweet';

export default class Editor extends Component {

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

    const { onTweetSubmitted } = this.props;

    onTweetSubmitted(this.state.text);
    this.setState(this.initialState()); // TODO: tweetが成功したらテキストを初期化する
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

  // TODO: 140字を超えたらviewを変更して伝える
  render() {
    return (
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
    );
  }

}

Editor.propTypes = {
  onTweetSubmitted: PropTypes.func.isRequired
};
