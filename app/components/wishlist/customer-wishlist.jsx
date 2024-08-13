import React, {useEffect, useState, Suspense} from 'react';
import './customer-wishlist.css';
import {Await, Link, useLoaderData, useRouteLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {
  Money,
  Pagination,
  getPaginationVariables,
  flattenConnection,
  Image,
  CacheLong,
} from '@shopify/hydrogen';
import RemoveWishlist from '~/assets/Icon_Close.svg';
import wishlistAPI from '~/wishlistAPI';
import EmptyWishlist from '~/assets/Empty_Wishlist.svg';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Wishlist'}];
};

export const CustomerWishlist = ({customer}) => {
  /** @type {RootLoader} */
  const loaderData = useRouteLoaderData('root');
  const customerAppUrl = loaderData.customerAppUrl;
  const appUrl = loaderData.customAppUrl;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!customer) return null;

  const customerId = customer?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();

        formData.append('customerId', customerId);
        formData.append('shop', 'pallodstore');
        formData.append('_action', 'GET');

        const response = await fetch(customerAppUrl, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const removeFromWishlist = async (productId, customerId) => {
    const shop = 'Pallodstore';
    const _action = 'DELETE';

    //if (!customer) return null;

    //const customerId = customer?.id;

    try {
      const formData = new FormData();

      formData.append('customerId', customerId);
      formData.append('shop', shop);
      formData.append('productId', productId);
      formData.append('_action', _action);

      const response = await fetch(appUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result) {
        window.location.reload();
      }
      //setData(result);
      //return ({result});
    } catch (error) {
      //setError(error.message);
    } finally {
      //setLoading(false);
    }

    return true;
    //return ({result});
  };

  return (
    <div className="wishlist">
      <nav aria-label="breadcrumb" className="breadcrumb-container mb-0">
        <ol className="breadcrumb justify-content-between">
          <div className="d-flex align-items-center">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="#.">Wishlist</a>
            </li>
          </div>
          <div className="no-of-items">{data.data.length} Items</div>
        </ol>
      </nav>

      <div className="fluid-container position-relative" id="wishlistImages">
        <div className="row" id="wardrobeItems">
          {data?.data.length ? (
            data?.data?.map((product) => {
              return (
                <div
                  className="col-3 wishlist-item product-container"
                  key={product.id}
                >
                  <div className="product-img-wrapper position-relative ">
                    <Link
                      to={`/products/${product.productHandle}/?collectionHandle=${product.collectionHandle}`}
                    >
                      <img
                        src={product.productImage}
                        alt="Pallod"
                        className="zoom-img"
                      />
                    </Link>
                    <div className="position-absolute wishlist-container">
                      <img
                        onClick={() =>
                          removeFromWishlist(product.productId, customerId)
                        }
                        src={RemoveWishlist}
                        alt="Pallod"
                        className="mi-lg mi-close wh-20 d-inline-block"
                      />
                    </div>
                  </div>
                  <div className="product-detail-mobile">
                    <h6 className="product-title">{product.tags}</h6>
                    <p className="product-description">{product.title}</p>
                    <div className="d-flex flex-row align-items-center justify-content-between price-details">
                      <div className="d-flex align-items-center">
                        <div className="discount-price me-1">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `&#8377 ${product.price}`,
                            }}
                          />
                        </div>
                        {/* <div className="product-price me-1">₹30500</div> */}
                        {/* <div className="discount">15%OFF</div> */}
                      </div>
                      {/* <div className="new-stock">New</div> */}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-wishlist-container d-flex justify-content-center align-items-center">
              <div className="empty-wishlist-section d-flex flex-column align-items-center justify-content-center">
                <div className="empty-img">
                  <img src={EmptyWishlist} alt="Empty Wishlist" />
                </div>
                <div className="empty-wishlist-text">
                  Your wish list is currently empty.
                </div>
                <div className="browse-text">
                  Browse our collection and add items to your wish list!
                </div>
                <Link to={'/'}>
                  <button className="start-shopping-btn">START SHOPPING</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerWishlist;

/** @typedef {LoaderReturnData} RootLoader */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
