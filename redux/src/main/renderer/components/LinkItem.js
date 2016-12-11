import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LinkItem = ({ path, label, count, query }) => {
  // TODO: use LINK in react-router
  // TODO: separate label and count by element
  return (
    <li>
      <Link to={path || ""} className="LinkItem" query={query} >
        <p className="LinkItem-label">
          {label}
        </p>

        <div className="LinkItem-rightContents">
          <span className="LinkItem-count">{Number(count).toLocaleString()}</span>
          <i className="fa fa-chevron-right"></i>
        </div>
      </Link>
    </li>
  );
};

LinkItem.propTypes = {
  path: PropTypes.string, // TODO isRequired
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  query: PropTypes.object
};

export default LinkItem
