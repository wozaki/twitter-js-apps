import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MockActions from '../actions/mocks'

class App extends Component {
    render() {
        const { mocks, actions } = this.props;
        return (
            <div>ho2
            </div>
        )
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        mocks: state.mocks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(MockActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
