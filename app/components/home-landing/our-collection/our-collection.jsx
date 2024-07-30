import React from 'react';
import './our-collection.css';
import {NavLink} from '@remix-run/react';

const OurCollection = ({menu, primaryDomain, publicStoreDomain}) => {
  if (!menu || !menu?.items || !primaryDomain || !publicStoreDomain)
    return null;

  // Find the "Explore Our Collections" item in the menu
  const collection = menu?.items.find(
    (item) => item.title === 'Explore Our Collections',
  );
  console.log(collection, 'collection');
  if (!collection) return null;

  // Map collection items to include necessary information
  const collections = collection?.items
    .map((item) => {
      if (!item.url) return null;

      // Determine the URL path for the collection item
      const url =
        item.url.includes('myshopify.com') ||
        item.url.includes(publicStoreDomain) ||
        item.url.includes(primaryDomain)
          ? new URL(item.url).pathname
          : item.url;

      // Return the collection item with required properties
      return {
        src: item.resource?.image?.url || '',
        alt: 'PALLOD',
        caption: item.title,
        collectionUrl: url,
      };
    })
    .filter((item) => item !== null);

  // Generate a collection item for the desktop view
  const generateCollectionItem = ({src, alt, caption, collectionUrl}) => (
    <div className="col-4 collection-img-container">
      <NavLink
        to={collectionUrl}
        prefetch="intent"
        style={{textDecoration: 'none'}}
      >
        <div className="img-wrapper">
          <img src={src} alt={alt} className="zoom-img" />
          <div className="img-caption">{caption}</div>
        </div>
      </NavLink>
    </div>
  );

  // Generate a collection item for the responsive (mobile) view
  const generateResponsiveCollectionItem = ({
    src,
    alt,
    caption,
    collectionUrl,
  }) => (
    <div className="collection-img-container">
      <NavLink
        to={collectionUrl}
        prefetch="intent"
        style={{textDecoration: 'none'}}
      >
        <div className="img-wrapper">
          <img src={src} alt={alt} className="zoom-img" />
          <div className="img-caption">{caption}</div>
        </div>
      </NavLink>
    </div>
  );

  return (
    <div className="our-collection-container">
      <h3 className="section-header d-flex justify-content-center">
        {collection.title}
      </h3>
      <div className="container-fluid collection-grid">
        <div className="row" id="collectionGrid">
          {collections.map((item, index) => (
            <React.Fragment key={index}>
              {generateCollectionItem(item)}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        className="container-fluid d-none scroll-img-section overflow-auto collection-grid collection-grid-responsive"
        id="collectionGridResponsive"
      >
        {collections.map((item, index) => (
          <React.Fragment key={index}>
            {generateResponsiveCollectionItem(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OurCollection;
