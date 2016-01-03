import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

export default class InfiniteScroll extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {isLoading: false};
    }

    componentDidUpdate() {
        const {loadCompleted} = this.props;

        if (loadCompleted && this.state.isLoading) {
            this.setState({isLoading: false});
        }
    }

    render() {
        const {children, className} = this.props;

        return (
            <div
                className={className}
                onScroll={this.onScrolled.bind(this)}
                >
                {children}
            </div>
        );
    }

    onScrolled() {
        const {children, onLoad, thresholdInPx} = this.props;
        const {scrollTop, scrollHeight, offsetHeight} = ReactDOM.findDOMNode(this);
        const restOfBottom = (scrollHeight - offsetHeight) - scrollTop;

        if (restOfBottom < thresholdInPx && !this.state.isLoading) {
            this.setState({isLoading: true});
            onLoad(_.last(children));
        }
    }

}

InfiniteScroll.defaultProps = {
    className: "infiniteScroll",
    loadCompleted: false,
    thresholdInPx: 200
};

InfiniteScroll.PropTypes = {
    onLoad: React.PropTypes.func.isRequired,
    children: PropTypes.node,
    className: React.PropTypes.string,
    loadCompleted: React.PropTypes.bool,
    thresholdInPx: React.PropTypes.number
};
