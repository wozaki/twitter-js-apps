import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class InfiniteScroll extends Component {

  onScrolled() {
    const { children, onLoad, thresholdInPx } = this.props;
    const { scrollTop, scrollHeight, offsetHeight } = ReactDOM.findDOMNode(this);
    const restOfBottom = (scrollHeight - offsetHeight) - scrollTop;

    if (restOfBottom < thresholdInPx) {
      onLoad(_.last(children));
    }
  }

  render() {
    const { children, className, interval } = this.props;

    return (
      <div
        className={className}
        onScroll={_.throttle(this.onScrolled.bind(this), interval)}
      >
        {children}
      </div>
    );
  }

}

InfiniteScroll.defaultProps = {
  className: 'infiniteScroll',
  thresholdInPx: 200,
  interval: 200
};

InfiniteScroll.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  children: PropTypes.node,
  className: React.PropTypes.string,
  thresholdInPx: React.PropTypes.number,
  interval: React.PropTypes.number
};
