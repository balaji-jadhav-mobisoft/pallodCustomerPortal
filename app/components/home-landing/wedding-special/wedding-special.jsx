import React from 'react';
import SpecialWeddingFrame from '~/assets/wedding_special_frame.svg';
import './wedding-special.css';
import {NavLink} from '@remix-run/react';
import {Link} from 'react-router-dom';

// Component to render individual images
const WeddingSpecialImage = ({image}) => (
  <div className="col-4 wedding-special-img-container">
    <img src={image.url} alt="Wedding Special Image" />
  </div>
);

// Component to render the details of the wedding special
const WeddingSpecialDetails = ({
  title,
  description,
  unionSVGIcon,
  collection,
}) => (
  <div className="d-flex flex-column justify-content-center align-items-center wedding-special-details">
    <img
      height={35}
      width={35}
      src={unionSVGIcon}
      className="mi-lg wh-40 align-middle d-inline-block me-2"
      alt="Icon"
    />
    <h3>{title}</h3>
    <p>{description}</p>
    <Link to={`/collections/${collection?.collection?.handle}`}>
      <button className="wedding-special-shop-btn">SHOP NOW</button>
    </Link>
  </div>
);

// Main component to render the wedding special section
const WeddingSpecial = ({collection, primaryDomain, publicStoreDomain}) => {
  // Return null if any required prop is missing
  if (!collection || !primaryDomain || !publicStoreDomain) return null;

  // Destructure collection properties for easier access
  const {title, description, image, products} = collection?.collection || {};
  const unionSVGIcon = image?.url || '';
  const images = products?.nodes[0].images.nodes;

  return (
    <div className="wedding-special-main-container">
      <div className="d-flex wedding-special-container">
        <div className="container img-grid-overlay d-flex align-items-center">
          <div className="row">
            {/* Render the first three images */}
            {images?.slice(0, 3).map((image, index) => (
              <WeddingSpecialImage key={index} image={image} />
            ))}
          </div>
        </div>
        {/* Render the wedding special details */}
        <WeddingSpecialDetails
          collection={collection}
          title={title}
          description={description}
          unionSVGIcon={unionSVGIcon}
        />
        {/* Background frame image */}
        <div className="wedding-special-frame">
          <img src={SpecialWeddingFrame} alt="Wedding Special Background" />
        </div>
      </div>

      {/* Responsive view for smaller screens */}
      <div className="wedding-container-responsive d-none justify-content-center flex-column position-relative">
        {/* Render the wedding special details */}
        <WeddingSpecialDetails
          title={title}
          description={description}
          unionSVGIcon={unionSVGIcon}
        />
        <div
          className="d-flex overflow-auto justify-content-center scroll-img-section"
          style={{zIndex: 1}}
        >
          {/* Render all images in a scrollable section */}
          {images?.map((image, index) => (
            <WeddingSpecialImage key={index} image={image} />
          ))}
        </div>
        <Link
          className="d-flex justify-content-center align-items-center"
          style={{zIndex: 1}}
          to={`/collections/${collection?.collection?.handle}`}
        >
          <button
            className="d-flex justify-content-center align-items-center wedding-special-shop-btn"
            id="wedding-special-btn"
          >
            SHOP NOW
          </button>
        </Link>
        {/* Background frame image */}
        <div className="wedding-special-frame w-100">
          <img src={SpecialWeddingFrame} alt="Wedding Special Background" />
        </div>
      </div>
    </div>
  );
};

export default WeddingSpecial;
