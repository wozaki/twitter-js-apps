import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import Spinner from '../components/Spinner';

export default function (InnerComponent) {

  class MainContainerWrapper extends Component {
    render() {
      const { title, isLoading } = this.props;

      return (
        <div className="Main">
          <Header title={title}/>
          {isLoading ? <Spinner /> : null}
          <InnerComponent {...this.props} />
        </div>
      );
    }
  }

  InnerComponent.propTypes = {
    title: PropTypes.string.isRequired,
    isLoading: PropTypes.bool
  };

  InnerComponent.defaultProps = {
    isLoading: false
  };

  return MainContainerWrapper;

}
