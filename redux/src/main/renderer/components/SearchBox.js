import React, { Component } from 'react';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { queryString: '' };
  }

  onSearchQueryStringChanged(event) {
  }

  onSubmitted(event) {
  }

  render() {
    return (
      <form className="header-search-box" onSubmit={this.onSubmitted.bind(this)}>
        <i className="fa fa-search header-search-icon "/>
        <input
          className="header-search-text-field"
          id="search-text-field"
          onChange={this.onSearchQueryStringChanged.bind(this)}
          placeholder="Search"
          tabIndex="-1"
          type="text"
          value={this.state.queryString}
          />
      </form>
    );
  }
}
