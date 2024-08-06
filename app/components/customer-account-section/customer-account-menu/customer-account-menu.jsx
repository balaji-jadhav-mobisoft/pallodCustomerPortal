import React, {useState, useEffect} from 'react';
import {NavLink, Outlet, useLocation} from '@remix-run/react';
import '../customer-account-section.css';
import EditIcon from '~/assets/icon-edit.svg';
import AddressBook from '../address-book/address-book';

function AccountMenu({setActivePage, activePage}) {
  return (
    <>
      <div className="sidebar">
        <NavLink
          style={{width: '100%', display: 'block', textDecoration: 'none'}}
          to="/account/orders"
          className={`menu-items ${
            activePage === 'MY ORDERS' ? 'selected' : ''
          }`}
          role="button"
          onClick={() => setActivePage('MY ORDERS')}
        >
          MY ORDERS
        </NavLink>
        <NavLink
          style={{width: '100%', display: 'block', textDecoration: 'none'}}
          to="/account/addresses"
          className={`menu-items ${
            activePage === 'ADDRESS BOOK' ? 'selected' : ''
          }`}
          role="button"
          onClick={() => setActivePage('ADDRESS BOOK')}
        >
          ADDRESS BOOK
        </NavLink>
        <NavLink
          style={{width: '100%', display: 'block', textDecoration: 'none'}}
          to="/account/profile"
          className={`menu-items ${
            activePage === 'HELP SUPPORT' ? 'selected' : ''
          }`}
          role="button"
          onClick={() => setActivePage('HELP SUPPORT')}
        >
          HELP &amp; SUPPORT
        </NavLink>
      </div>
    </>
  );
}

const CustomerAccountMenu = ({customer}) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState('MY ORDERS');
  const [showSidebar, setShowSidebar] = useState('yes');

  useEffect(() => {
    switch (location.pathname) {
      case '/account/orders':
        setActivePage('MY ORDERS');
        break;
      case '/account/addresses':
        setActivePage('ADDRESS BOOK');
        break;
      case '/account/profile':
        setActivePage('HELP SUPPORT');
        break;
      case '/account/wishlist':
        setShowSidebar('no');
        break;
      default:
        setShowSidebar('no');
        break;
    }
  }, [location.pathname]);

  if (!customer) return null;
  const customerContact = customer?.defaultAddress?.phoneNumber;

  return (
    <div className="">
      <div className="d-flex flex-row mb-4" id="orderListing">
        {showSidebar == 'yes' ? (
          <AccountMenu setActivePage={setActivePage} activePage={activePage} />
        ) : (
          ''
        )}
        <div className="my-orders-list d-flex flex-column flex-grow-1">
          <Outlet context={{customer}} />
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountMenu;
