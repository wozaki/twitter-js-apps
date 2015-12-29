import React,{Component} from 'react'
import FavoriteButton from './FavoriteButton'
import Time from './Time'
import TweetBody from './TweetBody'
import UnfavoriteButton from './UnfavoriteButton'

export default class Retweet extends Component {
    get favoriteButton() {
        const {tweet} = this.props;
        if (tweet.favorited) {
            return <UnfavoriteButton tweet={tweet.retweeted_status}/>;
        } else {
            return <FavoriteButton tweet={tweet.retweeted_status}/>;
        }
    }

    get url() {
        const {tweet} = this.props;

        return `https://twitter.com/${tweet.retweeted_status.user.screen_name}/status/${tweet.retweeted_status.id_str}`;
    }

    onAnchorClicked(event) {
    }

    render() {
        const {tweet} = this.props;

        return (
            <li className="tweet" key={tweet.id_str}>
                <div className="tweet-sub">
                    <div className="tweet-avatar-parent">
                        <img className="tweet-avatar" src={tweet.retweeted_status.user.profile_image_url}
                             height="48" width="48"/>
                        <img className="tweet-avatar-child" src={tweet.user.profile_image_url} height="24"
                             width="24"/>
                    </div>
                </div>
                <div className="tweet-main">
                    <div className="tweet-header">
                        <div className="tweet-names">
                            <span className="tweet-display-name">{tweet.retweeted_status.user.name}</span>
                            <span
                                className="tweet-screen-name">@{tweet.retweeted_status.user.screen_name}</span>
                            <span className="tweet-retweeter-display-name">
                                <i className="fa fa-retweet"></i>
                                {' '}
                                {tweet.user.name}
                            </span>
                        </div>
                        <a className="tweet-datetime-anchor" href={this.url} onClick={this.onAnchorClicked.bind(this)}
                           tabIndex="-1">
                            <Time className="tweet-datetime" time={tweet.retweeted_status.created_at}/>
                        </a>
                    </div>
                    <div className="tweet-body-container">
                        <TweetBody tweet={tweet.retweeted_status}/>

                        <div className="tweet-buttons">
                            {this.favoriteButton}
                            <i className="fa fa-reply tweet-button-reply"/>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
