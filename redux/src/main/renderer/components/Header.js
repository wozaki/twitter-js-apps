import React, { PropTypes } from 'react';

const Header = ({ title, searchBox, deleteColumnButton }) => {

  return (
    <header className="Header">
      <h1 className="Header-title">
        {title}
      </h1>
      <div className="Header-rightMenu">
        {searchBox}
        {deleteColumnButton}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBox: PropTypes.element,
  deleteColumnButton: PropTypes.element
};

export default Header;
