import React from 'react';
import './salwar-saga-card.css';
import IconLeftChevron from '~/assets/icon_left_chevron.svg';
import IconRightChevron from '~/assets/icon_right_chevron.svg';
import {NavLink} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

const SalwarSagaCard = ({menu, primaryDomain, publicStoreDomain}) => {
  if (!menu || !menu?.items) return null;
  if (!primaryDomain || !publicStoreDomain) return null;
  // Find the SALWAR SAGA collection
  // const collection = menu?.items.find((item) => item.title === 'SALWAR SAGA');
  const collection = menu?.items.find(
    (item) => item.title === 'Home screen main carousel',
  );

  // Exit if collection or its resource is missing
  if (!collection || !collection.resource || !collection.resource.products)
    return null;

  const carouselData = collection?.items.map((item) => {
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomain)
        ? new URL(item.url).pathname
        : item.url;
    return {
      caption: item.resource.title,
      resource: item.resource,
      leftImgSrc:
        item.resource.collection_background_image.reference?.image.url,
      rightImgSrc:
        item.resource.collection_banner_images.references?.nodes[0]?.image?.url,
      description: item.title,
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
                  <Image
                    src={item.leftImgSrc}
                    style={{borderRadius: '0px'}}
                    className="d-block"
                    alt="Collection"
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
                <div className="carousel-right">
                  <Image
                    src={item.rightImgSrc}
                    style={{borderRadius: '0px'}}
                    className="d-block"
                    alt={item.caption}
                    sizes="(max-width: 600px) 100vw, 50vw"
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
