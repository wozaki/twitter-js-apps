import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import LinkItem from '../components/LinkItem';

class AccountInfoContainer extends Component {
  render() {
    const { account } = this.props;

    // TODO: to component
    // TODO: title, use my
    return (
      <div className="Main">
        <Header title={account.screen_name}/>
        <ul className="lists">
          <LinkItem label="Tweets" path={"/my-timeline"} count={account.tweet_count} />
          <LinkItem label="Followers" count={account.followers_count} />
          <LinkItem label="Following" count={account.following_count} />
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
