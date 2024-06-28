import React from 'react';
import './salwar-saga-card.css';
import IconLeftChevron from '~/assets/icon_left_chevron.svg';
import IconRightChevron from '~/assets/icon_right_chevron.svg';
import {NavLink} from '@remix-run/react';

const SalwarSagaCard = ({menu, primaryDomain, publicStoreDomain}) => {
  if (!menu || !menu.items) return null;
  if (!primaryDomain || !publicStoreDomain) return null;
  // Find the SALWAR SAGA collection
  const collection = menu.items.find((item) => item.title === 'SALWAR SAGA');

  // Exit if collection or its resource is missing
  if (!collection || !collection.resource || !collection.resource.products)
    return null;

  // Extract titles from SALWAR SAGA items for caption and description
  const collectTitle = collection.items.map((item) => ({
    title: item.title,
    resource: item.resource, // Assuming resource contains title
  }));

  const {products} = collection.resource;

  // Prepare carouselData based on products
  const carouselData = products.nodes.map((product) => {
    const url =
      collection.url.includes('myshopify.com') ||
      collection.url.includes(publicStoreDomain) ||
      collection.url.includes(primaryDomain)
        ? new URL(collection.url).pathname
        : collection.url;
    return {
      caption: collectTitle[0]?.resource?.title || 'SALWAR SAGA',
      description: collectTitle[0].title || 'For The Exceptional You',
      leftImgSrc: collection.resource.image.url,
      rightImgSrc:
        product.images.nodes.length > 0 ? product.images.nodes[0].url : '',
      productUrl: url,
    };
  });

  return (
    <div className="carousel-container">
      <div
        id="imageCarousel"
        className="carousel slide pointer-event"
        data-bs-interval="2000"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {carouselData.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <div className="carousel-img-container d-flex justify-content-center">
                <div className="carousel-left">
                  <img
                    src={item.leftImgSrc}
                    style={{borderRadius: '0px'}}
                    className="d-block"
                    alt="Collection"
                  />
                </div>
                <div className="carousel-right">
                  <img
                    src={item.rightImgSrc}
                    style={{borderRadius: '0px'}}
                    className="d-block"
                    alt={item.caption}
                  />
                </div>
              </div>
              <div className="carousel-caption">
                <h5>{item.caption}</h5>
                <p>{item.description}</p>
                <NavLink
                  to={item.productUrl}
                  prefetch="intent"
                  style={{textDecoration: 'none'}}
                >
                  <button>EXPLORE MORE</button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#imageCarousel"
          data-bs-slide="prev"
        >
          <div className="carousel-control-icon">
            <img
              src={IconLeftChevron}
              className="mi-lg mi-chevron_left wh-24 d-inline-block"
              alt="Left Chevron"
            />
          </div>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#imageCarousel"
          data-bs-slide="next"
        >
          <div className="carousel-control-icon">
            <img
              src={IconRightChevron}
              className="mi-lg mi-chevron_right wh-24 d-inline-block"
              alt="Right Chevron"
            />
          </div>
        </button>

        {/* Carousel indicators */}
        <div id="carouselIndicators" className="carousel-indicators">
          {carouselData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide-to={index}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              className={`indicator ${index === 0 ? 'active' : ''}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalwarSagaCard;
