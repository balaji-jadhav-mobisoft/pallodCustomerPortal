import React from 'react';

const ProductDetailsSection = ({productDescription}) => {
  if (!productDescription) return null;
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="productDetailsAccordion">
        <button
          className="accordion-button ps-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseProductDetails"
          aria-expanded="true"
          aria-controls="collapseProductDetails"
        >
          Product Details
        </button>
      </h2>
      <div
        id="collapseProductDetails"
        className="accordion-collapse collapse show"
        aria-labelledby="productDetailsAccordion"
        data-bs-parent="#detailsAccordion"
      >
        <div className="accordion-body p-0">
          <div
            dangerouslySetInnerHTML={{
              __html: productDescription,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
