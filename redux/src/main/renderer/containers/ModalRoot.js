import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ListSelectModal from './column/ListSelectModal'

const MODAL_COMPONENTS = {
  ListSelectModal,
};

//ref: https://stackoverflow.com/a/35641680
const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span/> //TODO return null after version 15
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />
};

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
};

export default connect(
  state => state.modal
)(ModalRoot)
