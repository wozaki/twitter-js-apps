import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import * as swipeNavigator from '../registries/swipeNavigator';

export default function (InnerComponent) {

  class MainContainerWrapper extends Component {

    componentDidMount() {
      const { navigatableBySwipe } = this.props;
      if (navigatableBySwipe) {
        swipeNavigator.register(this.mainDOM)
      }
    }

    render() {
      const { title, isLoading, deleteColumnButton } = this.props;

      return (
        <div
          className="Main"
          ref={(node) => { this.mainDOM = node }}>
          <Header title={title} deleteColumnButton={deleteColumnButton} />
          {isLoading ? <Spinner /> : null}
          <InnerComponent {...this.props} />
        </div>
      );
    }
  }

  MainContainerWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    navigatableBySwipe: PropTypes.bool,
    deleteColumnButton: PropTypes.element
  };

  MainContainerWrapper.defaultProps = {
    isLoading: false,
    navigatableBySwipe: false
  };

  return MainContainerWrapper;

}
