import React from 'react';
import OccasionCard from './occasion-card';
import './shop-by-occasion.css';
import {NavLink} from '@remix-run/react';

const ShopByOccasion = ({menu, primaryDomain, publicStoreDomain}) => {
  // Ensure required props are provided
  if (!menu || !menu.items || !primaryDomain || !publicStoreDomain) return null;
  // Find the "Explore Our Collections" item in the menu
  const shopByOccasionCollection = menu.items.find(
    (item) => item.title === 'Shop By Occasion',
  );
  const occasionItems = shopByOccasionCollection.items.map((item) => {
    if (!item.url) return null;

    return {
      title: item.title,
      src: item.resource.image.url,
      alt: item.title,
      linkText: 'SHOP NOW',
    };
  });
  // Determine the URL path for the collection item
  const shopByOccasionCollectionUrl =
    shopByOccasionCollection.url.includes('myshopify.com') ||
    shopByOccasionCollection.url.includes(publicStoreDomain) ||
    shopByOccasionCollection.url.includes(primaryDomain)
      ? new URL(shopByOccasionCollection.url).pathname
      : shopByOccasionCollection.url;

  return (
    <div className="shop-by-occasion-container">
      <div className="d-flex justify-content-center mb-3 position-relative shop-by-occasion-header">
        <div className="section-header mb-0">
          {shopByOccasionCollection.title}
        </div>
        <NavLink
          to={shopByOccasionCollectionUrl}
          prefetch="intent"
          style={{textDecoration: 'none'}}
          className="position-absolute bottom-0 end-0 view-all-btn occasion-view-all"
        >
          VIEW ALL
        </NavLink>
      </div>
      <OccasionCard occasionItems={occasionItems} itemsPerPage={3} />
    </div>
  );
};

export default ShopByOccasion;
