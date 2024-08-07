import React, {useEffect, useRef, useState} from 'react';
import './main-collection-component.css';
import SortByIcon from '~/assets/Icon_Sort.svg';
import SaleIcon from '~/assets/Icon_Sale.svg';
import NewIcon from '~/assets/Icon_New.svg';
import FilterIcon from '~/assets/Icon_Filter.svg';
import CollectionProductList from '../collection-products/collection-product';
import FilterComponentOffcanvas from '../filter-component-offcanvas/filter-component-offcanvas';
import FilterComponent from '../filter-component/filter-component';
import {useLocation} from '@remix-run/react';
import Breadcrumb from '~/components/common/breadcrumb/breadcrumb';

const MainCollectionComponent = ({
  collection,
  onSortChange,
  isOpen,
  setIsOpen,
  onFilterChange,
}) => {
  const [currentCollection, setCurrentCollection] = useState(collection);

  // Update state when prop changes
  useEffect(() => {
    setCurrentCollection(collection);
  }, [collection]);

  if (!currentCollection) return null;

  const breadcrumbItems = [
    {name: 'Home', href: '/'},
    {name: currentCollection.handle, href: `/Home/${currentCollection.handle}`},
  ];

  const collectionMetaFieldBanner =
    currentCollection?.metafield?.reference?.image?.url || '';

  const productFilters = currentCollection?.products?.filters;

  const collectionTitle = currentCollection.title.includes('Explore')
    ? currentCollection.title
    : `Explore ${currentCollection.title}`;

  const dropdownItems = [
    {label: 'Price - High to Low', value: 'High to Low'},
    {label: 'Best Seller', value: 'Best Seller'},
    {label: 'Price - Low to High', value: 'Low to High'},
  ];

  const buttonLabels = [
    'Designer Sarees Online',
    'Organza Saree India',
    'Silk Saree',
    'Banarasi Saree',
    'Black Saree',
    'Wedding Saree',
    'Readymade Saree',
    'Bandhani Saree',
    'Red Saree',
    'Patola Saree',
    'Satin Saree',
  ];

  const location = useLocation();

  // Parse search parameters
  const searchParams = new URLSearchParams(location.search);

  // Get the value of 'sort' parameter
  const sortValue = searchParams.get('sort');

  // Initialize selectedItem based on sortValue
  const initialSelectedItem =
    dropdownItems.find((item) => item.value === sortValue) || null;
  const [selectedItem, setSelectedItem] = useState(
    initialSelectedItem ? initialSelectedItem.label : null,
  );

  const handleClick = (item) => {
    setSelectedItem(item.label);
    handleSortByForWeb(item.value);
  };

  const handleClickMobileDropdown = (item) => {
    setSelectedItem(item.label);
    handleSortBy(item.value);

    // Close the offcanvas modal
    const offcanvasElement = document.getElementById('offcanvasBottom');
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.hide();
  };
  const handleFilterBy = (tags) => {
    if (onFilterChange) {
      onFilterChange(tags);
    }
  };
  const handleSortBy = (tags) => {
    if (onSortChange) {
      onSortChange(tags);
    }
  };
  const handleSortByForWeb = (tags) => {
    if (onSortChange) {
      onSortChange(tags);
    }
  };

  // Toggle button section
  const onSaleButtonRef = useRef(null);
  const newButtonRef = useRef(null);
  const responsiveOnSaleButtonRef = useRef(null);
  const responsiveNewButtonRef = useRef(null);
  const [activeTags, setActiveTags] = useState([]);

  const toggleButtonStyle = (button, item) => {
    const computedStyle = getComputedStyle(button);
    const isWhite = computedStyle.backgroundColor === 'rgb(255, 255, 255)';

    if (isWhite) {
      button.style.background = '#303030';
      button.style.color = 'white';
      button.style.border = 'none';
      setActiveTags((prevTags) => [...prevTags, ...item.tags]);
    } else {
      button.style.background = 'white';
      button.style.color = '#303030';
      button.style.border = 'solid 1px #e0e0e0';
      setActiveTags((prevTags) =>
        prevTags.filter(
          (tag) => !item.tags.some((itemTag) => itemTag.tag === tag.tag),
        ),
      );
    }
  };

  useEffect(() => {
    const onSaleButton = onSaleButtonRef.current;
    const newButton = newButtonRef.current;
    const responsiveOnSaleButton = responsiveOnSaleButtonRef.current;
    const responsiveNewButton = responsiveNewButtonRef.current;

    const onSaleButtonClick = () =>
      toggleButtonStyle(onSaleButton, {
        label: 'On Sale',
        tags: [{tag: 'On Sale'}],
      });
    const newButtonClick = () =>
      toggleButtonStyle(newButton, {label: 'New', tags: [{tag: 'New'}]});

    const responsiveOnSaleButtonClick = () =>
      toggleButtonStyle(responsiveOnSaleButton, {
        label: 'On Sale',
        tags: [{tag: 'On Sale'}],
      });
    const responsiveNewButtonClick = () =>
      toggleButtonStyle(responsiveNewButton, {
        label: 'New',
        tags: [{tag: 'New'}],
      });

    onSaleButton.addEventListener('click', onSaleButtonClick);
    newButton.addEventListener('click', newButtonClick);
    responsiveOnSaleButton.addEventListener(
      'click',
      responsiveOnSaleButtonClick,
    );
    responsiveNewButton.addEventListener('click', responsiveNewButtonClick);

    return () => {
      onSaleButton.removeEventListener('click', onSaleButtonClick);
      newButton.removeEventListener('click', newButtonClick);
      responsiveOnSaleButton.removeEventListener(
        'click',
        responsiveOnSaleButtonClick,
      );
      responsiveNewButton.removeEventListener(
        'click',
        responsiveNewButtonClick,
      );
    };
  }, [currentCollection]);

  useEffect(() => {
    handleFilterBy(activeTags);
  }, [activeTags]);

  return (
    <div
      className="d-flex flex-column overflow-hidden"
      key={currentCollection?.id}
    >
      {/* responsive filter section */}
      <hr className="m-0 filter-ruler d-none" />
      <div className="wardrobe-header responsive-filter-section d-none">
        <div>
          <button
            id="sortByButton"
            onClick={() => setIsOpen(true)} // Open the offcanvas
          >
            <img
              src={SortByIcon}
              className="mi-lg align-text-bottom bg-gold mi-sort me-2 wh-18 d-inline-block"
            ></img>
            Sort By
          </button>
          <button id="onSaleBtn" ref={responsiveOnSaleButtonRef}>
            <img
              src={SaleIcon}
              className="mi-lg align-text-bottom bg-gold mi-sale me-2 wh-18 d-inline-block"
            ></img>
            On Sale
          </button>
          <button id="newBtn" ref={responsiveNewButtonRef}>
            <img
              src={NewIcon}
              className="mi-lg align-text-bottom bg-gold mi-new me-2 wh-18 d-inline-block"
            ></img>
            New
          </button>
        </div>
        <img
          src={FilterIcon}
          height={30}
          width={30}
          className="mi-lg bg-gold mi-filter wh-30 d-inline-block"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasFilters"
          aria-controls="offcanvasFilters"
        ></img>
      </div>
      <Breadcrumb items={breadcrumbItems} />
      {/* discount image */}
      {/* <div className="main-container discount-img-wrapper"> */}
      {/* <img
          src={collectionMetaFieldBanner}
          alt="Pallod Discount"
          className="discount-banner"
        /> */}
      {/* <div className="discount-text">
          <div>Get Flat 10% Off on all product.</div>
          <div>Use Code PALLOD10</div>
        </div> */}
      {/* </div> */}

      {/* sortby offcanvas */}
      <div
        className={`offcanvas offcanvas-bottom ${isOpen ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">
            SORT BY
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            aria-label="Close"
            onClick={() => setIsOpen(false)} // Close the offcanvas
          ></button>
        </div>
        <div className="offcanvas-body">
          {dropdownItems.map((item, index) => (
            <div
              key={index}
              className={`offcanvas-item ${
                selectedItem === item.label ? 'offcanvas-selected-item' : ''
              }`}
              role="button"
              onClick={() => handleClickMobileDropdown(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* filters offcanvas */}
      <FilterComponentOffcanvas
        productFilters={productFilters}
        onFilterChange={onFilterChange}
      />

      {/* filters and product list */}
      <div className="d-flex flex-row main-container mb-0">
        {/* filters section */}
        <FilterComponent
          productFilters={productFilters}
          onFilterChange={onFilterChange}
        />

        {/* sarees product listing */}
        <div className="w-75 sarees-section">
          <h4>{collectionTitle}</h4>
          <div className="sarees-description">
            {currentCollection.description}
          </div>
          {/* sortByDropdown */}
          <div className="d-flex flex-row align-items-center sort-by-section justify-content-end">
            <h5 className="mb-0">Sort By:</h5>
            <div className="dropdown ms-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="sortByDropdown"
                data-bs-toggle="dropdown" // Bootstrap attribute for dropdown toggle
                aria-expanded="false"
              >
                {selectedItem ? selectedItem : 'Sort the products'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortByDropdown">
                {dropdownItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`dropdown-item ${
                        selectedItem === item.label
                          ? 'selected-dropdown-item'
                          : ''
                      }`}
                      onClick={() => handleClick(item)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              style={{display: 'none'}}
              id="onSaleBtn"
              className="on-sale-toggle"
              ref={onSaleButtonRef}
            >
              <img
                src={SaleIcon}
                className="mi-lg align-text-bottom bg-gold mi-sale me-2 wh-18 d-inline-block"
              ></img>
              On Sale
            </button>
            <button
              style={{display: 'none'}}
              id="newBtn"
              className="on-sale-toggle"
              ref={newButtonRef}
            >
              <img
                src={NewIcon}
                className="mi-lg align-text-bottom bg-gold mi-new me-2 wh-18 d-inline-block"
              ></img>
              New
            </button>
          </div>
          {/* product-listing */}
          <div className="row" id="productList">
            <CollectionProductList collection={currentCollection} />
          </div>

          <hr />
          <div className="popular-search-container">
            <h3>Popular Search</h3>
            <div id="popularSearchButtons">
              {buttonLabels.map((label, index) => (
                <button key={index}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCollectionComponent;
