import React from 'react';
import './elegance-of-saree.css';
import EleganceBanner from '~/assets/elegance_banner.webp';
import {Link} from '@remix-run/react';

// Component to render the grid of saree images
const SareeImagesGrid = ({collection}) => {
  // Return null if collection or necessary properties are not available
  if (!collection || !collection.products || !collection.products.nodes)
    return null;

  // Extract images from the collection
  const images = collection.collection_banner_images?.references?.nodes || [];

  return (
    <div className="row">
      <div className="col-6 saree-elegance-img-container">
        <img src={images[0]?.image?.url} alt="Saree Elegance Image" />
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-12 saree-elegance-img-container mb-4">
            <img src={images[1]?.image?.url} alt="Saree Elegance Image" />
          </div>
          <div className="col-6 saree-elegance-img-container">
            <img src={images[2]?.image?.url} alt="Saree Elegance Image" />
          </div>
          <div className="col-6 saree-elegance-img-container">
            <img src={images[3]?.image?.url} alt="Saree Elegance Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to render the saree collection details
const SareeDetails = ({collection}) => (
  <div className="d-flex flex-column justify-content-center align-items-center saree-elegance-details">
    <img
      src={collection?.image?.url}
      height={40}
      width={40}
      className="mi-lg wh-40 align-middle d-inline-block me-2 bg-gold"
      alt="Collection Icon"
    />
    <h3>{collection.title}</h3>
    <p>{collection.description}</p>
    <Link to={`/collections/${collection.handle}`}>
      <button className="elegance-shop-now">SHOP NOW</button>
    </Link>
  </div>
);

// Component to render the saree banner
const SareeBanner = () => (
  <div className="saree-elegance-frame">
    <img src={EleganceBanner} alt="Saree Elegance Banner" />
  </div>
);

// Main component to render the Elegance of Saree section
const EleganceOfSaree = ({collection}) => {
  // Return null if collection is not provided
  if (!collection || !collection.collection) return null;
  console.log(collection, 'collection====');

  const collectionData = collection.collection;

  return (
    <div className="elegance-of-saree-container">
      {/* Desktop view */}
      <div className="d-flex position-relative saree-overlay-container">
        <div className="container saree-grid-overlay d-flex align-items-center">
          <SareeImagesGrid collection={collectionData} />
        </div>
        <SareeDetails collection={collectionData} />
        <SareeBanner />
      </div>

      {/* Responsive view */}
      <div className="saree-container-responsive d-none justify-content-center flex-column position-relative">
        <SareeDetails collection={collectionData} />
        <div
          className="d-flex justify-content-center scroll-img-section"
          style={{zIndex: 1}}
        >
          <div className="row saree-elegance-row">
            <SareeImagesGrid collection={collectionData} />
          </div>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{zIndex: 1}}
        >
          <Link to={`/collections/${collectionData.handle}`}>
            <button
              className="d-flex justify-content-center align-items-center wedding-special-shop-btn"
              id="saree-shop-btn"
            >
              SHOP NOW
            </button>
          </Link>
        </div>
        <SareeBanner />
      </div>
    </div>
  );
};

export default EleganceOfSaree;
