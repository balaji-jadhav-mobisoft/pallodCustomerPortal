import {Suspense, useEffect, useRef, useState} from 'react';
import {Await, Form, Link, NavLink, useNavigate} from '@remix-run/react';
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
        <ul
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
        </ul>
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

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */

function HeaderCtas({isLoggedIn, cart}) {
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
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) =>
              isLoggedIn ? (
                <img src={ProfileIcon} alt="profile" />
              ) : (
                <img src={ProfileIcon} alt="profile" />
              )
            }
          </Await>
        </Suspense>
      </NavLink>

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
