import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const defaultStyles = {
  borderRadius: '3px',
  display: 'inline-block',
  lineHeight: '1',
  overflow: 'hidden',
  verticalAlign: 'middle',
  height: '48',
  width: '48'
};

const UserAvatar = ({ user, style }) => {
  return (
    <Link to={`/users/${user.id_str}`}>
      <img
        style={Object.assign({}, defaultStyles, style)}
        src={user.profile_image_url}
      />
    </Link>
  );
};

UserAvatar.propTypes = {
  user: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired
  }).isRequired,
  style: PropTypes.object
};

export default UserAvatar
