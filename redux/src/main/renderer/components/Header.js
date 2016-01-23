import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const { searchBox } = this.props;

    return (
      <header className="header">
        <h1 className="header-title">
          {this.props.title}
        </h1>
        {searchBox}
      </header>
    );
  }
}
