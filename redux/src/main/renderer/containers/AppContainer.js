import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import SideMenuContainer from '../containers/SideMenuContainer';

class AppContainer extends Component {
  componentDidMount() {
    const { setUp } = this.props.actions;

    setUp();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="Application">
        <SideMenuContainer />
        {children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, appActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account: account
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
