import React from 'react';
import LoaderIcon from '~/assets/spinner.gif';
import './loader.css';

const Loader = () => (
  <div className="loader-container">
    <img
      src={LoaderIcon}
      height={50}
      width={50}
      alt="Loading..."
      className="loader-icon"
    />
  </div>
);

export default Loader;
