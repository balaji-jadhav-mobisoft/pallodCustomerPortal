import React from 'react';
import './editor-pick-carousal.css';
import {NavLink} from '@remix-run/react';

const EditorPickCarousel = ({collection, primaryDomain, publicStoreDomain}) => {
  // Map through collection items and create a list of editor pick items
  const editorPickItems = collection?.items.map((item) => {
    if (!item.url) return null;

    // Determine the URL path for the collection item
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomain)
        ? new URL(item.url).pathname
        : item.url;

    return {
      captionTitle: item.title,
      captionSubtitle: item.resource.title,
      src: item.resource.image.url,
      url: url,
      buttonText: 'SHOP NOW',
    };
  });

  // Function to render carousel items
  const renderCarouselItems = () =>
    editorPickItems.map((item, index) => (
      <div
        key={index}
        className={`carousel-item ${index === 0 ? 'active' : ''}`}
      >
        <div className="position-relative">
          <img src={item.src} alt={'pallod'} className="zoom-img" />
          <div className="position-absolute editor-pick-caption d-flex flex-column align-items-start">
            <h5>{item.captionTitle}</h5>
            <h3>{item.captionSubtitle}</h3>
            {/* <button>{item.buttonText}</button> */}
            <NavLink
              to={item.url}
              prefetch="intent"
              style={{textDecoration: 'none'}}
            >
              <button>{item.buttonText}</button>
            </NavLink>
          </div>
        </div>
      </div>
    ));

  // Function to render carousel indicators
  const renderCarouselIndicators = () =>
    editorPickItems.map((item, index) => (
      <button
        key={index}
        type="button"
        data-bs-target="#editorCarousel"
        data-bs-slide-to={index}
        aria-current={index === 0 ? 'true' : 'false'}
        aria-label={`Editor Slide ${index + 1}`}
        className={`indicator ${index === 0 ? 'active' : ''}`}
      ></button>
    ));

  return (
    <div className="editors-carousel-container main-container editor-pick-carousal-container">
      <div
        id="editorCarousel"
        className="carousel slide pointer-event"
        data-bs-interval="2000"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">{renderCarouselItems()}</div>
        <div id="editorCarouselIndicators" className="carousel-indicators">
          {renderCarouselIndicators()}
        </div>
      </div>
    </div>
  );
};

export default EditorPickCarousel;
