import React, { Component } from 'react';

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
            </div>
        );
    }
}
