import React from 'react';
import Carousal from '~/components/common/carousal/carousal';

const ShopByOccasion = ({menu, primaryDomain, publicStoreDomain}) => {
  // Ensure required props are provided
  if (!menu || !menu?.items || !primaryDomain || !publicStoreDomain)
    return null;
  // Find the "Explore Our Collections" item in the menu
  const shopByOccasionCollection = menu?.items.find(
    (item) => item.title === 'Shop By Occasion',
  );

  const occasionItems = shopByOccasionCollection?.items?.map((item) => {
    if (!item.url) return null;
    // Determine the URL path for the collection item
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomain)
        ? new URL(item.url).pathname
        : item.url;
    return {
      title: item.title,
      src: item?.resource?.image?.url,
      alt: item.title,
      linkText: 'SHOP NOW',
      url: url,
    };
  });

  // Determine the URL path for the collection item
  const shopByOccasionCollectionUrl =
    shopByOccasionCollection?.url.includes('myshopify.com') ||
    shopByOccasionCollection?.url.includes(publicStoreDomain) ||
    shopByOccasionCollection?.url.includes(primaryDomain)
      ? new URL(shopByOccasionCollection?.url).pathname
      : shopByOccasionCollection?.url;

  return (
    <div>
      <Carousal
        occasionItems={occasionItems}
        itemsPerPage={3}
        url={shopByOccasionCollectionUrl}
        title={shopByOccasionCollection?.title}
        leftIcon={true}
        rightIcon={true}
      />
    </div>
  );
};

export default ShopByOccasion;
