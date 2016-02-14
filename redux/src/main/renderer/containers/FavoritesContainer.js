import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import TweetsContainer from '../containers/TweetsContainer';
import * as favoriteActions from '../actions/favorite';
import my from '../registries/my';

class FavoritesContainer extends Component {

  componentWillMount() {
    const { fetchMyFavorites } = this.props.actions;
    fetchMyFavorites(my.userId);
  }

  render() {
    const { favorites } = this.props;
    const { fetchMyFavoritesOlderThan } = this.props.actions;

    return (
      <TweetsContainer
        tweets={favorites}
        fetchOldTweet={(offsetTweetId) => fetchMyFavoritesOlderThan(my.userId, offsetTweetId)}
        />
    );
  }

}

FavoritesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { favorites } = state;
  return {
    favorites: favorites,
    title: 'Favorites',
    isLoading: favorites.tweets.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, favoriteActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(FavoritesContainer));
