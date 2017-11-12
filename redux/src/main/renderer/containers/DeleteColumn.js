import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteColumn } from '../actions/columns'

class DeleteColumn extends Component {

  render() {
    const { deleteColumn, columnId } = this.props;
    console.log("columnId!!", columnId)

    return (
      <i
        className="fa fa-times-circle-o"
        ariaHidden="true"
        onClick={() => deleteColumn(columnId)}
      />
    )
  }
}


function mapStateToProps(state, props) {
  return {
    columnId: props.columnId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteColumn: bindActionCreators(deleteColumn, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteColumn);
