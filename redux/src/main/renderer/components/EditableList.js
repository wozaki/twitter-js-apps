import _ from 'lodash';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

/**
 * ref https://github.com/nylas/N1/blob/39e5a2ee962238648af945260280d62541417434/src/components/editable-list.jsx
 */
class EditableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropInsertionIndex: -1,
      editingIndex: -1,
      creatingItem: false,
    };
  }

  _getSelectedItem() {
    const { selected } = this.state;
    const { items } = this.props;

    if (selected) {
      return selected;
    } else {
      return _.head(items);
    }
  };

  _selectItem(item, idx) {
    const { onSelectItem } = this.props;

    if (onSelectItem) {
      onSelectItem(item, idx);
    } else {
      this.setState({ selected: item });
    }
  };

  _onItemClick(event, item, idx) {
    this._selectItem(item, idx);
  };

  _onCreateItem() {
    const { onCreateItem } = this.props;

    if (onCreateItem) {
      onCreateItem();
    } else {
      this.setState({ creatingItem: true });
    }
  };

  _onDeleteItem() {
    const selectedItem = this._getSelectedItem();
    const index = this.props.items.indexOf(selectedItem);
    if (selectedItem) {
      // Move the selection 1 up or down after deleting
      const newIndex = index === 0 ? index + 1 : index - 1;
      this.props.onDeleteItem(selectedItem, index);
      if (this.props.items[newIndex]) {
        this._selectItem(this.props.items[newIndex], newIndex);
      }
    }
  };

  _renderItem(item, idx, { editingIndex } = this.state, handlers = {}) {
    const onClick = handlers.onClick || this._onItemClick.bind(this);
    let itemContent = this.props.itemContent(item);

    const classes = classNames({
      'list-item': true,
      'is-selected': item === this._getSelectedItem(),
      'editing': idx === editingIndex,
      'with-edit-icon': this.props.showEditIcon && editingIndex !== idx,
    });

    return (
      <div
        className={classes}
        key={idx}
        data-item-idx={idx}
        onClick={_.partial(onClick, _, item, idx)}
      >
        {itemContent}
      </div>
    );
  };

  _renderButtons() {
    const deleteClasses = classNames({
      'btn-editable-list': true,
      'btn-disabled': !this._getSelectedItem(),
    });
    return (
      <div className="buttons-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="btn-editable-list"
          onClick={this._onCreateItem.bind(this)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '30px',
            width: '30px',
            lineHeight: '30px',
            fontSize: '1.3em'
          }}>
          <span>+</span>
        </div>
        <div className={deleteClasses} onClick={this._onDeleteItem.bind(this)}>
          <span>—</span>
        </div>
      </div>
    );
  };

  render() {
    const items = this.props.items.map((item, idx) => this._renderItem(item, idx));

    return (
      <div className="EditableList">
        <div className="EditableList-items-wrapper">
        {items}
        </div>
        {this._renderButtons()}
      </div>
    );
  }

}

EditableList.propTypes = {
  items: PropTypes.array.isRequired,
  itemContent: PropTypes.func,
  className: PropTypes.string,
  showEditIcon: PropTypes.bool,
  createInputProps: PropTypes.object,
  onCreateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onReorderItem: PropTypes.func,
  onItemEdited: PropTypes.func,
  onItemCreated: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelectItem: PropTypes.func,
};

EditableList.defaultProps = {
  items: [],
  itemContent: (item) => item,
  className: '',
  createInputProps: {},
  showEditIcon: false,
  onDeleteItem: () => {
  },
  onItemEdited: () => {
  },
  onItemCreated: () => {
  },
};

export default EditableList;
