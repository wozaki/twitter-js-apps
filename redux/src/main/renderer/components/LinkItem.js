import React, { Component, PropTypes } from 'react';

export default class LinkItem extends Component {

  render() {
    const { path, label, count } = this.props;

    // TODO: use LINK in react-router
    // TODO: separate label and count by element
    return (
      <li className="LinkItem">
        <p className="LinkItem-label">
          {label}
        </p>

        <div className="LinkItem-rightContents">
          <span className="LinkItem-count">{count}</span>
          <i className="fa fa-chevron-right"></i>
        </div>
      </li>
    );
  }
}

LinkItem.propTypes = {
  path: PropTypes.string, // TODO isRequired
  label: PropTypes.string.isRequired,
  count: PropTypes.number
};
