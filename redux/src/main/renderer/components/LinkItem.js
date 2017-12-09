import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Link } from 'react-router-dom'

const LinkItem = ({ path, label, count, query }) => {
  // TODO: separate label and count by element
  return (
    <li>
      <Link to={path || ""} className="LinkItem" query={query} >
        <div>
          <p className="LinkItem-label">
            {label}
          </p>

          <div className="LinkItem-rightContents">
            <span className="LinkItem-count">{count && Number(count).toLocaleString()}</span>
            <i className="fa fa-chevron-right"></i>
          </div>
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
