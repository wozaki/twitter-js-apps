import React, { Component, PropTypes } from 'react';

export default class UserList extends Component {

  get renderItems() {
    const { users } = this.props;

    return users.map((user) => {
      return (
        <li className="UserItem" key={user.id_str}>
          <div className="UserItem-sub">
            <img className="UserItem-avatar" src={user.profile_image_url} height="48" width="48"/>
          </div>
          <div className="UserItem-main">
            <div className="UserItem-header">
              <div className="UserItem-names">
                <span className="UserItem-display-name">{user.name}</span>
                <span className="UserItem-screen-name">@{user.screen_name}</span>
              </div>
            </div>
            <p className="UserItem-description">{user.description}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="UserList">
        {this.renderItems}
      </ul>
    );
  }

}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profile_image_url: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired
    })
  ).isRequired
};
