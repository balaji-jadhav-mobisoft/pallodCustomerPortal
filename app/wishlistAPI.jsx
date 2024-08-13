import React, {useEffect, useState, Suspense} from 'react';
import {
  Await,
  Link,
  useLoaderData,
  useRouteLoaderData,
  useLocation,
} from '@remix-run/react';
import {json, redirect} from '@shopify/remix-oxygen';
import {Money, Image, CacheLong} from '@shopify/hydrogen';

const API_BASE_URL = 'https://palloddevshopify.mi2.in/api/wishlist';
const CUSTOMER_API_BASE_URL =
  'https://palloddevshopify.mi2.in/api/customer/wishlist';

const wishlistAPI = {
  addToWishlist: async (
    product,
    customerId,
    collectionHandle,
    collectionId,
    imageUrl,
    price,
    variantId,
    customAppUrl,
  ) => {
    const productId = product.id;
    const shop = product.vendor ? product.vendor : 'Pallodstore';
    const _action = 'CREATE';
    const tags = product.tags.length > 0 ? product.tags : null;
    const stockStatus = 'In Stock';
    const title = product.title;
    const productHandle = product.handle;

    try {
      const formData = new FormData();

      formData.append('customerId', customerId);
      formData.append('shop', shop);
      formData.append('_action', _action);
      formData.append('productId', productId);
      formData.append('productImage', imageUrl);
      formData.append('tags', tags);
      formData.append('stockStatus', stockStatus);
      formData.append('title', title);
      formData.append('price', price);
      formData.append('varientId', variantId);
      formData.append('collectionId', collectionId);
      formData.append('collectionHandle', collectionHandle);
      formData.append('productHandle', productHandle);

      const response = await fetch(customAppUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      //setData(result);
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      //setError(error.message);
    } finally {
      //setLoading(false);
    }

    return {result};
  },

  removeFromWishlist: async (productId, customerId, customAppUrl) => {
    const shop = 'Pallodstore';
    const _action = 'DELETE';

    try {
      const formData = new FormData();

      formData.append('customerId', customerId);
      formData.append('shop', shop);
      formData.append('productId', productId);
      formData.append('_action', _action);

      const response = await fetch(customAppUrl, {
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

    return {result};
  },

  getWishlist: async (customerId) => {
    const shop = 'Pallodstore';
    const _action = 'GET';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!customerId) return null;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const formData = new FormData();

          formData.append('customerId', customerId);
          formData.append('shop', shop);
          formData.append('_action', _action);

          const response = await fetch(CUSTOMER_API_BASE_URL, {
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

    return <>{data.map((item, index) => item.productId)}</>;
  },
};

export default wishlistAPI;
