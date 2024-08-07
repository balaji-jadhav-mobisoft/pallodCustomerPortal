import React, {useState, useEffect} from 'react';
import './trending-look-carousal.css';
import leftIcon from '~/assets/icon_left_chevron.svg';
import rightIcon from '~/assets/icon_right_chevron.svg';
import wishListIcon from '~/assets/wishList-icon.svg';
import {Link} from '@remix-run/react';
import InstagramIcon from '~/assets/instagram-icon-1.svg';
import PlayIcon from '~/assets/Icon_Play.svg';
import {INSTAGRAM_LINK} from '../common-constants';

const TrendingLookCarousal = ({
  collection,
  trendingLookItems,
  wishList,
  trendingLooks,
}) => {
  // Return null if required props are not provided
  if (!collection || !trendingLookItems) return null;


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
  }, [currentStartIndex, itemsPerPage, trendingLookItems.length]);

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
        currentStartIndex + itemsPerPage >= trendingLookItems.length
          ? '0.5'
          : '1';
      nextButton.style.pointerEvents =
        currentStartIndex + itemsPerPage >= trendingLookItems.length
          ? 'none'
          : 'auto';
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (currentStartIndex + itemsPerPage < trendingLookItems.length) {
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
  const renderTrendingLookItems = () => {
    const itemsToDisplay = trendingLookItems.slice(
      currentStartIndex,
      currentStartIndex + itemsPerPage,
    );
    return itemsToDisplay.map((item, index) => {
      return (
        <div className={`col-3 wardrobe-sec`} key={item.src}>
          <Link
            to={item.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            key={item.src}
          >
            <div className={'position-relative product-img-wrapper'}>
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
            </div>
          </Link>
          {item.title && <h6 className="product-title">{item.title}</h6>}
          <p className="product-description">{item.description}</p>
          <img src={PlayIcon} alt="play-icon" className="play-button" />
        </div>
      );
    });
  };

  return (
    <>
      <div className="trending-look-carousal-container">
        <div
          className={`d-flex justify-content-center mb-3 position-relative trending-look-carousal-header`}
        >
          <div className="section-header mb-0">{collection}</div>
          <Link
            style={{textDecoration: 'none'}}
            to={INSTAGRAM_LINK}
            className="position-absolute bottom-0 end-0 view-all-btn"
          >
            <span>
              VISIT US{' '}
              <img
                style={{marginLeft: '5px'}}
                src={InstagramIcon}
                alt="instagram"
              />
            </span>
          </Link>
        </div>

        <div className={`fluid-container position-relative main-container`}>
          <div className="row" id="wardrobeItems">
            {renderTrendingLookItems()}
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
    </>
  );
};

export default TrendingLookCarousal;
