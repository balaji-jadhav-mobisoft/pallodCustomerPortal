import {json} from '@shopify/remix-oxygen';
import {
  useOutletContext,
  useLoaderData
} from '@remix-run/react';
import {CustomerWishlist} from '../components/wishlist/customer-wishlist';
import { Suspense } from 'react';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Wishlist'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}


export default function Wishlist() {
  const {customer} = useOutletContext();
  
  return (
    <div className="account-wishlist">
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerWishlist customer={customer} />
      </Suspense>
    </div>
  );
}

/** @typedef {import('customer-accountapi.generated').CustomerFragment} CustomerFragment */
/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
