import React from 'react';

const ShippingAndReturn = ({shippingReturnBlog}) => {
  if (!shippingReturnBlog) return null;
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
          {shippingReturnBlog?.blog?.articles?.edges?.map((article, index) => {
            const {node} = article;
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: node.contentHtml,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShippingAndReturn;
