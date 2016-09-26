import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SideMenu extends Component {
  render() {
    const { account, onClickedNewTweet } = this.props;
    const subAccountList = this._renderSubAccounts();

    return (
      <div className="SideMenu">
        <ul className="SideMenu-items">
          <li className="SideMenu-item">
            <img className="SideMenu-item-avatar" src={account.profileImageUrl}/>
          </li>
          <li className="SideMenu-item">
            <Link to="/">
              <i className="fa fa-home SideMenu-item-icon"></i>
            </Link>
          </li>
          <li className="SideMenu-item">
            <Link to="/favorites">
              <i className="fa fa-star SideMenu-item-icon"></i>
            </Link>
          </li>
          <li className="SideMenu-item">
            <Link to="/account-info">
              <i className="fa fa-user SideMenu-item-icon"></i>
            </Link>
          </li>
          <li className="SideMenu-item" onClick={onClickedNewTweet}>
            <i className="fa fa-pencil-square-o SideMenu-item-icon"></i>
          </li>
          {subAccountList}
        </ul>
      </div>
    );
  }

  _renderSubAccounts() {
    const { subAccounts, onClickSubAccount } = this.props;

    return subAccounts.map((account) => {
      return (
        <li className="SideMenu-item" onClick={() => onClickSubAccount(account)}>
          <img className="SideMenu-item-avatar" src={account.profileImageUrl}/>
        </li>
      )
    })
  }

}

SideMenu.propTypes = {
  account: PropTypes.object.isRequired,
  onClickedNewTweet: PropTypes.func.isRequired
};
