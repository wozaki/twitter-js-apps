import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class InfiniteScroll extends Component {

  componentWillReceiveProps(nextProps) {
    const currentChildren = this.props.children;
    const nextChildren    = nextProps.children;

    if (currentChildren != nextChildren) {
      this.state = { isLoading: false };
    }
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: false, lastScrollTop: 0 };
  }

  onScrolled() {
    const { children, onLoad, thresholdInPx }       = this.props;
    const { isLoading }                             = this.state;
    const { scrollTop, scrollHeight, offsetHeight } = ReactDOM.findDOMNode(this);
    const restOfBottom                              = (scrollHeight - offsetHeight) - scrollTop;

    if (isLoading == false && restOfBottom < thresholdInPx && this._isDownScroll(scrollTop)) {
      this.setState({ isLoading: true });
      onLoad(_.last(children));
    }

    this.setState({ lastScrollTop: scrollTop });
  }

  _isDownScroll = (scrollTop) => {
    const { lastScrollTop } = this.state;
    return scrollTop > lastScrollTop;
  };

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
  onLoad: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  thresholdInPx: PropTypes.number,
  interval: PropTypes.number
};
