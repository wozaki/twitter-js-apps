import React,{Component, PropTypes} from 'react'

export default class ToggleFavoriteButton extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    initialState() {
        const { isFavorited } = this.props;

        return {isFavorited: isFavorited};
    }

    onFavoriteButtonClicked(event) {
        const { toggleFavorite } = this.props;
        const isFavoritedNow = this.isFavorited();

        event.preventDefault();
        toggleFavorite(isFavoritedNow);
        this.setState({isFavorited: !isFavoritedNow});
    }

    isFavorited() {
        return this.state.isFavorited;
    }

    get buttonClassName() {
        const defaultNames = ["fa", "fa-star"];
        const appendName = this.isFavorited()
            ? "tweet-button-unfavorite"
            : "tweet-button-favorite";

        return defaultNames.concat(appendName).join(" ");
    }

    render() {
        return (
            <i
                className={this.buttonClassName}
                onClick={this.onFavoriteButtonClicked.bind(this)}
                />
        );
    }
}

ToggleFavoriteButton.propTypes = {
    isFavorited: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired
};
