import React, { Component } from 'react';
import { Link } from 'react-router'

export default class SideMenu extends Component {
    render() {
        const {account} = this.props;

        return (
            <div className="sideMenu">
                <ul className="accounts">
                    <li className="accounts-item accounts-item-selected">
                        <img className="accounts-item-avatar" src={account.profile_image_url}/>
                    </li>
                </ul>
                <Link to="/">
                    <div className="sideMenu-item">
                        <i className="fa fa-home sideMenu-item-icon"></i>
                    </div>
                </Link>
                <Link to="/account-info">
                    <div className="sideMenu-item">
                        <i className="fa fa-user sideMenu-item-icon"></i>
                    </div>
                </Link>
            </div>
        );
    }
}
