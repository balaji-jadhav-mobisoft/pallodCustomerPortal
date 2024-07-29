import React from 'react';
import WardrobeCarousal from '~/components/common/wardrobe-carousal/wardrobe-carousal';

const TrendingKurtis = ({collection}) => {
  // Return null if required props are not provided
  if (!collection) return null;

  // Extract products from the collection
  const products = collection?.collection?.products.nodes || [];

  // Map products to trendingKurtisItem with necessary properties
  const trendingKurtisItem = products.map((product) => {
    if (!product) return null;

    return {
      src: product.images.nodes[0]?.url,
      hoverSrc: product.images.nodes[0]?.url,
      description: product.description,
      handle: product.handle,
    };
  });

  return (
    <>
      <WardrobeCarousal
        wardrobeItems={trendingKurtisItem}
        collection={collection}
        wishList={false}
      />
    </>
  );
};

export default TrendingKurtis;
