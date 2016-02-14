import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkItem from '../components/LinkItem';
import MainContainerWrapper from '../containers/MainContainerWrapper';

class AccountInfoContainer extends Component {
  render() {
    const { account } = this.props;

    // TODO: to component
    // TODO: title, use my
    return (
        <ul className="lists">
          <LinkItem label="Tweets" path={"/my-timeline"} count={account.tweet_count} />
          <LinkItem label="Followers" count={account.followers_count} />
          <LinkItem label="Following" count={account.following_count} />
        </ul>
    );
  }
}

AccountInfoContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { account } = state;
  return {
    account: account,
    title: account.screen_name || ''
  };
}

export default connect(mapStateToProps)(MainContainerWrapper(AccountInfoContainer));
