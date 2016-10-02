import React,{Component} from 'react'
import Time from './Time'
import TweetBody from './TweetBody'

export default class Retweet extends Component {

    get url() {
        const {tweet} = this.props;

        return `https://twitter.com/${tweet.retweeted_status.user.screen_name}/status/${tweet.retweeted_status.id_str}`;
    }

    render() {
        const { onAnchorClicked, tweet } = this.props;

        return (
            <li className="Tweet" key={tweet.id_str}>
                <div className="Tweet-sub">
                    <div className="Tweet-avatar-parent">
                        <img className="Tweet-avatar" src={tweet.retweeted_status.user.profile_image_url}
                             height="48" width="48"/>
                        <img className="Tweet-avatar-child" src={tweet.user.profile_image_url} height="24"
                             width="24"/>
                    </div>
                </div>
                <div className="Tweet-main">
                    <div className="Tweet-header">
                        <div className="Tweet-names">
                            <span className="Tweet-display-name">{tweet.retweeted_status.user.name}</span>
                            <span
                                className="Tweet-screen-name">@{tweet.retweeted_status.user.screen_name}</span>
                            <span className="Tweet-retweeter-display-name">
                                <i className="fa fa-retweet"></i>
                                {' '}
                                {tweet.user.name}
                            </span>
                        </div>
                        <a className="Tweet-datetime-anchor" href={this.url} onClick={onAnchorClicked}
                           tabIndex="-1">
                            <Time className="Tweet-datetime" time={tweet.retweeted_status.created_at}/>
                        </a>
                    </div>
                    <div className="Tweet-body-container">
                        <TweetBody
                          onAnchorClicked={onAnchorClicked}
                          tweet={tweet.retweeted_status}
                        />

                        <div className="Tweet-buttons">
                            {this.favoriteButton}
                            <i className="fa fa-reply Tweet-button-reply"/>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
