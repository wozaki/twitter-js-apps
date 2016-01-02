import React, { Component } from 'react';

export default class UnfavoriteButton extends Component {
  onUnfavoriteButtonClicked(event) {
    const { onUnfavoriteButtonClicked } = this.props;

    event.preventDefault();
    onUnfavoriteButtonClicked();
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
