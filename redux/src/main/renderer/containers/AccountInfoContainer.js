import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkItem from '../components/LinkItem';
import MainContainerWrapper from '../containers/MainContainerWrapper';
import { Accounts } from '../../domain/models/Accounts'

class AccountInfoContainer extends Component {
  render() {
    const { account } = this.props;

    // TODO: to component
    // TODO: title, use my
    return (
        <ul className="lists">
          <LinkItem label="Tweets" path={"/my-timeline"} count={account.tweetCount} />
          <LinkItem label="Followers" path={`/users/${account.id}/followers`} count={account.followersCount} />
          <LinkItem label="Following" path={"/followings"} count={account.followingCount} />
        </ul>
    );
  }
}

AccountInfoContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { accounts } = state;
  const account = Accounts.fromObjects(accounts).primary;

  return {
    account: account,
    title: account.screenName || ''
  };
}

export default connect(mapStateToProps)(MainContainerWrapper(AccountInfoContainer));
