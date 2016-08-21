import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as favoriteActions from '../actions/favorite';
import InfiniteScroll from '../components/InfiniteScroll'
import Retweet from '../components/Retweet'
import ToggleFavoriteButton from '../components/ToggleFavoriteButton'
import Tweet from '../components/Tweet'

class TweetsContainer extends Component {

  render() {

    return (
      <InfiniteScroll
        className={"Tweets"}
        onLoad={this.onLoad.bind(this)}>
        {this.renderTweets()}
      </InfiniteScroll>
    )
  }

  onLoad(lastItem) {
    const { fetchOldTweet } = this.props;
    const offsetTweetId = lastItem.props.tweet.id_str;

    fetchOldTweet(offsetTweetId);
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
  fetchOldTweet: PropTypes.func,
  tweets: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, favoriteActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect((state) => state, mapDispatchToProps)(TweetsContainer)
