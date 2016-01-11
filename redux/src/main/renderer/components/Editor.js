import React, {Component} from 'react'
import keyStringDetector from '../registories/keyStringDetector'
import Tweet from '../../domain/models/Tweet'

export default class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    initialState() {
        return {text: '', isExceededLimitCharLength: false};
    }

    getRestTextLength() {
        return Tweet.LIMIT_CHARA_LENGTH - this.state.text.length;
    }

    onTextareaChanged(event) {
        const text = event.target.value;
        this.setState({text: text}, () => {
            const isExceededLimitCharLength = this.getRestTextLength() < 0;
            this.setState({isExceededLimitCharLength: isExceededLimitCharLength});
        });
    }

    onTextareaKeyDown(event) {
        if (keyStringDetector.detect(event) === 'Return') {
            event.preventDefault();
            this.onTweetSubmitted();
        }
    }

    onTweetSubmitted() {
        const {onTweetSubmitted} = this.props;

        onTweetSubmitted(this.state.text);
        this.setState(this.initialState()); //TODO: tweetが成功したらテキストを初期化する
    }

    get editorCounterClassName() {
        return this.state.isExceededLimitCharLength
            ? "editor-counter-exceeded"
            : "editor-counter";
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

                <div className={this.editorCounterClassName}>
                    {this.getRestTextLength()}
                </div>
            </div>
        );
    }

}
