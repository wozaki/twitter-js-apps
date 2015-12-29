import React, { Component } from 'react';

export default class UnfavoriteButton extends Component {
  onUnfavoriteButtonClicked(event) {
  }

  render() {
    return(
      <i
        className="fa fa-star tweet-button-unfavorite"
        onClick={this.onUnfavoriteButtonClicked.bind(this)}
      />
    );
  }
}
