import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import SideMenuContainer from '../containers/SideMenuContainer';
import * as dialogService from '../registries/dialogService';

class AppContainer extends Component {
  componentDidMount() {
    const { setUp } = this.props.actions;

    setUp(registries.credential);
  }

  showErrorDialogIfNeeded() {
    const { errorMessage } = this.props;

    if (errorMessage.content) {
      dialogService.showErrorDialog({ title: errorMessage.title, body: errorMessage.content });
    }
  }

  render() {
    const { children } = this.props;

    this.showErrorDialogIfNeeded();

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
  const { errorMessage } = state;
  return {
    errorMessage: errorMessage
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
