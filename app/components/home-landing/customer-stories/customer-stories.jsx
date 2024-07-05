import React, {useState, useEffect} from 'react';
import './customer-stories.css';
import LeftIcon from '~/assets/icon_left_chevron.svg';
import RightIcon from '~/assets/icon_right_chevron.svg';

const CustomerStories = ({collection, wardrobeItems}) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2); // default to 2 items per page
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indicates the component is mounted on the client
  }, []);

  useEffect(() => {
    // Update itemsPerPage based on window width
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 705;
      setItemsPerPage(isMobileView ? 1 : 2);
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set itemsPerPage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateButtons(); // Update navigation buttons whenever startIndex or itemsPerPage changes
  }, [currentStartIndex, itemsPerPage]);

  // Function to generate HTML for each customer story item
  const generateCustomerStoryHTML = (story, colClass, key) => (
    <div
      className={`${colClass} customer-stories-container bg-white d-flex flex-row`}
      key={key}
    >
      <div className="customer-img-wrapper">
        <img src={story.src} alt={story.alt} className="zoom-img" />
      </div>
      <p
        style={{display: 'contents'}}
        dangerouslySetInnerHTML={{__html: isClient ? story?.description : ''}}
      ></p>
    </div>
  );

  // Function to render customer stories based on currentStartIndex and itemsPerPage
  const renderCustomerStories = () => {
    const itemsToDisplay = wardrobeItems.slice(
      currentStartIndex,
      currentStartIndex + itemsPerPage,
    );
    const colClass = itemsPerPage === 1 ? 'col-12' : 'col-6'; // Column class based on itemsPerPage
    return itemsToDisplay.map((item, index) =>
      generateCustomerStoryHTML(
        item,
        colClass,
        `customer-story-${index}-${item.src}`,
      ),
    );
  };

  // Update navigation buttons based on currentStartIndex and itemsPerPage
  const updateButtons = () => {
    const nextButton = document.getElementById('customer-stories-next');
    const prevButton = document.getElementById('customer-stories-prev');

    if (nextButton && prevButton) {
      prevButton.style.opacity = currentStartIndex === 0 ? '0.5' : '1';
      nextButton.style.opacity =
        currentStartIndex + itemsPerPage >= wardrobeItems.length ? '0.5' : '1';

      prevButton.style.pointerEvents =
        currentStartIndex === 0 ? 'none' : 'auto';
      nextButton.style.pointerEvents =
        currentStartIndex + itemsPerPage >= wardrobeItems.length
          ? 'none'
          : 'auto';
    }
  };

  // Handle click event for next button
  const handleNextClick = () => {
    if (currentStartIndex + itemsPerPage < wardrobeItems.length) {
      setCurrentStartIndex(currentStartIndex + itemsPerPage);
    }
  };

  // Handle click event for previous button
  const handlePrevClick = () => {
    if (currentStartIndex > 0) {
      setCurrentStartIndex(currentStartIndex - itemsPerPage);
    }
  };

  return (
    <div className="customer-stories-main-container">
      <h3 className="section-header d-flex justify-content-center">
        {collection.collection.title}
      </h3>
      <div className="fluid-container position-relative customer-stories-section">
        <div className="row justify-content-between" id="customerStories">
          {renderCustomerStories()}
        </div>
        {/* Navigation buttons */}
        <img
          src={LeftIcon}
          height={35}
          width={35}
          className="mi-lg mi-chevron_left wh-34 d-inline-block position-absolute left-scroll"
          id="customer-stories-prev"
          onClick={handlePrevClick}
        />
        <img
          src={RightIcon}
          height={35}
          width={35}
          className="mi-lg mi-chevron_right wh-34 d-inline-block position-absolute right-scroll"
          id="customer-stories-next"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default CustomerStories;
