import React from 'react';
import SampleImage1 from '~/assets/Carousel_Left_3x.webp';
import SampleImage2 from '~/assets/Carousel_Right_3x.webp';
import './our-collection.css';

const OurCollection = ({menu, primaryDomain, publicStoreDomain}) => {
  if (!menu || !menu.items) return null;
  const collection = menu.items.find(
    (item) => item.title === 'Explore Our Collections',
  );
  console.log(collection, 'cplol');
  const collections = [
    {
      src: SampleImage1,
      alt: 'PALLOD',
      caption: 'Sarees',
    },
    {
      src: SampleImage2,
      alt: 'PALLOD',
      caption: 'Lehenga',
    },
    {
      src: SampleImage1,
      alt: 'PALLOD',
      caption: 'Indo Western',
    },
    {
      src: SampleImage2,
      alt: 'PALLOD',
      caption: 'Kurtis',
    },
    {
      src: SampleImage1,
      alt: 'PALLOD',
      caption: 'Salwar Kameez',
    },
    {
      src: SampleImage2,
      alt: 'PALLOD',
      caption: 'Occasion',
    },
  ];

  const generateCollectionItem = ({src, alt, caption}) => (
    <div className="col-4 collection-img-container">
      <div className="img-wrapper">
        <img src={src} alt={alt} className="zoom-img" />
        <div className="img-caption">{caption}</div>
      </div>
    </div>
  );

  const generateResponsiveCollectionItem = ({src, alt, caption}) => (
    <div className="collection-img-container">
      <div className="img-wrapper">
        <img src={src} alt={alt} className="zoom-img" />
        <div className="img-caption">{caption}</div>
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="section-header d-flex justify-content-center">
        Explore Our Collections
      </h3>
      <div className="container-fluid collection-grid">
        <div className="row" id="collectionGrid">
          {collections.map((item) => generateCollectionItem(item))}
        </div>
      </div>
      <div
        className="container-fluid d-none scroll-img-section overflow-auto collection-grid collection-grid-responsive"
        id="collectionGridResponsive"
      >
        {collections.map((item) => generateResponsiveCollectionItem(item))}
      </div>
    </div>
  );
};

export default OurCollection;
