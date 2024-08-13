import React, { useEffect, useState } from 'react';
import wishlistAPI from './wishlistAPI';
import wishListedIcon from '~/assets/Whislisted.svg';
import { Link } from '@remix-run/react';

const RemoveFromWishlistButton = ({ product, customerId, isPdp, customAppUrl }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRemoveFromWishlist = async () => {
    setLoading(true);
    try {
     const data= await wishlistAPI.removeFromWishlist(product.id, customerId, customAppUrl);

      setIsInWishlist(false);
    } catch (error) {
      // Handle error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };
  console.log("PDP status ", isPdp);
  


  return (
    <>
    {isPdp ? (
        !customerId?
        <Link to={'/account/login'}>
          <button class="wishlist bg-white remove" id="wishlistBtn">
            <img src={wishListedIcon} class="mi-lg mi-wishlist_2 d-inline-block me-2 wh-30" />
            REMOVE
          </button>
        </Link>
        :
        <button onClick={handleRemoveFromWishlist} class="wishlist bg-white remove" id="wishlistBtn">
          <img src={wishListedIcon} class="mi-lg mi-wishlist_2 d-inline-block me-2 wh-30" />
          REMOVE
        </button>
      ) : (
        !customerId?
        <Link to={'/account/login'}>
          <img
              src={wishListedIcon}
              className="mi-lg mi-wishlist wh-20 d-inline-block"
              alt="Wishlist Icon"
          />
        </Link>
        :
        <img onClick={handleRemoveFromWishlist}
            src={wishListedIcon}
            className="mi-lg mi-wishlist wh-20 d-inline-block"
            alt="Wishlist Icon"
        />
      )}
    </>
  );
};

export default RemoveFromWishlistButton;
