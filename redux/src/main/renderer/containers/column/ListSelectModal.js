import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accounts } from '../../../domain/models/Accounts';
import { COLUMN_TYPE_LIST } from '../../../domain/models/Column';
import { fetchOwnLists } from '../../actions/lists';
import { addColumn } from '../../actions/columns';

import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(60, 60, 60, 0.75)'
  },
};

class ListSelectModal extends Component {
  componentWillMount() {
    const { account, fetchOwnLists } = this.props;
    fetchOwnLists(account.id);
  }

  render() {
    const { showModal, hideModal, lists, addColumn } = this.props;

    return (
      <Modal
        isOpen={showModal}
        // onAfterOpen={null}
        onRequestClose={hideModal}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <div>
          <ul className="lists">
            {lists.lists.map(l =>
              <li onClick={() => addColumn(COLUMN_TYPE_LIST, { listId: l.id_str, listName: l.name })}>
                {l.name}
              </li>
            )}
          </ul>
        </div>
      </Modal>
    )
  }
}

ListSelectModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchOwnLists: bindActionCreators(fetchOwnLists, dispatch),
  addColumn: bindActionCreators(addColumn, dispatch),
});

function mapStateToProps(state) {
  const { accounts, lists } = state;
  const _accounts           = Accounts.fromObjects(accounts);
  const account             = _accounts.primary;

  return {
    account: account,
    lists: lists,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectModal);
