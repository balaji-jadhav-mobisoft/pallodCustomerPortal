import React from 'react';
import LoaderIcon from '~/assets/Iphone-spinner-2 (1).gif';
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
