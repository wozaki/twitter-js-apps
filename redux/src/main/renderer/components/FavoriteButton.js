import React,{Component} from 'react'

export default class FavoriteButton extends Component {
    onFavoriteButtonClicked(event) {
        const { onFavoriteButtonClicked } = this.props;

        event.preventDefault();
        onFavoriteButtonClicked();
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
