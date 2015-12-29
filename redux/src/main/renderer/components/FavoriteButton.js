import React,{Component} from 'react'

export default class FavoriteButton extends Component {
    onFavoriteButtonClicked(event) {
        event.preventDefault();
    }

    render() {
        return (
            <i
                className="fa fa-star tweet-button-favorite"
                onClick={this.onFavoriteButtonClicked.bind(this)}
                />
        );
    }
}
