import React from 'react';

const ProductDetailsSection = () => {
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
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Style No:</div>
            <div className="details">S3392840</div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Color:</div>
            <div className="details">Red</div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Fabric:</div>
            <div className="details">Organza</div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Work:</div>
            <div className="details">Embroidery, Floral, Handwork</div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Manufactured by:</div>
            <div className="details store-details">Pallod Store</div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Packed by:</div>
            <div className="details store-details">Heer Zoya</div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">Size & Fit (by model clothing):</div>
            <div className="details">
              3 meter - Saree length, 1.04 meter - Blouse length
            </div>
          </div>
          <div className="d-flex flex-row product-detail-accordion">
            <div className="detail-header">About:</div>
            <div className="details">
              Apple red saree in organza with hand embroidered floral buttis
              using thread work and matching unstitched blouse. The pallu is
              enhanced with an elaborate bud embroidered floral design along
              with sequins highlights. Paired with a matching unstitched blouse
              in silk with bud embroidered buttis.
            </div>
          </div>
          <div className="note-section">
            <span>NOTE: </span>The thread color may vary. Slight variation in
            color is possible due to digital photography. Being rewarded as the
            most trusted brand our customers too believe we deliver same styles
            as promised on the website.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
