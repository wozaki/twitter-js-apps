import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

export default class AccountInfoContainer extends Component {
  render() {
    const { account } = this.props;

    //TODO: to component
    return (
      <div className="main">
        <Header title={account.name}/>
        <ul class="lists">
          <li>Tweets {account.tweet_count}</li>
          <li>Followers {account.followers_count}</li>
          <li>Following {account.following_count}</li>
        </ul>
      </div>
    );
  }
}

AccountInfoContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { account } = state;
  return {
    account: account
  };
}

export default connect(mapStateToProps)(AccountInfoContainer);
