import React, { Component } from 'react';
import TweetBody from './TweetBody'
import Time from './Time'

export default class Tweet extends Component {
    get url() {
        return `https://twitter.com/${this.props.tweet.user.screen_name}/status/${this.props.tweet.id_str}`;
    }

    onAnchorClicked(event) {
    }

    render() {
        const {tweet, favoriteButton} = this.props;

        return (
            <li className="tweet">
                <div className="tweet-sub">
                    <img className="tweet-avatar" src={tweet.user.profile_image_url} height="48" width="48"/>
                </div>
                <div className="tweet-main">
                    <div className="tweet-header">
                        <div className="tweet-names">
                            <span className="tweet-display-name">{tweet.user.name}</span>
                            <span className="tweet-screen-name">@{tweet.user.screen_name}</span>
                        </div>
                        <a className="tweet-datetime-anchor" href={this.url} onClick={this.onAnchorClicked.bind(this)}
                           tabIndex="-1">
                            <Time className="tweet-datetime" time={tweet.created_at}/>
                        </a>
                    </div>
                    <div className="tweet-body-container">
                        <TweetBody tweet={tweet}/>

                        <div className="tweet-buttons">
                            {favoriteButton}
                            <i className="fa fa-reply tweet-button-reply"/>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
