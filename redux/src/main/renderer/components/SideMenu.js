import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SideMenu extends Component {
  render() {
    const { account, onClickedNewTweet } = this.props;

    return (
      <div className="SideMenu">
        <ul className="Accounts">
          <li className="Accounts-item Accounts-item-selected">
            <img className="Accounts-item-avatar" src={account.profile_image_url}/>
          </li>
        </ul>
        <Link to="/">
          <div className="SideMenu-item">
            <i className="fa fa-home SideMenu-item-icon"></i>
          </div>
        </Link>
        <Link to="/favorites">
          <div className="SideMenu-item">
            <i className="fa fa-star SideMenu-item-icon"></i>
          </div>
        </Link>
        <Link to="/account-info">
          <div className="SideMenu-item">
            <i className="fa fa-user SideMenu-item-icon"></i>
          </div>
        </Link>

        <div className="SideMenu-item" onClick={onClickedNewTweet}>
          <i className="fa fa-pencil-square-o SideMenu-item-icon"></i>
        </div>
      </div>
    );
  }

}

SideMenu.propTypes = {
  account: PropTypes.object.isRequired,
  onClickedNewTweet: PropTypes.func.isRequired
};
