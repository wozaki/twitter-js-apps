import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class AccountInfoContainer extends Component {
  render() {
    const { account } = this.props;

    return (
      <div className="application2">
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
