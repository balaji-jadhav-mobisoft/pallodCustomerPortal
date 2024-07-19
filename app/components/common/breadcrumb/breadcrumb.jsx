import {Link} from '@remix-run/react';
import React from 'react';
import './breadcrumb.css';

const Breadcrumb = ({items}) => {
  return (
    <nav
      style={{'--bs-breadcrumb-divider': "'>'"}}
      aria-label="breadcrumb"
      className="main-container breadcrumb-container mb-0"
    >
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === items.length - 1 ? 'active' : ''
            }`}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {index === items.length - 1 ? (
              item.name
            ) : (
              <Link to={item.href}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
