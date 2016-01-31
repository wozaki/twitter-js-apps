import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TweetsContainer from '../containers/TweetsContainer';
import * as favoriteActions from '../actions/favorite';

export default class FavoritesContainer extends Component {

  componentWillReceiveProps(nextProps) {
    const { account } = this.props;
    const nextAccount = nextProps.account;

    if (account.id_str !== nextAccount.id_str) {
      const { fetchMyFavorites } = this.props.actions;
      fetchMyFavorites(nextAccount.id_str);
    }
  }

  get title() {
    return 'Favorites';
  }

  render() {
    const { account, favorites } = this.props;
    const { fetchMyFavoritesOlderThan } = this.props.actions;

    return (
      <div className="Main">
        <Header title={this.title}/>
        <TweetsContainer
          tweets={favorites}
          fetchOldTweet={(offsetTweetId) => fetchMyFavoritesOlderThan(account.id_str, offsetTweetId)}
        />
      </div>
    );
  }

}

FavoritesContainer.propTypes = {
  account: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { account, favorites } = state;
  return {
    account: account,
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
