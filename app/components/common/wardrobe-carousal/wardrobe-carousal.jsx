import React, {useState, useEffect} from 'react';
import './wardrobe-carousal.css';
import leftIcon from '~/assets/icon_left_chevron.svg';
import rightIcon from '~/assets/icon_right_chevron.svg';
import wishListIcon from '~/assets/wishList-icon.svg';
import {Link} from '@remix-run/react';
import InstagramIcon from '~/assets/instagram-icon (1).svg';

const WardrobeCarousal = ({
  collection,
  wardrobeItems,
  wishList,
  dazzling,
  trendingLooks,
  productDetails,
  similarProduct,
  moreColorProducts,
}) => {
  // Return null if required props are not provided
  if (!collection) return null;

  // State to manage the current start index of the displayed items and items per page
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Handle resizing of the window to adjust items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024 && window.innerWidth > 705) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
      updateButtons();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update navigation button states based on the current index and items per page
  useEffect(() => {
    updateButtons();
  }, [currentStartIndex, itemsPerPage, wardrobeItems.length]);

  // Function to update the state of the navigation buttons
  const updateButtons = () => {
    const prevButton = document.getElementById('wardrobe-prev');
    const nextButton = document.getElementById('wardrobe-next');

    if (prevButton) {
      prevButton.style.opacity = currentStartIndex === 0 ? '0.5' : '1';
      prevButton.style.pointerEvents =
        currentStartIndex === 0 ? 'none' : 'auto';
    }

    if (nextButton) {
      nextButton.style.opacity =
        currentStartIndex + itemsPerPage >= wardrobeItems.length ? '0.5' : '1';
      nextButton.style.pointerEvents =
        currentStartIndex + itemsPerPage >= wardrobeItems.length
          ? 'none'
          : 'auto';
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (currentStartIndex + itemsPerPage < wardrobeItems.length) {
      setCurrentStartIndex(currentStartIndex + itemsPerPage);
    }
  };

  // Handle previous button click
  const handlePrev = () => {
    if (currentStartIndex > 0) {
      setCurrentStartIndex(currentStartIndex - itemsPerPage);
    }
  };

  // Handle mouse over event to change the image source
  const handleMouseOver = (e) => {
    e.currentTarget.src = e.currentTarget.getAttribute('data-hover-src');
  };

  // Handle mouse out event to revert the image source
  const handleMouseOut = (e) => {
    e.currentTarget.src = e.currentTarget.getAttribute('data-original-src');
  };

  // Render the wardrobe items to be displayed
  const renderWardrobeItems = () => {
    const itemsToDisplay = wardrobeItems.slice(
      currentStartIndex,
      currentStartIndex + itemsPerPage,
    );
    return itemsToDisplay.map((item) => (
      <div
        className={`col-3 wardrobe-sec  ${
          moreColorProducts ? 'product-container' : ''
        }`}
        key={item.src}
      >
        <div
          className={`position-relative ${
            productDetails ? 'product-img-wrapper1' : 'product-img-wrapper'
          }`}
        >
          {item.src && (
            <img
              src={item.src}
              data-hover-src={item.hoverSrc}
              data-original-src={item.src}
              alt={item.title}
              className="zoom-img"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          )}
          {item.isBestSeller && (
            <div className="position-absolute top-0 start-0 best-seller">
              Best Seller
            </div>
          )}
          {wishList && (
            <div
              className={`position-absolute wishlist-container ${
                moreColorProducts ? 'wishlist-container1' : ''
              }`}
            >
              <img
                src={wishListIcon}
                className="mi-lg mi-wishlist wh-20 d-inline-block"
                alt="Wishlist Icon"
              />
            </div>
          )}
          {moreColorProducts && (
            <div className="position-absolute add-to-bag-container">
              <button className="add-to-bag-btn">
                <span className="me-2 mi-lg mi-checkout align-text-bottom wh-20 d-inline-block"></span>
                Add to Bag
              </button>
            </div>
          )}
        </div>
        {item.title && <h6 className="product-title">{item.title}</h6>}
        <p className="product-description">{item.description}</p>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {item.discountPrice && (
              <div className="discount-price me-1">
                <span
                  dangerouslySetInnerHTML={{
                    __html: `&#8377 ${item.discountPrice}`,
                  }}
                />
              </div>
            )}
            {item.productPrice && (
              <div className="product-price me-1">
                <span
                  dangerouslySetInnerHTML={{
                    __html: `&#8377 ${item.productPrice}`,
                  }}
                />
              </div>
            )}
            {item.discount && <div className="discount">{item.discount}</div>}
          </div>
          {item.isNew && <div className="new-stock">New</div>}
        </div>
      </div>
    ));
  };

  return (
    <div className="wardrobe-carousal-container">
      {!dazzling && (
        <div className="d-flex justify-content-center mb-3 position-relative wardrobe-carousal-header">
          <div className="section-header mb-0">
            {trendingLooks ? collection : collection?.collection?.title}
            {productDetails && collection.title}
            {similarProduct && !moreColorProducts && 'Similar Products'}
            {moreColorProducts && 'More From Similar color'}
          </div>
          <Link
            to={`/collections/${collection?.collection?.handle}`}
            className="position-absolute bottom-0 end-0 view-all-btn"
          >
            {trendingLooks ? (
              <span>
                VISIT US{' '}
                <img
                  style={{marginLeft: '5px'}}
                  src={InstagramIcon}
                  alt="instagram"
                />
              </span>
            ) : (
              'VIEW ALL'
            )}
          </Link>
        </div>
      )}
      <div
        className={`fluid-container position-relative ${
          similarProduct ? 'similar-product-container' : 'main-container'
        }`}
      >
        <div className="row" id="wardrobeItems">
          {renderWardrobeItems()}
        </div>
        <img
          src={leftIcon}
          height={35}
          width={35}
          className="mi-lg mi-chevron_left wh-34 d-inline-block position-absolute left-scroll"
          id="wardrobe-prev"
          onClick={handlePrev}
          alt="Previous"
        />
        <img
          src={rightIcon}
          height={35}
          width={35}
          className="mi-lg mi-chevron_right wh-34 d-inline-block position-absolute right-scroll"
          id="wardrobe-next"
          onClick={handleNext}
          alt="Next"
        />
      </div>
    </div>
  );
};

export default WardrobeCarousal;
