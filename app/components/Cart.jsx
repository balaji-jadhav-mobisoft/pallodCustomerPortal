import {CartForm, Money, useOptimisticCart} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/lib/variants';
import {useEffect, useState} from 'react';
import Loader from './common/loader/loader';
import CartMainComponent from './cart-components/cart-main';
import '../components/cart-components/cart-main.css';
import EmptyBagIcon from '~/assets/empty-cart.svg';

/**
 * @param {CartMainProps}
 */
export function CartMain({layout, cart: originalCart}) {
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);

  const className = `cart-main`;

  return (
    <>
      <div className={className}>
        <CartEmpty hidden={linesCount} layout={layout} />
        <CartMainComponent cart={cart} layout={layout} hidden={linesCount} />
      </div>
    </>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
export function CartEmpty({hidden = false}) {
  return (
    <div hidden={hidden} className="empty-bag-section">
      <img src={EmptyBagIcon} alt="empty-bag" />
      <span className="empty-cart-span1">Your bag is empty!</span>
      <span className="empty-cart-span">
        Looks like you haven't added anything to your cart yet.
      </span>
      <button className="continue-shopping-button">
        <Link to="/" style={{textDecoration: 'none', color: '#fff'}}>
          CONTINUE SHOPPING
        </Link>
      </button>
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
