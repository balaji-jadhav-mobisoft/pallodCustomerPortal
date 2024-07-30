import React, {useState, useEffect} from 'react';
import EditIcon from '~/assets/icon-edit.svg';
import RightIcon from '~/assets/plus_icon.svg';
import delivered_icon from '~/assets/delivery.svg';
import Icon_back_Arrow from '~/assets/Icon_Back_Arrow.svg';
import './address-book.css';

const AddressBook = ({customer}) => {
  const {defaultAddress, addresses} = customer;
  const [selectedAddress, setSelectedAddress] = useState('defaultAddress');
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  const [selectedButton, setSelectedButton] = useState('home');

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.id);
  };
  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

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

  const formatAddress = (address) => {
    return `${address.address1}, ${address.address1}, ${address.city}, Near ${address.company}, ${address.zoneCode}, ${address.zip}`;
  };

  const formatOtherAddress = (address) => {
    if (!address.address1 || !address.city || !address.zip) {
      return address.formatted.join(', ');
    }
    return `${address.address1}, ${address.address1}, ${address.city}, Near ${
      address.company || ''
    }, ${address.zoneCode || ''}, ${address.zip || ''}`;
  };

  const AddressBlock = ({address, selectedAddress, handleAddressChange}) => {
    return (
      <div className="address-block position-relative ">
        <div className="address-category position-absolute">Work</div>
        <input
          className="form-check-input"
          type="radio"
          name="addressType"
          id={address.id}
          value={address.id}
          checked={selectedAddress === address.id}
          onChange={handleAddressChange}
        />
        <label
          className="form-check-label d-flex flex-column"
          htmlFor={address.id}
        >
          <div className="username">{`${address.firstName} ${address.lastName}`}</div>
          <div className="address">{formatOtherAddress(address)}</div>
          {address.phoneNumber && (
            <div className="contact d-flex flex-row">
              <div className="contact-type">Mobile:</div>
              <div className="content">{address.phoneNumber}</div>
            </div>
          )}
          {address.email && (
            <div className="contact d-flex flex-row">
              <div className="contact-type">Email:</div>
              <div className="content">{address.email}</div>
            </div>
          )}
          {selectedAddress === address.id && (
            <div className="action-btns d-flex flex-row justify-content-between">
              <div className="d-flex remove-edit-btns">
                <button className="me-3">REMOVE</button>{' '}
                <button data-bs-toggle="modal" data-bs-target="#addAddress">
                  EDIT
                </button>
              </div>
            </div>
          )}
        </label>
      </div>
    );
  };

  // Exclude default address from other addresses
  const otherAddresses = addresses?.nodes?.filter(
    (address) => address.id !== defaultAddress?.id,
  );
  return (
    <div className="address-book-container">
      {/* <!-- add address modal --> */}
      <div
        className="modal fade"
        id="addAddress"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addAddressLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title d-flex align-items-center"
                id="addAddressLabel"
              >
                <img
                  src={Icon_back_Arrow}
                  role="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="wh-16 d-none me-2 back-arrow-icon"
                />
                Add New Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container" id="shippingDetailsForm">
                <form>
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
                      {/* <div className="error-text">This field is required</div> */}
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
                      <select className="form-select" id="city">
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
                      <label htmlFor="state" className="form-label">
                        State / Province
                      </label>
                      <select className="form-select" id="state">
                        <option className="select-placeholder" selected>
                          Select
                        </option>
                        {/* Add options here */}
                      </select>
                    </div>
                    <div className="col-6">
                      <label htmlFor="country" className="form-label">
                        Country / Region
                      </label>
                      <select className="form-select" id="country">
                        <option className="select-placeholder" selected>
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

                        <button
                          type="button"
                          className="btn save-address-btn ms-3"
                          id="workBtn"
                        >
                          Other
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
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="add-btn"
                // data-bs-toggle="modal"
                // data-bs-target="#deleteConfirmation"
                data-bs-dismiss="modal"
              >
                SAVE ADDRESS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* main-section */}
      <div className=" d-flex flex-row mb-4">
        <div className="my-orders-list d-flex flex-column flex-grow-1">
          {/* empty address section */}
          {/* <h3>Saved Address</h3>
    <div
      class="d-flex justify-content-center align-items-center flex-grow-1"
    >
      <div
        class="empty-section d-flex flex-column justify-content-center align-items-center"
      >
        <div class="empty-img">
          <img
            src="../static/images/wishlist-empty/Empty_Address.webp"
            alt="No Orders"
          />
        </div>
        <div class="no-orders-header">SAVE YOUR ADDRESSES NOW</div>
        <div class="no-orders-text">
          Add your home and office addresses and enjoy faster checkout
        </div>
        <button class="continue-shopping-btn d-flex align-items-center" data-bs-toggle="modal"
          data-bs-target="#addAddress">
          <span
            class="mi-lg mi-add bg-white wh-20 d-inline-block me-2"
          ></span
          >ADD NEW ADDRESS
        </button>
      </div>
    </div> */}
          <div className="nav-section d-flex flex-row justify-content-between align-items-center">
            <h3>
              Saved Address
              {addresses?.nodes?.length ? ` (${addresses?.nodes?.length})` : ''}
            </h3>
            <button
              className="add-new-address-btn d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#addAddress"
            >
              <img
                src={RightIcon}
                className="mi-lg mi-add wh-18 me-2 d-inline-block"
              />
              ADD NEW ADDRESS
            </button>
          </div>
          {/* default address */}
          <h5 className="address-type default-type">DEFAULT ADDRESS:</h5>
          {defaultAddress && (
            <div className="default-address">
              <AddressBlock
                address={defaultAddress}
                selectedAddress={selectedAddress}
                handleAddressChange={handleAddressChange}
              />
            </div>
          )}
          {/* other address */}
          <h5 className="address-type">OTHER ADDRESS:</h5>
          <div>
            {otherAddresses?.map((address) => (
              <AddressBlock
                key={address.id}
                address={address}
                selectedAddress={selectedAddress}
                handleAddressChange={handleAddressChange}
              />
            ))}
          </div>
        </div>
        <div className="d-none add-address-fixed">
          <button
            className="d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#addAddress"
          >
            <img
              src={RightIcon}
              className="mi-lg mi-add wh-20 d-inline-block me-2"
            />
            ADD NEW ADDRESS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
