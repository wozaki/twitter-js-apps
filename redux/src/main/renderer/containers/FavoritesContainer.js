import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import TweetsContainer from '../containers/TweetsContainer';
import * as favoriteActions from '../actions/favorite';
import { Accounts } from '../../domain/models/Accounts'

class FavoritesContainer extends Component {

  componentWillMount() {
    const { account } = this.props;
    const { fetchMyFavorites } = this.props.actions;
    fetchMyFavorites(account.id);
  }

  render() {
    const { tweets, account } = this.props;
    const { fetchMyFavoritesOlderThan } = this.props.actions;

    return (
      <TweetsContainer
        tweets={tweets}
        fetchOldTweet={(offsetTweetId) => fetchMyFavoritesOlderThan(account.userId, offsetTweetId)}
        />
    );
  }

}

FavoritesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  tweets: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { favorites, accounts } = state;
  const { tweets } = favorites;
  const account = Accounts.fromJson(accounts).primary;

  return {
    account: account,
    tweets: tweets,
    title: 'Favorites',
    isLoading: tweets.length == 0
  };
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, favoriteActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainerWrapper(FavoritesContainer));
