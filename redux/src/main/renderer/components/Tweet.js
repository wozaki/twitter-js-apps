import React from 'react';
import TweetBody from './TweetBody'
import Time from './Time'

const Tweet = ({ tweet, favoriteButton, onAnchorClicked }) => {
  const url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

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
          <a className="Tweet-datetime-anchor" href={url} onClick={onAnchorClicked}
             tabIndex="-1">
            <Time className="Tweet-datetime" time={tweet.created_at}/>
          </a>
        </div>
        <div className="Tweet-body-container">
          <TweetBody tweet={tweet} onAnchorClicked={onAnchorClicked}/>

          <div className="Tweet-buttons">
            {favoriteButton}
            <i className="fa fa-reply Tweet-button-reply"/>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Tweet
