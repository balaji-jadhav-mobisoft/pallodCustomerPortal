import React, {useState, useEffect} from 'react';
import './customer-stories.css';
import leftIcon from '~/assets/icon_left_chevron.svg';
import rightIcon from '~/assets/icon_right_chevron.svg';
import {Link} from '@remix-run/react';
import InstagramIcon from '~/assets/instagram-icon (1).svg';

const CustomerStories = ({collection, wardrobeItems}) => {
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

  // Render the wardrobe items to be displayed
  const renderWardrobeItems = () => {
    const itemsToDisplay = wardrobeItems.slice(
      currentStartIndex,
      currentStartIndex + itemsPerPage,
    );
    return itemsToDisplay.map((item) => (
      <div
        className="col-3 wardrobe-sec"
        key={item.src}
        style={{display: 'flex'}}
      >
        <div className="product-img-wrapper position-relative">
          {item.src && (
            <img src={item.src} alt={item.title} className="zoom-img" />
          )}
        </div>
        {/* <p
          className="product-description"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></p> */}
      </div>
    ));
  };

  return (
    <div className="wardrobe-carousal-container">
      <div className="d-flex justify-content-center mb-3 position-relative wardrobe-carousal-header">
        <div className="section-header mb-0">{collection.collection.title}</div>
        <Link
          to={`/collections/${collection?.collection?.handle}`}
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

export default CustomerStories;
