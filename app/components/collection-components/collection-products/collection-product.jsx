import React, {useState, useEffect} from 'react';
import './collection-products.css';
import wishListIcon from '~/assets/wishList-icon.svg';
import {Pagination} from '@shopify/hydrogen';
import NoImage from '~/assets/no-img.png';

const CollectionProductList = ({collection}) => {
  const [colClass, setColClass] = useState('col-4');
  const [allItems, setAllItems] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    function getColClass() {
      const width = window.innerWidth;
      if (width < 740) {
        return 'col-6';
      } else if (width <= 750) {
        return 'col-4';
      } else if (width < 1030) {
        return 'col-6';
      } else {
        return 'col-4';
      }
    }

    function handleResize() {
      setColClass(getColClass());
    }

    setColClass(getColClass());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize current items with the first set of products
    if (collection.products.nodes.length > 0) {
      setAllItems(processProducts(collection.products.nodes));
    }
  }, [collection]);

  const processProducts = (products) => {
    return products
      .map((product) => {
        if (!product) return null;

        const originalPrice = parseFloat(
          product.compareAtPriceRange.minVariantPrice.amount,
        );
        const discountedPrice = parseFloat(
          product.priceRange.minVariantPrice.amount,
        );

        let discountPercentage = 0;
        if (originalPrice !== 0 && discountedPrice !== originalPrice) {
          discountPercentage =
            ((originalPrice - discountedPrice) / originalPrice) * 100;
        }
        const formattedDiscount = discountPercentage.toFixed(2);

        let productPrice = null;
        if (originalPrice !== 0) {
          productPrice = originalPrice;
        }

        const productData = {
          src: product?.images?.edges[0]?.node?.url,
          title: product.title,
          description: product.description,
          productPrice: productPrice,
          discountPrice: discountedPrice,
          isBestSeller: product.tags.includes('Best Seller'),
          isNew: product.tags.includes('New'),
        };

        if (discountPercentage > 0) {
          productData.discount = `${formattedDiscount}% OFF`;
        }

        return productData;
      })
      .filter((item) => item !== null);
  };

  const handleLoadMore = async (newNodes) => {
    setIsLoadingMore(true);
    const newItems = await processProducts(newNodes);
    setAllItems((prevItems) => [...prevItems, ...newItems]);
    setIsLoadingMore(false);
  };

  return (
    <div className="collection-product-container">
      <div className="row" id="productList">
        <Pagination connection={collection.products}>
          {({
            nodes,
            isLoading,
            PreviousLink,
            NextLink,
            hasNextPage,
            hasPreviousPage,
          }) => (
            <>
              {allItems.map((item) => (
                <div className={`${colClass} product-container`} key={item.src}>
                  <div className="product-img-wrapper position-relative">
                    {item.src ? (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="zoom-img"
                      />
                    ) : (
                      <img
                        src={NoImage}
                        alt={'no-image'}
                        className="zoom-img no-img"
                      />
                    )}
                    {item.isBestSeller && (
                      <div className="position-absolute top-0 start-0 best-seller">
                        Best Seller
                      </div>
                    )}
                    <div className="position-absolute wishlist-container">
                      <img
                        src={wishListIcon}
                        className="mi-lg mi-wishlist wh-20 d-inline-block"
                        alt="Wishlist Icon"
                      />
                    </div>
                    <div className="position-absolute add-to-bag-container">
                      <button className="add-to-bag-btn">
                        <span className="me-2 mi-lg mi-checkout align-text-bottom wh-20 d-inline-block"></span>
                        Add to Bag
                      </button>
                    </div>
                  </div>
                  <div className="image-title-section">
                    {item.title && (
                      <h6 className="product-title">{item.title}</h6>
                    )}
                    <p className="product-description">{item.description}</p>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        {item.discountPrice && (
                          <div className="discount-price me-1">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: `&#8377 ${item.discountPrice}`,
                              }}
                            />
                          </div>
                        )}
                        {item.productPrice && (
                          <div className="product-price me-1">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: `&#8377 ${item.productPrice}`,
                              }}
                            />
                          </div>
                        )}
                        {item.discount && (
                          <div className="discount">{item.discount}</div>
                        )}
                      </div>
                      {item.isNew && <div className="new-stock">New</div>}
                    </div>
                  </div>
                </div>
              ))}
              {hasNextPage && (
                <NextLink onClick={() => handleLoadMore(nodes)}>
                  {isLoading && isLoadingMore ? (
                    'Loading...'
                  ) : (
                    <div className="d-flex justify-content-center">
                      <button className="load-more-btn">
                        <span className="me-2 mi-lg bg-white mi-checkout align-text-bottom wh-16 d-inline-block"></span>
                        LOAD MORE
                      </button>
                    </div>
                  )}
                </NextLink>
              )}
            </>
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default CollectionProductList;
