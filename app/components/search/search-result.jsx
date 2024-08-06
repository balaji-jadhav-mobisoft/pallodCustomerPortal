import React, {useEffect, useRef, useState} from 'react';
import {Link, Form, useParams, useFetcher} from '@remix-run/react';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {applyTrackingParams} from '~/lib/search';
import '../../components/collection-components/collection-products/collection-products.css';
import '../../components/collection-components/main-collection-component/main-collection-component.css';
import './search-result.css';
import wishListIcon from '~/assets/wishList-icon.svg';
import Breadcrumb from '~/components/common/breadcrumb/breadcrumb';

/**
 * @param {Pick<SearchQuery, 'products'> & {searchTerm: string}}
 */
export function SearchResult({results, searchTerm}) {
  const breadcrumbItems = [{name: 'Home', href: '/'}, {name: 'Search'}];
  const [colClass, setColClass] = useState('col-3');

  if (!results) {
    return null;
  }

  useEffect(() => {
    function getColClass() {
      const width = window.innerWidth;
      if (width < 740) {
        return 'col-6';
      } else if (width <= 750) {
        return 'col-3';
      } else if (width < 1030) {
        return 'col-6';
      } else {
        return 'col-3';
      }
    }

    function handleResize() {
      setColClass(getColClass());
    }

    setColClass(getColClass());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const keys = Object.keys(results);
  return (
    <div className="search-result w-100 sarees-section">
      <div class="row" id="productList">
        <div class="collection-product-container">
          <div class="row" id="productList">
            <Breadcrumb items={breadcrumbItems} />
            {results &&
              keys.map((type) => {
                const resourceResults = results[type];

                if (resourceResults.nodes[0]?.__typename === 'Product') {
                  const productResults = resourceResults;
                  return resourceResults.nodes.length ? (
                    <Pagination connection={productResults}>
                      {({nodes, isLoading, NextLink, PreviousLink}) => {
                        const ItemsMarkup = nodes.map((product) => {
                          const trackingParams = applyTrackingParams(
                            product,
                            `q=${encodeURIComponent(searchTerm)}`,
                          );

                          const isBestSeller =
                            product.tags.includes('Best Seller');
                          const isNew = product.tags.includes('New');

                          return (
                            <div
                              className={`${colClass} product-container`}
                              key={product.id}
                            >
                              <Link
                                prefetch="intent"
                                to={`/products/${product.handle}${trackingParams}`}
                              >
                                <div className="product-img-wrapper position-relative">
                                  {product.variants.nodes[0].image && (
                                    <Image
                                      data={product.variants.nodes[0].image}
                                      alt={product.title}
                                      className="zoom-img zoom-img-section"
                                      sizes="(max-width: 600px) 201vw, 334vw"
                                    />
                                  )}
                                  {isBestSeller && (
                                    <div className="position-absolute top-0 start-0 best-seller">
                                      Best Seller
                                    </div>
                                  )}
                                  <div class="position-absolute wishlist-container">
                                    <img
                                      src={wishListIcon}
                                      class="mi-lg mi-wishlist wh-20 d-inline-block"
                                      alt="Wishlist Icon"
                                    />
                                  </div>
                                  <div class="position-absolute add-to-bag-container">
                                    <button class="add-to-bag-btn">
                                      <span class="me-2 mi-lg mi-checkout align-text-bottom wh-20 d-inline-block"></span>
                                      Add to Bag
                                    </button>
                                  </div>
                                </div>
                              </Link>
                              <div class="image-title-section">
                                <h6 class="product-title">{product.title}</h6>
                                <p class="product-description">
                                  {product.description}
                                </p>
                                <div class="d-flex flex-row align-items-center justify-content-between">
                                  <div class="d-flex align-items-center">
                                    <div class="discount-price me-1">
                                      <Money
                                        data={product.variants.nodes[0].price}
                                      />
                                    </div>
                                  </div>
                                  {isNew && (
                                    <div className="new-stock">New</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        });
                        return (
                          <div className="justify-content-center load-more-align-center">
                            {/* <div>
                                    <PreviousLink>
                                    {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                                    </PreviousLink>
                                </div> */}
                            <div>
                              {ItemsMarkup}
                              <br />
                            </div>
                            <NextLink>
                              {isLoading ? (
                                'Loading...'
                              ) : (
                                <span className="load-more-btn">LOAD MORE</span>
                              )}
                            </NextLink>
                          </div>
                        );
                      }}
                    </Pagination>
                  ) : null;
                }

                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @typedef {| PredictiveCollectionFragment['image']
 *   | PredictiveArticleFragment['image']
 *   | PredictiveProductFragment['variants']['nodes'][0]['image']} PredicticeSearchResultItemImage
 */
/** @typedef {| PredictiveProductFragment['variants']['nodes'][0]['price']} PredictiveSearchResultItemPrice */
/**
 * @typedef {{
 *   __typename: string | undefined;
 *   handle: string;
 *   id: string;
 *   image?: PredicticeSearchResultItemImage;
 *   price?: PredictiveSearchResultItemPrice;
 *   styledTitle?: string;
 *   title: string;
 *   url: string;
 * }} NormalizedPredictiveSearchResultItem
 */
/**
 * @typedef {Array<
 *   | {type: 'queries'; items: Array<NormalizedPredictiveSearchResultItem>}
 *   | {type: 'products'; items: Array<NormalizedPredictiveSearchResultItem>}
 *   | {type: 'collections'; items: Array<NormalizedPredictiveSearchResultItem>}
 *   | {type: 'pages'; items: Array<NormalizedPredictiveSearchResultItem>}
 *   | {type: 'articles'; items: Array<NormalizedPredictiveSearchResultItem>}
 * >} NormalizedPredictiveSearchResults
 */
/**
 * @typedef {{
 *   results: NormalizedPredictiveSearchResults;
 *   totalResults: number;
 * }} NormalizedPredictiveSearch
 */
/**
 * @typedef {{
 *   searchResults: {
 *     results: SearchQuery | null;
 *     totalResults: number;
 *   };
 *   searchTerm: string;
 * }} FetchSearchResultsReturn
 */
/** @typedef {Class<useFetcher<PredictiveSearchAPILoader>>>} ChildrenRenderProps */
/**
 * @typedef {{
 *   action?: FormProps['action'];
 *   className?: string;
 *   children: (passedProps: ChildrenRenderProps) => React.ReactNode;
 *   [key: string]: unknown;
 * }} SearchFromProps
 */
/**
 * @typedef {{
 *   goToSearchResult: (event: React.MouseEvent<HTMLAnchorElement>) => void;
 *   items: NormalizedPredictiveSearchResultItem[];
 *   searchTerm: UseSearchReturn['searchTerm'];
 *   type: NormalizedPredictiveSearchResults[number]['type'];
 * }} SearchResultTypeProps
 */
/**
 * @typedef {Pick<SearchResultTypeProps, 'goToSearchResult'> & {
 *   item: NormalizedPredictiveSearchResultItem;
 * }} SearchResultItemProps
 */
/** @typedef {Class<useFetcher<PredictiveSearchAPILoader>>['state']>} UseSearchReturn */

/** @typedef {import('@remix-run/react').FormProps} FormProps */
/** @typedef {import('storefrontapi.generated').PredictiveProductFragment} PredictiveProductFragment */
/** @typedef {import('storefrontapi.generated').PredictiveCollectionFragment} PredictiveCollectionFragment */
/** @typedef {import('storefrontapi.generated').PredictiveArticleFragment} PredictiveArticleFragment */
/** @typedef {import('storefrontapi.generated').SearchQuery} SearchQuery */
/** @typedef {import('../routes/api.predictive-search').PredictiveSearchAPILoader} PredictiveSearchAPILoader */
