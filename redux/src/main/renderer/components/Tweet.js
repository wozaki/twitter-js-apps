import React, { Component } from 'react';
import TweetBody from './TweetBody'
import Time from './Time'
import { openExternal } from 'shell'

export default class Tweet extends Component {
  get url() {
    return `https://twitter.com/${this.props.tweet.user.screen_name}/status/${this.props.tweet.id_str}`;
  }

  onAnchorClicked(event) {
    event.preventDefault();
    openExternal(event.currentTarget.href);
  }

  render() {
    const {tweet, favoriteButton} = this.props;

    return (
      <li className="Tweet">
        <div className="Tweet-sub">
          <img className="Tweet-avatar" src={tweet.user.profile_image_url} height="48" width="48"/>
        </div>
        <div className="Tweet-main">
          <div className="Tweet-header">
            <div className="Tweet-names">
              <span className="Tweet-display-name">{tweet.user.name}</span>
              <span className="Tweet-screen-name">@{tweet.user.screen_name}</span>
            </div>
            <a className="Tweet-datetime-anchor" href={this.url} onClick={this.onAnchorClicked.bind(this)}
               tabIndex="-1">
              <Time className="Tweet-datetime" time={tweet.created_at}/>
            </a>
          </div>
          <div className="Tweet-body-container">
            <TweetBody tweet={tweet}/>

            <div className="Tweet-buttons">
              {favoriteButton}
              <i className="fa fa-reply Tweet-button-reply"/>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
