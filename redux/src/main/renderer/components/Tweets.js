import React, {Component} from 'react'
import _ from 'lodash'
import Tweet from './Tweet'
import Retweet from './Retweet'

export default class Tweets extends Component {

    render() {
        return (
            <div className="tweets">
                {this.renderTweets()}
            </div>
        );
    }

    renderTweets() {
        const {tweets} = this.props.tweets;

        if (!_.isEmpty(tweets)) {
            return tweets.map((tweet) => {
                if (tweet.retweeted_status) {
                    return <Retweet key={tweet.id_str} tweet={tweet}/>
                } else {
                    return <Tweet key={tweet.id_str} tweet={tweet}/>
                }
            });
        }
    }

}
