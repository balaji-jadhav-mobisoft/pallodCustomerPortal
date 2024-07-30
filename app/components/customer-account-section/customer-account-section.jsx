import React from 'react';
import './customer-account-section.css';
import EditIcon from '~/assets/icon-edit.svg';
const CustomerAccountSection = ({customer}) => {
  if (!customer) return null;

  const customerContact = customer?.defaultAddress?.phoneNumber;
  const userEmail = customer?.emailAddress?.emailAddress;
  return (
    <div className="customer-account-section-container">
      {/* <div className="main-container"> */}
      <div
        className="user-details-section   d-flex flex-row justify-content-between"
        id="user-details-section"
      >
        <div className="d-flex flex-column">
          <div className="username">
            Hello, <span>{`${customer.firstName} ${customer.lastName}`}</span>
          </div>
          <div className="contact-info">
            {customerContact} | {userEmail}
          </div>
        </div>
        <div
          className="edit-profile-btn d-flex align-items-center"
          role="button"
          data-bs-toggle="modal"
          data-bs-target="#editProfile"
        >
          <img
            src={EditIcon}
            className="mi-lg mi-edit wh-22 d-inline-block me-2"
          />
          EDIT PROFILE
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CustomerAccountSection;
