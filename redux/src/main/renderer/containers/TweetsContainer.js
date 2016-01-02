import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as favoriteActions from '../actions/favorite';
import Retweet from '../components/Retweet'
import ToggleFavoriteButton from '../components/ToggleFavoriteButton'
import Tweets from '../components/Tweets'
import Tweet from '../components/Tweet'

export default class TweetsContainer extends Component {

    render() {
        return (
            <Tweets>
                {this.renderTweets()}
            </Tweets>
        )
    }

    favoriteButton(tweet) {
        const { toggleFavorite } = this.props.actions;

        return <ToggleFavoriteButton isFavorited={tweet.favorited}
                                     toggleFavorite={(isFavoritedNow) => toggleFavorite(isFavoritedNow, tweet.id_str)}
            />;
    }

    renderTweets() {
        const {tweets} = this.props.tweets;

        if (!_.isEmpty(tweets)) {
            return tweets.map((tweet) => {
                if (tweet.retweeted_status) {
                    return <Retweet key={tweet.id_str}
                                    tweet={tweet}
                                    favoriteButton={this.favoriteButton(tweet)}
                        />
                } else {
                    return <Tweet key={tweet.id_str}
                                  tweet={tweet}
                                  favoriteButton={this.favoriteButton(tweet)}
                        />
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
