import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    const { searchBox } = this.props;

    return (
      <header className="Header">
        <h1 className="Header-title">
          {this.props.title}
        </h1>
        {searchBox}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBox: PropTypes.element
};
