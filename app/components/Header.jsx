import {Suspense, useEffect, useRef, useState} from 'react';
import {
  Await,
  Form,
  Link,
  NavLink,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import {Image, useAnalytics} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import PallodIcon from '~/assets/pallod-logo.svg?url';
import ProfileIcon from '~/assets/profile-icon.svg';
import WishListIcon from '~/assets/wishList-icon.svg';
import CartIcon from '~/assets/cart-icon.svg';
import SearchIcon from '~/assets/search-icon.svg';
import MenuIcon from '~/assets/menu-icon.svg';
import RupeesIcon from '~/assets/icon-rupees.svg';
import StoreIcon from '~/assets/store-icon.svg';
import HelpInfoIcon from '~/assets/help-info-icon.svg';
import AboutUsIcon from '~/assets/about-us-icon.svg';
import RightIcon from '~/assets/right-icon.svg';
import InstagramIcon from '~/assets/instagram-icon.svg';
import FacebookIcon from '~/assets/facebook-icon.svg';
import EditIcon from '~/assets/icon-edit.svg';
import OrderIcon from '~/assets/checkout.svg';
import RightIconChevron from '~/assets/icon_right_chevron.svg';
import AddressBookIcon from '~/assets/icon-address-book.svg';
import LogoutIcon from '~/assets/Icon_Logout.svg';
import HelpIcon from '~/assets/icon_help.svg';
import CheckIcon from '~/assets/Icon_Check.svg';
import BackArrowIcon from '~/assets/Icon_Back_Arrow.svg';
import HeaderMobileOffcanvas from './common/header-profile-offcanvas/header-profile-offcanvas';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <>
      <TopHeader />
      <header className="header common">
        <div className="d-grid grid-column-gap-10">
          <div className="header-logo-section d-flex justify-content-between">
            <div className="col-4 header-icon-section">
              <HeaderMenuMobileToggle />
              <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
                <img className="pallod-icon" src={PallodIcon} alt="pallod" />
              </NavLink>
            </div>
            <div className="header-ctas-container col-7">
              <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
          </div>
          <div className="search-input-container-mobile">
            <SearchForm className="search-input-section-mobile" />
          </div>
          <div>
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>
        </div>
      </header>
    </>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const [modalData, setModalData] = useState('');
  const className = `header-menu-${viewport}`;

  const headerMenuMobileCard = [
    {image: StoreIcon, title: 'Store Locator'},
    {image: HelpInfoIcon, title: 'Help & Support'},
    {image: AboutUsIcon, title: 'About Us'},
  ];

  // Close aside function for mobile
  const closeAside = (event) => {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  };

  useEffect(() => {
    if (modalData) {
      document.body.classList.add('hide-scroll');
    } else {
      document.body.classList.remove('hide-scroll');
    }

    return () => {
      document.body.classList.remove('hide-scroll');
    };
  }, [modalData]);

  // Handle mouse enter event for showing modal data
  const handleMouseEnter = (resourceId) => {
    const data = menu?.items.filter((item) => item.resourceId === resourceId);
    setModalData(data);
  };

  // Handle mouse leave event for hiding modal data
  const handleMouseLeave = () => {
    setModalData('');
  };

  // Render mobile INR dropdown
  const renderMobileDropdown = () => (
    <div className="dropdown-container">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle font-14 currency-toggle full-width-button"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span>
            <img src={RupeesIcon} alt="rupees" />{' '}
            <span className="rupees-text fs-14 fw-500">INR</span>
          </span>
        </button>
        {/* <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{width: '100%'}}
        >
          <li>
            <Link className="dropdown-item" href="#">
              600
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              700
            </Link>
          </li>
        </ul> */}
      </div>
    </div>
  );

  // Render menu items for categories
  const renderMenuItems = () =>
    menu?.items
      .filter((item) => item.title === 'Category')
      .flatMap((item) =>
        item?.items.map((val, index) => {
          if (!val) return null;

          const url =
            val.url.includes('myshopify.com') ||
            val.url.includes(publicStoreDomain) ||
            val.url.includes(primaryDomainUrl)
              ? new URL(val.url).pathname
              : val.url;

          const image = val?.resource?.image?.url;

          return (
            <NavLink
              key={index}
              to={url}
              className={`header-menu-item ${
                viewport === 'desktop' ? 'nav-link' : 'nav-link-mobile'
              }`}
              onClick={closeAside}
              prefetch="intent"
              style={{textDecoration: 'none'}}
            >
              {viewport === 'desktop' ? (
                <span
                  onMouseEnter={() => handleMouseEnter(val.resourceId)}
                  className="header-category-menus"
                  style={{padding: '5px'}}
                >
                  {val.title}
                </span>
              ) : (
                <span
                  className="header-category-menus-mobile fw-600"
                  style={{padding: '5px'}}
                >
                  <img
                    src={image}
                    alt="category"
                    height={40}
                    width={40}
                    style={{borderRadius: '50%'}}
                  />
                  {val.title}
                </span>
              )}
            </NavLink>
          );
        }),
      );

  // Render mobile cards
  const renderMobileCards = () => (
    <div>
      {headerMenuMobileCard.map((card, index) => (
        <div
          key={index}
          className="row border justify-content-between header-menu-mobile-card-container"
        >
          <div className="d-flex col-9">
            <img src={card.image} alt={card.title} />
            <div className="ml-15 fw-600">{card.title}</div>
          </div>
          <div className="col-2 mobile-card-right-icon">
            <img src={RightIcon} alt="right arrow" />
          </div>
        </div>
      ))}
      <Link to="/" className="text-decoration-none" onClick={closeAside}>
        {['Terms Of Use', 'Privacy Policy'].map((val, index) => (
          <div key={index} className="m-10 mt-20 mobile-menu">
            {val}
          </div>
        ))}
        <div className="d-flex">
          {[InstagramIcon, FacebookIcon].map((val, index) => (
            <div key={index} className="m-10">
              {<img className="d-flex" src={val} alt="social" />}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );

  return (
    <nav
      className={className}
      role="navigation"
      key={menu.id}
      onMouseLeave={handleMouseLeave}
    >
      {viewport === 'mobile' && renderMobileDropdown()}
      {renderMenuItems()}
      {viewport === 'mobile' && renderMobileCards()}
      {modalData && <SubMenuModal data={modalData} />}
    </nav>
  );
}

const SubModalSection = ({section}) => {
  if (!section) return null;
  function closeAside(event) {
    event.preventDefault();
    window.location.href = event.currentTarget.href;
  }
  return (
    <div className="me-5">
      <h5 className="subnav-content-common">{section.title.split('-')[1]}</h5>
      {section?.items?.map((item, index) => {
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            to={url}
            className="sub-nav-link"
            key={index}
            prefetch="intent"
            onClick={closeAside}
          >
            <p className="subnav-content-common">{item.title}</p>
          </NavLink>
        );
      })}
    </div>
  );
};

const SubMenuModal = ({data}) => {
  return (
    <>
      {data.map((val, index) => {
        if (!val) return null;
        const [fabricSection, styleSection, occasionSection] = val?.items;
        const image = val?.resource?.image?.url;

        return (
          <div
            className="subnav-content justify-content-between d-flex"
            key={index}
          >
            <div className="d-flex flex-row">
              <SubModalSection section={fabricSection} />
              <SubModalSection section={styleSection} />
              <SubModalSection section={occasionSection} />
            </div>
            <div className="subnav-img">
              <Image
                src={image}
                alt="Wedding Special Image"
                sizes="(max-width: 600px) 100vw, 50vw"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

// Top Header
export function TopHeader() {
  return (
    <>
      <div className="d-flex fixed-top align-items-center justify-content-center font-14 animate-text">
        <span className="ticker-text-container">
          Shipping Happiness to your door
        </span>
      </div>
    </>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button className="help-btn" type="submit">
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
    </Form>
  );
}
/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */

function HeaderCtas({isLoggedIn, cart}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffcanvas, setIsOffcanvas] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const {customer} = useLoaderData();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      profileIconRef.current &&
      !profileIconRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOffcanvas) {
      const offcanvasElement = document.getElementById('loginOffcanvas');
      const bootstrapOffcanvas = new window.bootstrap.Offcanvas(
        offcanvasElement,
      );
      bootstrapOffcanvas.show();

      offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
        setIsOffcanvas(false);
      });
    }
  }, [isOffcanvas]);

  return (
    <nav className="header-ctas" role="navigation">
      <SearchForm className="header-search" />
      <div className="currency-dropdown">
        <button
          className="btn btn-secondary dropdown-toggle font-14 currency-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          &#8377; INR
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link className="dropdown-item" href="#">
            $
          </Link>
          <Link className="dropdown-item" href="#">
            $
          </Link>
        </div>
      </div>

      <Suspense fallback="Sign in">
        <Await resolve={isLoggedIn} errorElement="Sign in">
          {(isLoggedIn) =>
            isLoggedIn ? (
              <>
                <button
                  id="profileIcon"
                  ref={profileIconRef}
                  onClick={toggleDropdown}
                  className="profile-icon-button"
                >
                  <img src={ProfileIcon} alt="profile" />
                </button>
                <button
                  onClick={() => setIsOffcanvas(true)}
                  className="profile-offcanvas-icon d-none"
                  style={{border: 'none', background: 'none'}}
                  role="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#loginOffcanvas"
                  aria-controls="loginOffcanvas"
                >
                  <img src={ProfileIcon} alt="profile" />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    id="dropdownContent"
                    className="dropdown-content"
                  >
                    <div
                      className="logged-user d-flex flex-row justify-content-between"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editProfile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="d-flex flex-column">
                        <div className="user-name">
                          Hello,
                          {customer?.firstName || customer?.lastName
                            ? `${customer?.firstName} ${customer?.lastName}`
                            : ''}
                        </div>
                        <div className="mob-no">
                          {customer?.defaultAddress?.phoneNumber}
                        </div>
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
                    <NavLink
                      to="/account/orders"
                      style={{textDecoration: 'none'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
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
                    <NavLink
                      to="/account/addresses"
                      style={{textDecoration: 'none'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
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
                    <NavLink
                      to="/"
                      style={{textDecoration: 'none'}}
                      onClick={() => setIsDropdownOpen(false)}
                    >
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
                    <Logout />
                  </div>
                )}
                <div
                  className="modal fade"
                  id="editProfile"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="editProfileLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title d-flex align-items-center"
                          id="editProfileLabel"
                        >
                          <img
                            src={BackArrowIcon}
                            height={26}
                            width={26}
                            className="d-none mi-lg mi-back_arrow wh-26 me-2"
                            role="button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></img>
                          Edit Profile
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form id="editProfileForm">
                          <div className="row">
                            <div className="col-12 mb-3 position-relative">
                              <label
                                htmlFor="mobileNumber"
                                className="form-label"
                              >
                                Mobile Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="mobileNumber"
                                value="+91 9789898989"
                                disabled
                              />
                              <img
                                src={CheckIcon}
                                width={14}
                                height={14}
                                className="mi-lg mi-check wh-14 d-inline-block position-absolute"
                              ></img>
                              <span
                                className="change-number position-absolute"
                                role="button"
                                id="changeProfileBtn"
                                data-bs-toggle="modal"
                                data-bs-target="#changeRegNo"
                                data-bs-dismiss="modal"
                              >
                                CHANGE
                              </span>
                            </div>
                            <div className="col-12 mb-3 position-relative">
                              <label
                                htmlFor="emailId"
                                className="form-label required"
                              >
                                Email ID
                              </label>
                              <input
                                type="text"
                                className="form-control mb-1"
                                id="emailId"
                                value="m.radha92@gmail.com"
                                required
                                disabled
                              />
                              <img
                                src={CheckIcon}
                                width={14}
                                height={14}
                                className="mi-lg email-check mi-check wh-14 d-inline-block position-absolute"
                              ></img>
                              <span
                                className="change-number position-absolute"
                                role="button"
                                id="changeEmailBtn"
                                data-bs-toggle="modal"
                                data-bs-target="#changeRegEmail"
                                data-bs-dismiss="modal"
                              >
                                CHANGE
                              </span>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <label
                                htmlFor="firstName"
                                className="form-label required"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control error-border mb-1"
                                id="firstName"
                                placeholder="Enter First Name"
                                required
                              />
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <label
                                htmlFor="lastName"
                                className="form-label required"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control error-border mb-1"
                                id="lastName"
                                placeholder="Enter Last Name"
                                required
                              />
                            </div>

                            <div className="mb-3 sub-header">
                              Alternate Mobile Number Details
                            </div>
                            <div className="col-12 col-sm-6">
                              <label
                                htmlFor="mobNumber"
                                className="form-label required"
                              >
                                Mobile Number
                              </label>
                              <div className="d-flex flex-row">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="countryCode"
                                  value="+91"
                                  disabled
                                />
                                <input
                                  type="tel"
                                  className="form-control"
                                  id="mobNumber"
                                  placeholder="Enter Mobile Number"
                                  required
                                />
                              </div>
                              <div className="validation-text">
                                This will help to recover your account if needed
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <label
                                htmlFor="hintName"
                                className="form-label required"
                              >
                                Hint Name
                              </label>
                              <input
                                type="text"
                                className="form-control mb-1"
                                id="hintName"
                                placeholder="Enter Hint Name"
                                required
                              />
                              <div className="validation-text">
                                Hint Name will help you to identify alternate
                                number
                              </div>
                            </div>
                          </div>
                        </form>

                        <div className="d-none responsive-btn-group">
                          <button className="save-btn" data-bs-dismiss="modal">
                            SAVE DETAILS
                          </button>
                          <hr />
                          <button
                            className="delete-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteConfirmation"
                            data-bs-dismiss="modal"
                          >
                            DELETE ACCOUNT
                          </button>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="delete-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteConfirmation"
                          data-bs-dismiss="modal"
                        >
                          DELETE ACCOUNT
                        </button>
                        <button
                          type="button"
                          className="save-details-btn"
                          data-bs-dismiss="modal"
                        >
                          SAVE DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- delete profile modal --> */}
                <div
                  className="modal fade"
                  id="deleteConfirmation"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="deleteConfirmationLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title d-flex align-items-center"
                          id="deleteConfirmation"
                        >
                          <span
                            className="d-none mi-lg mi-back_arrow wh-26 me-2"
                            role="button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></span>
                          Delete Account
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="delete-alert">
                          Are you sure you want to delete your account?
                        </div>
                        <div className="delete-alert-text">
                          By deleting your account, you will lose access to your
                          order history, saved addresses, and preferences.
                          Please note that this action is permanent and cannot
                          be reversed. Your account data will be permanently
                          deleted from our system and cannot be recovered.
                          <div className="mt-2">
                            If you have any questions or need assistance, please
                            contact our support team.
                          </div>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreeToTerms"
                          />
                          <label
                            className="form-check-label agree-checkbox"
                            htmlFor="agreeToTerms"
                          >
                            I agree to all the terms and conditions*
                          </label>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="delete-btn anyway-btn"
                          data-bs-dismiss="modal"
                        >
                          DELETE ANYWAY
                        </button>
                        <button
                          type="button"
                          className="save-details-btn"
                          data-bs-dismiss="modal"
                        >
                          KEEP ACCOUNT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- change registered number modal --> */}
                <div
                  className="modal fade"
                  id="changeRegNo"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="changeRegNoLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="changeRegNoLabel">
                          2-Step Verification Required
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="delete-alert verification-alert">
                          For enhanced security, select a previously used mobile
                          number to receive a one-time password.
                        </div>
                        <div>
                          <label
                            htmlFor="mobileNumber"
                            className="form-label required"
                          >
                            Mobile Number
                          </label>
                          <div className="d-flex flex-row">
                            <input
                              type="text"
                              className="form-control"
                              id="countryCode"
                              value="+91"
                              disabled
                            />
                            <input
                              type="tel"
                              className="form-control"
                              id="mobileNumber"
                              value="9734756841"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="cancel-btn"
                          data-bs-dismiss="modal"
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          className="save-details-btn"
                          data-bs-dismiss="modal"
                          data-bs-toggle="modal"
                          data-bs-target="#verifyOtp"
                        >
                          REQUEST OTP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- change registered email modal --> */}
                <div
                  className="modal fade"
                  id="changeRegEmail"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="changeRegEmailLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="changeRegEmailLabel">
                          2-Step Verification Required
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="delete-alert verification-alert">
                          For enhanced security, select a previously used mobile
                          number to receive a one-time password.
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="form-label required"
                          >
                            Email ID
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value="mradha@gmail.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="cancel-btn"
                          data-bs-dismiss="modal"
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          className="save-details-btn"
                          data-bs-dismiss="modal"
                          data-bs-toggle="modal"
                          data-bs-target="#verifyOtpEmail"
                        >
                          REQUEST OTP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- 2 step verification number offcanvas --> */}
                <div
                  className="offcanvas offcanvas-bottom"
                  tabIndex="-1"
                  id="twoStepVerification"
                  aria-labelledby="twoStepVerificationLabel"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id="twoStepVerificationLabel"
                    >
                      2-Step Verification Required
                    </h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <div className="delete-alert verification-alert">
                      For enhanced security, select a previously used mobile
                      number to receive a one-time password.
                    </div>
                    <div>
                      <label
                        htmlFor="mobileNumber"
                        className="form-label required"
                      >
                        Mobile Number
                      </label>
                      <div className="d-flex flex-row">
                        <input
                          type="text"
                          className="form-control"
                          id="countryCode"
                          value="+91"
                          disabled
                        />
                        <input
                          type="tel"
                          className="form-control"
                          id="mobileNumber"
                          value="9999999999"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="req-otp-btn"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      data-bs-toggle="modal"
                      data-bs-target="#verifyOtp"
                    >
                      REQUEST OTP
                    </button>
                  </div>
                </div>

                {/* <!-- 2 step verification email offcanvas --> */}
                <div
                  className="offcanvas offcanvas-bottom"
                  tabIndex="-1"
                  id="twoStepVerificationEmail"
                  aria-labelledby="twoStepVerificationEmailLabel"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id="twoStepVerificationEmailLabel"
                    >
                      2-Step Verification Required
                    </h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <div className="delete-alert verification-alert">
                      For enhanced security, select a previously used mobile
                      number to receive a one-time password.
                    </div>
                    <div>
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

                    <button
                      type="button"
                      className="req-otp-btn"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      data-bs-toggle="modal"
                      data-bs-target="#verifyOtpEmail"
                    >
                      REQUEST OTP
                    </button>
                  </div>
                </div>

                {/* <!-- login/logout offcanvas --> */}
                {isOffcanvas && (
                  <HeaderMobileOffcanvas
                    isOffcanvas={isOffcanvas}
                    setIsOffcanvas={setIsOffcanvas}
                  />
                )}
              </>
            ) : (
              <>
                <button
                  id="profileIcon"
                  ref={profileIconRef}
                  onClick={toggleDropdown}
                  className="profile-icon-button"
                >
                  <img src={ProfileIcon} alt="profile" />
                </button>
                <button
                  onClick={() => setIsOffcanvas(true)}
                  className="profile-offcanvas-icon d-none"
                  style={{border: 'none', background: 'none'}}
                  role="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#loginOffcanvas"
                  aria-controls="loginOffcanvas"
                >
                  <img src={ProfileIcon} alt="profile" />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    id="dropdownContent"
                    className="dropdown-content"
                  >
                    <button className="logout-button">
                      <NavLink
                        prefetch="intent"
                        to="/account"
                        style={{textDecoration: 'none', color: '#fff'}}
                      >
                        LOGIN/SIGN UP
                      </NavLink>
                    </button>

                    <NavLink
                      onClick={() => setIsOffcanvas(false)}
                      to="/"
                      style={{textDecoration: 'none'}}
                    >
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
                  </div>
                )}
                {isOffcanvas && (
                  <HeaderMobileOffcanvas
                    isOffcanvas={isOffcanvas}
                    setIsOffcanvas={setIsOffcanvas}
                    isLoggedOut={true}
                  />
                )}
              </>
            )
          }
        </Await>
      </Suspense>

      <img src={WishListIcon} alt="wishList" />

      <CartToggle cart={cart} />
    </nav>
  );
}
export function SearchForm({searchTerm, className}) {
  const inputRef = useRef(null);

  const [dynamicPlaceholder, setDynamicPlaceholder] = useState('S');
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    }

    const placeholderWords = ['Style', 'Collection', 'Product', 'Design'];
    let currentCharIndex = 0;

    const intervalId = setInterval(() => {
      const word = placeholderWords[currentWord];
      currentCharIndex++;

      if (currentCharIndex > word.length) {
        currentCharIndex = 0;
        setCurrentWord((prev) => (prev + 1) % placeholderWords.length);
      }

      setDynamicPlaceholder(word.slice(0, currentCharIndex));
    }, 140);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentWord]);

  return (
    <Form method="get" className={className}>
      <div className={'search-input-container'}>
        <img src={SearchIcon} alt="Search" className="search-icon" />
        <input
          defaultValue={searchTerm}
          name="q"
          placeholder={`Search for ${dynamicPlaceholder}`}
          ref={inputRef}
          type="search"
          className="search-input"
        />
      </div>
    </Form>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <img src={MenuIcon} alt="menu-icon" />
    </button>
  );
}

// function SearchToggle() {
//   const {open} = useAside();
//   return (
//     <button className="reset" onClick={() => open('search')}>
//       Search
//     </button>
//   );
// }

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();

        navigate('/cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      <img src={CartIcon} alt="cart" /> {count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
