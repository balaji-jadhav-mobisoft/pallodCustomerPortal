import React, {useState, useEffect} from 'react';
import '../cart-main.css';
import BackIcon from '~/assets/Icon_Back_Arrow.svg';
const AddAddressModal = ({isOpen, onClose, type = 'add'}) => {
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    city: '',
    state: '',
    country: '',
  });
  const [billingAddress, setBillingAddress] = useState({
    city: '',
    state: '',
    country: '',
  });
  const [selectedButton, setSelectedButton] = useState('home');

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  useEffect(() => {
    const modalElement = document.getElementById('addAddress');
    const handleModalClose = () => onClose();

    // Handle modal visibility and background scroll
    if (isOpen) {
      document.body.classList.add('no-scroll');
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', handleModalClose);
      }
    } else {
      document.body.classList.remove('no-scroll');
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
      }
    }

    // Handle display of billing address details based on checkbox
    // const billingDetails = document.getElementById('billingDetails');
    // if (billingDetails) {
    //   billingDetails.style.display = isBillingSameAsShipping ? 'none' : 'block';
    // }

    // Cleanup on component unmount or when modal state changes
    return () => {
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
      }
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, isBillingSameAsShipping, onClose]);
  const handleCheckboxChange = () => {
    setIsBillingSameAsShipping(!isBillingSameAsShipping);
  };

  const handleShippingAddressChange = (e) => {
    const {name, value} = e.target;
    setShippingAddress((prev) => ({...prev, [name]: value}));
  };

  const handleBillingAddressChange = (e) => {
    const {name, value} = e.target;
    setBillingAddress((prev) => ({...prev, [name]: value}));
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
              <img
                onClick={onClose}
                src={BackIcon}
                role="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="wh-26 mi-lg mi-back_arrow d-none me-2"
              />
              {type === 'add' ? 'Add New Address' : 'Edit Address'}
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
                  <div className="col-12 col-sm-12 mb-3">
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
                  {/* <div className="col-12 col-sm-6 mb-3">
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
                  </div> */}
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
                    <select
                      name="city"
                      className="form-select"
                      id="city"
                      value={shippingAddress.city}
                      onChange={handleShippingAddressChange}
                    >
                      <option value="" className="select-placeholder" selected>
                        Select
                      </option>
                      <option value="city1">City 1</option>
                      <option value="city2">City 2</option>
                      {/* Add options here */}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="state" className="form-label">
                      State / Province
                    </label>
                    <select
                      name="state"
                      className="form-select"
                      id="state"
                      value={shippingAddress.state}
                      onChange={handleShippingAddressChange}
                    >
                      <option className="select-placeholder" selected value="">
                        Select
                      </option>
                      <option value="state1">State 1</option>
                      <option value="state2">State 2</option>
                      {/* Add options here */}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="country" className="form-label">
                      Country / Region
                    </label>
                    <select
                      name="country"
                      className="form-select"
                      id="country"
                      value={shippingAddress.country}
                      onChange={handleShippingAddressChange}
                    >
                      <option className="select-placeholder" selected value="">
                        Select
                      </option>
                      <option value="country1">Country 1</option>
                      <option value="country2">Country 2</option>
                      {/* Add options here */}
                    </select>
                  </div>
                </div>
                {/* <div className="row mb-3">
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
                </div> */}
                {/* billing address form */}
                {/* <div className="mt-2 mb-2" id="billingDetails">
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
                      <select
                        name="city"
                        className="form-select"
                        id="billingCity"
                        value={billingAddress.city}
                        onChange={handleBillingAddressChange}
                      >
                        <option className="select-placeholder" selected>
                          Select
                        </option>
                        <option value="city1">City 1</option>
                        <option value="city2">City 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="billingState" className="form-label">
                        State / Province
                      </label>
                      <select
                        name="state"
                        className="form-select"
                        id="billingState"
                        value={billingAddress.state}
                        onChange={handleBillingAddressChange}
                      >
                        <option className="select-placeholder" selected>
                          Select
                        </option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                {/* <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Save address as</label>
                    <div>
                      <button
                        type="button"
                        className={`btn save-address-btn me-3 ${
                          selectedButton === 'home' ? 'clicked' : ''
                        }`}
                        id="homeBtn"
                        onClick={() => handleButtonClick('home')}
                      >
                        Home
                      </button>
                      <button
                        type="button"
                        className={`btn save-address-btn ${
                          selectedButton === 'work' ? 'clicked' : ''
                        }`}
                        id="workBtn"
                        onClick={() => handleButtonClick('work')}
                      >
                        Work
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div
                    id="openDays"
                    style={{
                      display: selectedButton === 'work' ? 'block' : 'none',
                    }}
                  >
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="openSaturday"
                        />
                        <label
                          className="form-check-label address-checkbox"
                          htmlFor="openSaturday"
                        >
                          Open On Saturday
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="openSunday"
                        />
                        <label
                          className="form-check-label address-checkbox"
                          htmlFor="openSunday"
                        >
                          Open On Sunday
                        </label>
                      </div>
                    </div>
                  </div>
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
                </div> */}
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
