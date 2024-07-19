import React from 'react';

const ShippingAndReturn = () => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="shippingAccordion">
        <button
          className="accordion-button ps-0 collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseShipping"
          aria-expanded="false"
          aria-controls="collapseShipping"
        >
          Shipping & Returns
        </button>
      </h2>
      <div
        id="collapseShipping"
        className="accordion-collapse collapse"
        aria-labelledby="shippingAccordion"
        data-bs-parent="#detailsAccordion"
      >
        <div className="accordion-body p-0 shipping-accordion-content">
          <div className="shipping-header">Shipping Methods And Costs</div>
          <ul>
            <li className="shipping-content mb-0">
              We deliver to more than 200 countries around the world, and offer
              different shipping options as applicable.
            </li>
            <li className="shipping-content">
              For more information, please contact our customer care service at{' '}
              <span>customercare@pallodstore.com</span> or
              <span>+91-78478 48484</span>
            </li>
          </ul>
          <div className="shipping-header">Shipping Restriction</div>
          <div className="shipping-content">
            Any items notified by our courier companies to be restricted and/or
            banned and/or prohibited from time to time(including but not limited
            to animals, bullion, currency, bearer from negotiable instruments,
            precious metals and stones, firearms or parts thereof and
            ammunition, human remains, pornography and illegal narcotics/drugs).
          </div>
          <div className="shipping-header">Important Information</div>
          <div className="shipping-content">
            Order cut-off times are provided as guidelines only, and do not take
            into account possible delays caused by payment authorization. We aim
            to dispatch all orders within 24 hours with the exception of sale
            periods where it may take up to 72 hours. Estimated delivery times
            are to be used as a guide only and commence from the date of
            dispatch. We are not responsible for any delays caused by
            destination customs clearance processes. We are unable to redirect
            orders once items have been dispatched.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndReturn;
