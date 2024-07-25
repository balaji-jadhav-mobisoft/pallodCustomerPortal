import React, {useState, useEffect} from 'react';
import '../cart-main.css';
const AddAddressModal = ({isOpen, onClose}) => {
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  useEffect(() => {
    const modalElement = document.getElementById('addAddress');

    const handleModalClose = () => {
      onClose();
    };

    modalElement.addEventListener('hidden.bs.modal', handleModalClose);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  }, [onClose]);

  useEffect(() => {
    const billingDetails = document.getElementById('billingDetails');
    if (isBillingSameAsShipping) {
      billingDetails.style.display = 'none';
    } else {
      billingDetails.style.display = 'block';
    }
  }, [isBillingSameAsShipping]);

  const handleCheckboxChange = () => {
    setIsBillingSameAsShipping(!isBillingSameAsShipping);
  };

  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      id="addAddress"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="addAddressLabel"
      aria-hidden={!isOpen}
      style={{display: isOpen ? 'block' : 'none'}}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title d-flex align-items-center"
              id="addAddressLabel"
            >
              <span
                role="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="wh-26 mi-lg mi-back_arrow d-none me-2"
              />
              Add New Address
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <div className="container" id="shippingDetailsForm">
              <form className="shipping-details-form-section">
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="fullName" className="form-label required">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control error-border mb-1"
                      id="fullName"
                      placeholder="Enter Full Name"
                      required
                    />
                    <div className="error-text">This field is required</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 mb-3">
                    <label
                      htmlFor="mobileNumber"
                      className="form-label required"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobileNumber"
                      placeholder="Enter Mobile Number"
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="email" className="form-label required">
                      Email ID
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email ID"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label
                      htmlFor="streetAddress"
                      className="form-label required"
                    >
                      Street Address
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        id="streetAddress"
                        placeholder="Enter Street Address"
                        required
                      />
                      <span className="position-absolute mi-lg mi-search search-street-icon wh-18 d-inline-block" />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="zipCode" className="form-label required">
                      Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      placeholder="Enter Zip / Postal Code"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <select value="" className="form-select" id="city">
                      <option value="" className="select-placeholder" selected>
                        Select
                      </option>
                      <option>Select City</option>
                      {/* Add options here */}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="state" className="form-label">
                      State / Province
                    </label>
                    <select value="" className="form-select" id="state">
                      <option className="select-placeholder" selected value="">
                        Select
                      </option>
                      {/* Add options here */}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="country" className="form-label">
                      Country / Region
                    </label>
                    <select value="" className="form-select" id="country">
                      <option className="select-placeholder" selected value="">
                        Select
                      </option>
                      {/* Add options here */}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="billingAddress"
                        defaultChecked
                        checked={isBillingSameAsShipping}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label billing-address-checkbox"
                        htmlFor="billingAddress"
                      >
                        Billing address is same as shipping address
                      </label>
                    </div>
                  </div>
                </div>
                {/* billing address form */}
                <div className="mt-2 mb-2" id="billingDetails">
                  <h5 className="mb-3 billing-detail-header">
                    Billing Details
                  </h5>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label
                        htmlFor="fullNameBilling"
                        className="form-label required"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullNameBilling"
                        placeholder="Enter Full Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="companyName"
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="taxId" className="form-label">
                        Tax ID
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="taxId"
                        placeholder="Enter Tax ID"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <label
                        htmlFor="billingMobileNumber"
                        className="form-label required"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="billingMobileNumber"
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                      <label htmlFor="billingEmail" className="form-label">
                        Email ID
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="billingEmail"
                        placeholder="Enter Email ID"
                        required
                      />
                    </div>
                  </div>
                  <hr className="mt-4" />
                  <div className="row mb-3">
                    <div className="col-12">
                      <label
                        htmlFor="billingStreetAddress"
                        className="form-label required"
                      >
                        Street Address
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control"
                          id="billingStreetAddress"
                          placeholder="Enter Street Address"
                          required
                        />
                        <span className="position-absolute mi-lg mi-search search-street-icon wh-18 d-inline-block" />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label
                        htmlFor="billingZipCode"
                        className="form-label required"
                      >
                        Zip / Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billingZipCode"
                        placeholder="Enter Zip / Postal Code"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="billingCity" className="form-label">
                        City
                      </label>
                      <select className="form-select" id="billingCity">
                        <option className="select-placeholder" selected>
                          Select
                        </option>
                        <option>Select City</option>
                        {/* Add options here */}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="billingState" className="form-label">
                        State / Province
                      </label>
                      <select className="form-select" id="billingState">
                        <option className="select-placeholder" selected>
                          Select
                        </option>
                        {/* Add options here */}
                      </select>
                    </div>
                    <div className="col-6">
                      <label htmlFor="billingCountry" className="form-label">
                        Country / Region
                      </label>
                      <select className="form-select" id="billingCountry">
                        <option className="select-placeholder" selected>
                          Select
                        </option>
                        {/* Add options here */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Save address as</label>
                    <div>
                      <button
                        type="button"
                        className="btn save-address-btn me-3 clicked"
                        id="homeBtn"
                      >
                        Home
                      </button>
                      <button
                        type="button"
                        className="btn save-address-btn"
                        id="workBtn"
                      >
                        Work
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="defaultAddress"
                      />
                      <label
                        className="form-check-label address-checkbox"
                        htmlFor="defaultAddress"
                      >
                        Make this my default address
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="add-btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmation"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              SAVE ADDRESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
