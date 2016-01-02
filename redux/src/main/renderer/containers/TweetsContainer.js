import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as favoriteActions from '../actions/favorite';
import FavoriteButton from '../components/FavoriteButton'
import Retweet from '../components/Retweet'
import Tweets from '../components/Tweets'
import Tweet from '../components/Tweet'
import UnfavoriteButton from '../components/UnfavoriteButton'

export default class TweetsContainer extends Component {

    render() {
        return (
            <Tweets>
                {this.renderTweets()}
            </Tweets>
        )
    }

    favoriteButton(tweet) {
        const { createFavorite, destroyFavorite } = this.props.actions;

        if (tweet.favorited) {
            return <UnfavoriteButton onUnfavoriteButtonClicked={() => destroyFavorite(tweet.id_str)}/>;
        } else {
            return <FavoriteButton onFavoriteButtonClicked={() => createFavorite(tweet.id_str)}/>;
        }
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
