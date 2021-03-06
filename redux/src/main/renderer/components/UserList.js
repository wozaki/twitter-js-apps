import React, { PropTypes } from 'react';
import UserAvatar from './UserAvatar'

const UserList = ({ users }) => {

  const renderItems = () => {

    return users.map((user) => {
      return (
        <li className="UserItem" key={user.id_str}>
          <div className="UserItem-sub">
            <UserAvatar user={user} />
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
  };

  return (
    <ul>
      {renderItems()}
    </ul>
  );

};

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

export default UserList
