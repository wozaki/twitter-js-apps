import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TweetsContainer from '../containers/TweetsContainer';

export default class HomeContainer extends Component {

  get title() {
    return 'Home';
  }

  render() {
    return (
      <main className="main">
        <Header title={this.title}/>
        <TweetsContainer />
      </main>
    );
  }
}

HomeContainer.propTypes = {
  account: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { account } = state;
  return {
    account: account
  };
}

export default connect(mapStateToProps)(HomeContainer);
