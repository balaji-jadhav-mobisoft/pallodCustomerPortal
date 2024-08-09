import React, {useEffect, useRef, useState} from 'react';
import './order-details.css';
import {Link} from '@remix-run/react';
import {MapComponent} from '~/components/MapComponent';
import {Money, Image} from '@shopify/hydrogen';

export function OrderDetails({order, lineItems, fulfillmentStatus}) {
  const shopAddress = '1600 Amphitheatre Parkway, Mountain View, CA';

  return (
    <>
      <nav aria-label="breadcrumb" class="breadcrumb-container mb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/account/orders">My Orders</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Order Details
          </li>
        </ol>
      </nav>
      <div class="d-flex flex-row cart-section">
        <div class="added-items-container">
          <h3>{fulfillmentStatus}</h3>

          {/* <div class="exchange-window">
            Exchange window closed on{' '}
            <span class="ms-1">
              {new Date(order.processedAt).toDateString()}
            </span>
          </div> */}
          <div class="order-consent">
            We've received your order, your order will reach you as per
            estimated delivery dates. Till that time, you can check the delivery
            status with the tracking number below:
          </div>
          {/* <div class="tracking-details">
            <div class="title">Tracking / AWB Number:</div>
            <div class="content">BD39402</div>
          </div>
          <div class="tracking-details">
            <div class="title">Tracking Link:</div>
            <div class="content">
              <Link target="_blank" to={order.statusPageUrl}>
                Click to track
              </Link>
            </div>
          </div> */}

          <hr class="ruler" />
          <div class="price-summary-container d-none" id="priceSummaryMobile">
            <h3>Order Summary</h3>

            {lineItems.map((lineItem, lineItemIndex) => (
              <OrderItemRow key={lineItemIndex} lineItem={lineItem} />
            ))}

            <hr />
            <h5 class="bag-summary">Bag Summary</h5>
            <div class="d-flex flex-row justify-content-between price-content">
              <div>Bag total</div>
              <div>
                <Money data={order.totalPrice} />
              </div>
            </div>
            <div class="d-flex flex-row justify-content-between price-content">
              <div>Shipping</div>
              <div>Free</div>
            </div>
            <hr />
            <div class="d-flex flex-row justify-content-between total-pay">
              <div>Total Paid</div>
              <div>
                <Money data={order.totalPrice} />
              </div>
            </div>
          </div>

          <h5 class="details-header">Shipping Address</h5>
          <div class="map-section d-flex flex-column">
            {/* <div class="map">
              <MapComponent address={order.shippingAddress.formatted} />
            </div> */}
            <div class="address">
              {order?.shippingAddress ? (
                <address>
                  {order.shippingAddress.formatted ? (
                    <p>{order.shippingAddress.formatted}</p>
                  ) : (
                    ''
                  )}
                  {order.shippingAddress.formattedArea ? (
                    <p>{order.shippingAddress.formattedArea}</p>
                  ) : (
                    ''
                  )}
                </address>
              ) : (
                <p>No shipping address defined</p>
              )}
            </div>
            <div class="contact">
              Contact Number: <span>{order.phone}</span>
            </div>
          </div>

          <h5 class="details-header">Order Details</h5>
          <div class="contact-section d-flex flex-row">
            <div class="w-50 d-flex flex-column first-node">
              <div class="detail-subheader">Contact Information</div>
              <div class="user-mail">{order.shippingAddress.name}</div>
              <div class="user-phone">{order.phone}</div>
            </div>
            {/* <div class="w-50 d-flex flex-column">
              <div class="detail-subheader">Payment Information</div>
              <div class="user-mail">Card Payment</div>
            </div> */}
          </div>
          <div class="billing-section d-flex flex-row">
            <div class="w-50 d-flex flex-column first-node">
              <div class="detail-subheader">Shipping Address</div>
              <div class="username">
                {order?.shippingAddress ? (
                  order.shippingAddress.name
                ) : (
                  <p>No shipping address defined</p>
                )}
              </div>
              <div class="address">
                {order?.shippingAddress ? (
                  <address>
                    {order.shippingAddress.formatted ? (
                      <p style={{marginRight: '20px'}}>
                        {order.shippingAddress.formatted}
                      </p>
                    ) : (
                      ''
                    )}
                  </address>
                ) : (
                  <p>No shipping address defined</p>
                )}
              </div>
              <div class="user-phone">{order.phone}</div>
            </div>
            <div class="w-50 d-flex flex-column">
              <div class="detail-subheader">Billing Address</div>
              <div class="username">
                {order?.billingAddress ? (
                  order.billingAddress.name
                ) : (
                  <p>No billing address defined</p>
                )}
              </div>
              <div class="address">
                {order?.billingAddress ? (
                  <address>
                    {order.billingAddress.formatted ? (
                      <p>{order.billingAddress.formatted}</p>
                    ) : (
                      ''
                    )}
                  </address>
                ) : (
                  <p>No billing address defined</p>
                )}
              </div>
              <div class="user-phone">{order.phone}</div>
            </div>
          </div>
        </div>

        <div class="price-summary-container" id="priceSummary">
          <h3>Order Summary</h3>
          {lineItems.map((lineItem, lineItemIndex) => (
            <OrderItemRow key={lineItemIndex} lineItem={lineItem} />
          ))}

          <hr />
          <h5 class="bag-summary">Bag Summary</h5>
          <div class="d-flex flex-row justify-content-between price-content">
            <div>Bag total</div>
            <div>
              <Money data={order.totalPrice} />
            </div>
          </div>
          <div class="d-flex flex-row justify-content-between price-content">
            <div>Shipping</div>
            <div>Free</div>
          </div>
          <hr />
          <div class="d-flex flex-row justify-content-between total-pay">
            <div>Total Paid</div>
            <div>
              <Money data={order.totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * @param {{lineItem: OrderLineItemFullFragment}}
 */
function OrderItemRow({lineItem}) {
  return (
    <div class="d-flex flex-row product-summary">
      <div class="product-image">
        {lineItem?.image && (
          <Image
            data={lineItem.image}
            width={lineItem.width}
            height={lineItem.height}
            sizes="(min-width: 45em) 20vw, 50vw"
          />
        )}
      </div>
      <div class="d-flex justify-content-between flex-grow-1">
        <div class="summary-section d-flex flex-column">
          <div class="item-header">{lineItem.title}</div>
          <div class="item-content flex-row d-flex">
            <div class="content-section pe-2">
              <div class="title">Qty:</div>
              <div class="content">{lineItem.quantity}</div>
            </div>
            <div class="content-section size-section">
              <div class="title">Size:</div>
              <div class="content">{lineItem.variantTitle}</div>
            </div>
          </div>
          <div class="item-price">
            <Money data={lineItem.price} />
          </div>
        </div>
        <div class="mi-lg mi-chevron_right wh-24 d-inline-block"></div>
      </div>
    </div>
  );
}

/** @typedef {import('customer-accountapi.generated').OrderLineItemFullFragment} OrderLineItemFullFragment */
