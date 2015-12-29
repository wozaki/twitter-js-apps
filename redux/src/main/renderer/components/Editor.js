import React, {Component} from 'react'
import {keyStringDetector} from '../registories/registory'

export default class Editor extends Component {

    const TWEET_LIMIT_LENGTH = 140;

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    getRestTextLength() {
        return this.TWEET_LIMIT_LENGTH - this.state.text.length;
    }

    onTextareaChanged(event) {
        this.setState({text: event.target.value});
    }

    onTextareaKeyDown(event) {
        if (keyStringDetector.detect(event) === 'Return') {
            event.preventDefault();
            this.onTweetSubmitted();
        }
    }

    //TODO: 140字を超えたらviewを変更して伝える
    render() {
        return (
            <div className="editor">
                <textarea
                    name="name"
                    rows="2"
                    cols="40"
                    className="editor-textarea"
                    onChange={this.onTextareaChanged.bind(this)}
                    onKeyDown={this.onTextareaKeyDown.bind(this)}
                    placeholder="What's happening?"
                    value={this.state.text}>
                </textarea>

                <div className="editor-counter">
                    {this.getRestTextLength()}
                </div>
            </div>
        );
    }

    onTweetSubmitted() {
    }
}
