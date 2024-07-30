import {NavLink} from '@remix-run/react';
import React from 'react';
import BackArrowIcon from '~/assets/Icon_Back_Arrow.svg';
import WishListIcon from '~/assets/wishList-icon.svg';
import CartIcon from '~/assets/cart-icon.svg';
import EditIcon from '~/assets/icon-edit.svg';
import OrderIcon from '~/assets/checkout.svg';
import RightIconChevron from '~/assets/icon_right_chevron.svg';
import AddressBookIcon from '~/assets/icon-address-book.svg';
import LogoutIcon from '~/assets/Icon_Logout.svg';
import HelpIcon from '~/assets/icon_help.svg';
const HeaderMobileOffcanvas = ({isOffcanvas, isLoggedOut}) => {
  return (
    <div
      className={`offcanvas offcanvas-end ${isOffcanvas ? 'show' : ''}`}
      tabIndex="-1"
      id="loginOffcanvas"
      aria-labelledby="loginOffcanvasLabel"
      style={isOffcanvas ? {visibility: 'visible'} : {}}
    >
      <div className="offcanvas-header">
        <h5 id="loginOffcanvasLabel" className="d-flex align-items-center mb-0">
          <img
            src={BackArrowIcon}
            role="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            className="mi-lg mi-back_arrow wh-26 me-2 d-inline-block"
          ></img>
          Profile
        </h5>
        <div className="d-flex flex-row">
          <img
            src={WishListIcon}
            height={20}
            width={20}
            className="mi-lg mi-wishlist_2 wh-20 d-inline-block me-4"
          ></img>
          <img
            src={CartIcon}
            height={20}
            width={20}
            className="mi-lg mi-checkout wh-20 d-inline-block"
          ></img>
        </div>
      </div>
      <div className="offcanvas-body">
        {isLoggedOut ? (
          <>
            <button className="login-btn">LOGIN / SIGNUP</button>
            <NavLink to="/" style={{textDecoration: 'none'}}>
              <button className="help-btn navigate-to-help">
                <div className="d-flex flex-row justify-content-between help-text align-items-center">
                  <img
                    src={HelpIcon}
                    height={18}
                    width={18}
                    className="mi-lg mi-help wh-18 d-inline-block me-2"
                  ></img>
                  Help & Support
                </div>
                <img
                  src={RightIconChevron}
                  height={18}
                  width={18}
                  className="mi-lg mi-chevron_right wh-18 d-inline-block"
                ></img>
              </button>
            </NavLink>
          </>
        ) : (
          <>
            {/* <!-- profile popup after login  --> */}
            <div
              className="logged-user d-flex flex-row justify-content-between"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#editProfile"
            >
              <div className="d-flex flex-column">
                <div className="user-name">Hello, Radha Mehta</div>
                <div className="mob-no">+91 9734756841</div>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src={EditIcon}
                  height={18}
                  width={18}
                  className="mi-lg mi-edit wh-18 d-inline-block"
                ></img>
              </div>
            </div>
            <NavLink to="/account/orders" style={{textDecoration: 'none'}}>
              <button className="help-btn navigate-to-my-orders">
                <div className="d-flex flex-row justify-content-between help-text align-items-center">
                  <img
                    src={OrderIcon}
                    height={18}
                    width={18}
                    className="mi-lg mi-checkout wh-18 d-inline-block me-2"
                  ></img>
                  My Orders
                </div>

                <img
                  src={RightIconChevron}
                  height={18}
                  width={18}
                  className="mi-lg mi-chevron_right wh-18 d-inline-block"
                ></img>
              </button>
            </NavLink>
            <NavLink to="/account/addresses" style={{textDecoration: 'none'}}>
              <button className="help-btn navigate-to-address-book">
                <div className="d-flex flex-row justify-content-between help-text align-items-center">
                  <img
                    src={AddressBookIcon}
                    height={18}
                    width={18}
                    className="mi-lg mi-address_book wh-18 d-inline-block me-2"
                  ></img>
                  Address Book
                </div>
                <img
                  src={RightIconChevron}
                  height={18}
                  width={18}
                  className="mi-lg mi-chevron_right wh-18 d-inline-block"
                ></img>
              </button>
            </NavLink>
            <NavLink to="/" style={{textDecoration: 'none'}}>
              <button className="help-btn navigate-to-help">
                <div className="d-flex flex-row justify-content-between help-text align-items-center">
                  <img
                    src={HelpIcon}
                    height={18}
                    width={18}
                    className="mi-lg mi-help wh-18 d-inline-block me-2"
                  ></img>
                  Help & Support
                </div>
                <img
                  src={RightIconChevron}
                  height={18}
                  width={18}
                  className="mi-lg mi-chevron_right wh-18 d-inline-block"
                ></img>
              </button>
            </NavLink>
            <button className="help-btn">
              <div className="d-flex flex-row justify-content-between logout-text align-items-center">
                <img
                  src={LogoutIcon}
                  height={18}
                  width={18}
                  className="mi-lg mi-logout wh-18 d-inline-block me-2"
                ></img>
                LOGOUT
              </div>
              <img
                src={RightIconChevron}
                height={18}
                width={18}
                className="mi-lg mi-chevron_right wh-18 d-inline-block"
              ></img>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderMobileOffcanvas;
