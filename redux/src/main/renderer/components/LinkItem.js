import React, { Component, PropTypes } from 'react';

export default class LinkItem extends Component {

  render() {
    const { path, label, count } = this.props;

    // TODO: use LINK in react-router
    // TODO: separate label and count by element
    return (
      <li>{label} {count}</li>
    );
  }
}

LinkItem.propTypes = {
  path: PropTypes.string, // TODO isRequired
  label: PropTypes.string.isRequired,
  count: PropTypes.number
};
