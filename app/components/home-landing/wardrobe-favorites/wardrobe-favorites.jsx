import React from 'react';
import WardrobeCarousal from '~/components/common/wardrobe-carousal/wardrobe-carousal';

const WardrobeFavorites = ({collection, primaryDomain, publicStoreDomain}) => {
  // Return null if required props are not provided
  if (!collection || !primaryDomain || !publicStoreDomain) return null;

  // Extract products from the collection
  const products = collection?.collection?.products?.nodes || [];

  // Map products to wardrobeItems with necessary properties
  const wardrobeItems = products?.map((product) => {
    if (!product) return null;

    const originalPrice = parseFloat(
      product.compareAtPriceRange.maxVariantPrice.amount,
    );
    const discountedPrice = parseFloat(
      product.priceRange.minVariantPrice.amount,
    );
    const discountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;

    return {
      src: product.images.nodes[0]?.url,
      hoverSrc: product.images.nodes[1]?.url,
      title: product.title,
      description: product.description,
      productPrice: originalPrice,
      discountPrice: discountedPrice,
      discount: `${discountPercentage.toFixed(0)}% OFF`,
      isBestSeller: product.tags.includes('Best Seller'),
      isNew: product.tags.includes('New'),
    };
  });

  return (
    <>
      <WardrobeCarousal
        wardrobeItems={wardrobeItems}
        collection={collection}
        wishList={true}
      />
    </>
  );
};

export default WardrobeFavorites;
