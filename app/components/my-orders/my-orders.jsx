import React, {useEffect, useState} from 'react';
import './my-orders.css';
import {Link, useLoaderData} from '@remix-run/react';
import {
  Money,
  Pagination,
  getPaginationVariables,
  flattenConnection,
  Image,
} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {CUSTOMER_ORDERS_QUERY} from '../../graphql/customer-account/CustomerOrdersQuery';
import CelebrityImage from '~/assets/Celebrity_1 (1).webp';
import FilterIcon from '~/assets/Icon_Filter.svg';
import OnTheWay from '~/assets/on_the_way.svg';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Orders'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, context}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables,
      },
    },
  );

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

/**
 * @param {Pick<CustomerOrdersFragment, 'orders'>}
 */
function OrdersTable({orders}) {
  return (
    <div className="main-order-container">
      <div className="nav-section d-flex flex-row justify-content-between align-items-center">
        <h3>My Orders ({orders.nodes.length})</h3>
        <div className="nav-tail d-flex flex-row">
          <div className="input-group search-order-input">
            <input
              className="form-control"
              type="text"
              id="searchOrdersInput"
              placeholder="Search for order by name or order ID"
            />
            <span className="input-group-append search-icon">
              <i className="mi-lg mi-search wh-18 d-inline-block" />
            </span>
          </div>
          <button
            className="filters-btn d-flex align-items-center"
            data-bs-toggle="modal"
            id="defaultFilterBtn"
            data-bs-target="#orderFilters"
          >
            <img
              src={FilterIcon}
              width={18}
              height={18}
              className="mi-lg mi-filter wh-18 d-inline-block"
            />
            FILTER
          </button>
          <button
            className="filters-btn d-none align-items-center"
            data-bs-toggle="modal"
            id="responsiveFilterBtn"
            data-bs-target="#orderFilters"
          >
            <img
              src={FilterIcon}
              width={18}
              height={18}
              className="mi-lg mi-filter wh-18 d-inline-block"
            />
          </button>
        </div>
      </div>
      <Pagination connection={orders}>
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              {nodes.map((order) => {
                return <OrderItem key={order.id} order={order} />;
              })}
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </>
          );
        }}
      </Pagination>
    </div>
  );
}

/**
 * @param {{order: OrderLineItemFullFragment}}
 */
function OrderItem({order}) {
  return (
    <>
      <Link
        to={`/account/orders/${btoa(order.id)}`}
        className="order-list-item d-flex flex-column"
        style={{textDecoration: 'none'}}
      >
        <div className="d-flex flex-row">
          <div className="order-item-img">
            <img src={CelebrityImage} alt="Order 1 Image" />
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <div className="order-status on-the-way d-flex align-items-center">
              <img
                src={OnTheWay}
                width={18}
                height={18}
                className="mi-lg wh-18 mi-on_the_way d-inline-block"
              ></img>
              {order.financialStatus}
            </div>
            <div className="ordered-item d-flex flex-row justify-content-between align-items-center">
              #{order.number}
              <span className="mi-lg mi-chevron_right wh-24 d-inline-block"></span>
            </div>
            <div className="order-details d-flex flex-row">
              <div className="d-flex flex-column pe-4">
                <div className="detail-title">Order Placed On:</div>
                <div className="detail-content">
                  {new Date(order.processedAt).toDateString()}
                </div>
              </div>
              <div className="d-flex flex-column pe-4 ps-4 total-price-section">
                <div className="detail-title">Total</div>
                <div className="detail-content">
                  <Money data={order.totalPrice} />
                </div>
              </div>
              <div className="d-flex flex-column ps-4">
                <div className="detail-title">Shipped To</div>
                <div className="detail-content">
                  John Mathew <span>(Home)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-none flex-column order-details"
          id="responsiveOrderDetails"
        >
          <div className="d-flex flex-row my-3">
            <div className="d-flex flex-column pe-4 flex-grow-1">
              <div className="detail-title">Order Placed On:</div>
              <div className="detail-content">
                {new Date(order.processedAt).toDateString()}
              </div>
            </div>
            <div className="d-flex flex-column pe-4 flex-grow-1 ps-4 total-price-section">
              <div className="detail-title">Total</div>
              <div className="detail-content">
                <Money data={order.totalPrice} />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <div className="detail-title">Shipped To</div>
            <div className="detail-content">
              John Mathew
              <span>(Home)</span>
            </div>
          </div>
        </div>
      </Link>

      {/* <fieldset>
        <Link to={`/account/orders/${btoa(order.id)}`}>
          <strong>#{order.number}</strong>
        </Link>
        <p>{new Date(order.processedAt).toDateString()}</p>
        <p>{order.financialStatus}</p>
        {fulfillmentStatus && <p>{fulfillmentStatus}</p>}
        <Money data={order.totalPrice} />
        <Link to={`/account/orders/${btoa(order.id)}`}>View Order →</Link>
      </fieldset>
      <br /> */}
    </>
  );
}

export const MyOrders = ({orders}) => {
  return (
    <div className="orders">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default MyOrders;

/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('customer-accountapi.generated').CustomerOrdersFragment} CustomerOrdersFragment */
/** @typedef {import('customer-accountapi.generated').OrderItemFragment} OrderItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('customer-accountapi.generated').OrderLineItemFullFragment} OrderLineItemFullFragment */
