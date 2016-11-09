import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SideMenu = ({ account, onClickSubAccount, subAccounts }) => {

  const renderSubAccounts = () => {
    return subAccounts.map((account) => {
      return (
        <li className="SideMenu-item" onClick={() => onClickSubAccount(account)}>
          <img className="SideMenu-item-avatar" src={account.profileImageUrl}/>
        </li>
      )
    })
  };

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
        {renderSubAccounts()}
      </ul>
    </div>
  );
};

SideMenu.propTypes = {
  account: PropTypes.object.isRequired,
};

export default SideMenu
