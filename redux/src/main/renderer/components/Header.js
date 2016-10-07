import React, { PropTypes } from 'react';

const Header = ({ title, searchBox }) => {
  return (
    <header className="Header">
      <h1 className="Header-title">
        {title}
      </h1>
      {searchBox}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBox: PropTypes.element
};

export default Header;
