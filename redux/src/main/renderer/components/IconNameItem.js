import React, { Component, PropTypes } from 'react';

class IconNameItem extends Component {

  render() {
    const { account } = this.props;

    return (
      <div className="IconNameItem" key={account.id} style={{ display: 'flex', alignItems: 'center' }}>
        <div className="IconNameItem-icon" key={account.id}>
          <img className="IconNameItem-avatar" src={account.profileImageUrl} height="48" width="48"/>
        </div>
        <div className="IconNameItem-screen-name" style={{ marginLeft: '10px' }}>
          <span>{account.screenName}</span>
        </div>
      </div>
    );
  }

}

//TODO: Implement PropTypes

export default IconNameItem
