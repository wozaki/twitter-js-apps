import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TweetsContainer from '../containers/TweetsContainer';
import * as favoriteActions from '../actions/favorite';
import my from '../registries/my';

class FavoritesContainer extends Component {

  componentWillMount() {
    const { fetchMyFavorites } = this.props.actions;
    fetchMyFavorites(my.userId);
  }

  get title() {
    return 'Favorites';
  }

  render() {
    const { favorites } = this.props;
    const { fetchMyFavoritesOlderThan } = this.props.actions;

    return (
      <div className="Main">
        <Header title={this.title}/>
        <TweetsContainer
          tweets={favorites}
          fetchOldTweet={(offsetTweetId) => fetchMyFavoritesOlderThan(my.userId, offsetTweetId)}
        />
      </div>
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
    favorites: favorites
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, favoriteActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
