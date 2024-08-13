import React, { useState } from 'react';
import wishlistAPI from './wishlistAPI';
import wishListIcon from '~/assets/wishList-icon.svg';
import pdpWishlistIcon from '~/assets/wishlist-icon-1.svg';
//import wishListedIcon from '~/assets/Whislisted.svg';
import {json} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';

const AddToWishlistButton = ({ product, customerId, collectionHandle, collectionId, imageUrl, price, variantId, isPdp, customAppUrl }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      await wishlistAPI.addToWishlist(product, customerId, collectionHandle, collectionId, imageUrl, price, variantId, customAppUrl);
      setIsInWishlist(true);
    } catch (error) {
      // Handle error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {isPdp ? (
      !customerId?
        <Link to={'/account/login'}>
          <button class="wishlist bg-white " id="wishlistBtn">
            <img src={pdpWishlistIcon} class="mi-lg mi-wishlist_2 d-inline-block me-2 wh-18" />
            WISHLIST
          </button>
        </Link>:
        <button onClick={handleAddToWishlist} class="wishlist bg-white " id="wishlistBtn">
          <img src={pdpWishlistIcon} class="mi-lg mi-wishlist_2 d-inline-block me-2 wh-18" />
          WISHLIST
        </button>
      ) : (
        !customerId?
        <Link to={'/account/login'}><img
            src={wishListIcon}
            className="mi-lg mi-wishlist wh-20 d-inline-block"
            alt="Wishlist Icon"
        /></Link>:
        <img onClick={handleAddToWishlist}
            src={wishListIcon}
            className="mi-lg mi-wishlist wh-20 d-inline-block"
            alt="Wishlist Icon"
        />
      )}
    </>
  );
};

export default AddToWishlistButton;
