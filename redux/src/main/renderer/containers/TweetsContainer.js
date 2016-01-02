import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as favoriteActions from '../actions/favorite';
import Tweets from '../components/Tweets'
import Tweet from '../components/Tweet'
import Retweet from '../components/Retweet'

export default class TweetsContainer extends Component {

    render() {
        return (
            <Tweets>
                {this.renderTweets()}
            </Tweets>
        )
    }

    renderTweets() {
        const {tweets} = this.props.tweets;
        const { createFavorite } = this.props.actions;

        if (!_.isEmpty(tweets)) {
            return tweets.map((tweet) => {
                if (tweet.retweeted_status) {
                    return <Retweet key={tweet.id_str}
                                    tweet={tweet}/>
                } else {
                    return <Tweet key={tweet.id_str}
                                  tweet={tweet}
                                  onFavoriteButtonClicked={() => createFavorite(tweet.id_str)}/>
                }
            });
        }
    }
}

TweetsContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    tweets: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    const actions = _.assign({}, favoriteActions);
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

function mapStateToProps(state) {
    const {timeline} = state;
    return {
        tweets: timeline
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetsContainer)
