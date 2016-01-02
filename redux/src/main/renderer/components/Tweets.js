import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

export default class Tweets extends Component {

    render() {
        return (
            <div className="tweets">
                {this.props.children}
            </div>
        );
    }
}

Tweets.propTypes = {
    children: PropTypes.node
};
