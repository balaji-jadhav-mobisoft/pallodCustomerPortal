import React, {useState, useEffect} from 'react';
import './wardrobe-favorites.css';
import leftIcon from '~/assets/icon_left_chevron.svg';
import rightIcon from '~/assets/icon_right_chevron.svg';
import wishListIcon from '~/assets/wishList-icon.svg';
import {Link} from '@remix-run/react';

const WardrobeFavorites = ({collection, primaryDomain, publicStoreDomain}) => {
  // Return null if required props are not provided
  if (!collection || !primaryDomain || !publicStoreDomain) return null;

  // State to manage the current start index of the displayed items and items per page
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Extract products from the collection
  const products = collection.collection.products.nodes || [];

  // Map products to wardrobeItems with necessary properties
  const wardrobeItems = products.map((product) => {
    if (!product) return null;

    const originalPrice = parseFloat(
      product.compareAtPriceRange.maxVariantPrice.amount,
    );
    const discountedPrice = parseFloat(
      product.priceRange.minVariantPrice.amount,
    );
    const discountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;

    return {
      src: product.images.nodes[0]?.url,
      hoverSrc: product.images.nodes[1]?.url,
      title: product.title,
      description: product.description,
      productPrice: originalPrice,
      discountPrice: discountedPrice,
      discount: `${discountPercentage.toFixed(0)}% OFF`,
      isBestSeller: product.tags.includes('Best Seller'),
      isNew: product.tags.includes('New'),
    };
  });

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
      <div className="col-3 wardrobe-sec" key={item.src}>
        <div className="product-img-wrapper position-relative">
          <img
            src={item.src}
            data-hover-src={item.hoverSrc}
            data-original-src={item.src}
            alt={item.title}
            className="zoom-img"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
          {item.isBestSeller && (
            <div className="position-absolute top-0 start-0 best-seller">
              Best Seller
            </div>
          )}
          <div className="position-absolute wishlist-container">
            <img
              src={wishListIcon}
              className="mi-lg mi-wishlist wh-20 d-inline-block"
              alt="Wishlist Icon"
            />
          </div>
        </div>
        <h6 className="product-title">{item.title}</h6>
        <p className="product-description">{item.description}</p>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="discount-price me-1">
              <span
                dangerouslySetInnerHTML={{
                  __html: `&#8377 ${item.discountPrice}`,
                }}
              />
            </div>
            <div className="product-price me-1">
              <span
                dangerouslySetInnerHTML={{
                  __html: `&#8377 ${item.productPrice}`,
                }}
              />
            </div>
            <div className="discount">{item.discount}</div>
          </div>
          {item.isNew && <div className="new-stock">New</div>}
        </div>
      </div>
    ));
  };

  return (
    <div className="wardrobe-main-container">
      <div className="d-flex justify-content-center mb-3 position-relative wardrobe-header">
        <div className="section-header mb-0">Wardrobe Favorites</div>
        <Link
          to={`/collections/${collection.collection.handle}`}
          className="position-absolute bottom-0 end-0 view-all-btn"
        >
          VIEW ALL
        </Link>
      </div>
      <div className="fluid-container position-relative main-container">
        <div className="row" id="wardrobeItems">
          {renderWardrobeItems()}
        </div>
        <img
          src={leftIcon}
          className="mi-lg mi-chevron_left wh-34 d-inline-block position-absolute left-scroll"
          id="wardrobe-prev"
          onClick={handlePrev}
          alt="Previous"
        />
        <img
          src={rightIcon}
          className="mi-lg mi-chevron_right wh-34 d-inline-block position-absolute right-scroll"
          id="wardrobe-next"
          onClick={handleNext}
          alt="Next"
        />
      </div>
    </div>
  );
};

export default WardrobeFavorites;
