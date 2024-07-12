import React, {useEffect, useState} from 'react';
import BackArrowIcon from '~/assets/Icon_Back_Arrow.svg';
import '../main-collection-component/main-collection-component.css';
import {
  BLUE_COLOR,
  GOLD_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  IVORY_COLOR,
  MAROON_COLOR,
  ORANGE_COLOR,
  PEACH_COLOR,
  PINK_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from '~/components/common/common-constants';

const FilterComponentOffcanvas = ({productFilters, onFilterChange}) => {
  // Function to update selected filters
  const updateSelectedFilters = (sectionId, id, checked) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = {...prevFilters};
      if (!updatedFilters[sectionId]) {
        updatedFilters[sectionId] = [];
      }
      if (checked && !updatedFilters[sectionId].includes(id)) {
        updatedFilters[sectionId].push(id);
      } else if (!checked) {
        updatedFilters[sectionId] = updatedFilters[sectionId].filter(
          (item) => item !== id,
        );
      }
      return updatedFilters;
    });

    // Call updateFilterCount to update filterCounts state
    updateFilterCount(sectionId);
  };

  const transformFilters = (productFilters) => {
    const filterSections = {};

    productFilters.forEach((filter) => {
      let sectionId = '';
      let sectionLabel = filter.label;
      let sectionType = filter.type;

      if (
        filter.type === 'PRICE_RANGE' &&
        filter.id.includes('filter.v.price')
      ) {
        sectionId = 'price';
      } else if (filter.type === 'LIST') {
        if (filter.id.includes('filter.p.tag')) {
          sectionId = 'categories';
        } else if (filter.id.includes('filter.v.option.color')) {
          sectionId = 'color';
        } else if (filter.id.includes('filter.v.option.size')) {
          sectionId = 'size';
        } else if (filter.id.includes('filter.v.option.fabric')) {
          sectionId = 'fabric';
        } else if (filter.id.includes('filter.v.option.occasion')) {
          sectionId = 'occasion';
        } else if (filter.id.includes('filter.v.option.print & patterns')) {
          sectionId = 'print-patterns';
        } else if (filter.id.includes('filter.v.availability')) {
          sectionId = 'availability';
        } else if (filter.id.includes('filter.p.vendor')) {
          sectionId = 'brand';
        }
      }

      if (sectionId) {
        if (!filterSections[sectionId]) {
          filterSections[sectionId] = {
            id: sectionId,
            label: sectionLabel,
            type: sectionType,
            data: [],
          };
        }

        filter.values.forEach((value) => {
          // console.log(value, 'vall');
          const colorMap = {
            yellow: YELLOW_COLOR,
            red: RED_COLOR,
            blue: BLUE_COLOR,
            ivory: IVORY_COLOR,
            pink: PINK_COLOR,
            peach: PEACH_COLOR,
            orange: ORANGE_COLOR,
            green: GREEN_COLOR,
            maroon: MAROON_COLOR,
            gold: GOLD_COLOR,
            gray: GRAY_COLOR,
          };

          filterSections[sectionId].data.push({
            id: value.id,
            label: value.label,
            input: value.input,
            ...(sectionId === 'color' && {
              color: colorMap[value.label.toLowerCase()] || value.color,
            }),
          });
        });
      }
    });

    return Object.values(filterSections);
  };

  const filterProductSection = transformFilters(productFilters);
  const [activeSection, setActiveSection] = useState(
    filterProductSection[0]?.id,
  );
  const [filterCounts, setFilterCounts] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({}); // State to hold selected filters
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [initialMinPrice, setInitialMinPrice] = useState();
  const [initialMaxPrice, setInitialMaxPrice] = useState();

  const onMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(Number(value));
    updatePriceFilters(Number(value), maxPrice);
  };

  const onMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(Number(value));
    updatePriceFilters(minPrice, Number(value));
  };

  const updatePriceFilters = (min, max) => {
    const updatedFilters = {
      ...selectedFilters,
      price: [
        {
          input: JSON.stringify({price: {min, max}}),
          label: 'Price',
          id: 'filter.v.price',
        },
      ],
    };
    setSelectedFilters(updatedFilters);
  };

  // Function to update the count of selected filters for a given section
  const updateFilterCount = (sectionId) => {
    const selectedFiltersCount = selectedFilters[sectionId]
      ? selectedFilters[sectionId].length
      : 0;
    setFilterCounts((prevCounts) => ({
      ...prevCounts,
      [sectionId]: selectedFiltersCount,
    }));
  };

  // Clear all selected filters
  const clearFilters = () => {
    setSelectedFilters({});
    setFilterCounts({});
    onFilterChange([]);
  };

  const handleApplyFilters = () => {
    // Array to store selected filters in the desired format
    const selectedFiltersArray = [];
    console.log(selectedFilters, 'sssssssssssss');
    // Loop through selectedFilters and filterProductSection to convert to desired format
    Object.keys(selectedFilters).forEach((sectionId) => {
      const section = filterProductSection.find((sec) => sec.id === sectionId);
      if (section) {
        if (section.label === 'Price') {
          // Handle other sections as variantOptions
          selectedFilters[sectionId].forEach((filterId) => {
            const filter = section.data.find(
              (option) => option.id === filterId.id,
            );
            if (filter) {
              selectedFiltersArray.push(JSON.parse(filterId.input)); // Parse filter.input as JSON
            }
          });
        } else if (section.label === 'Categories') {
          // Handle Categories section as tags
          selectedFilters[sectionId].forEach((filterId) => {
            const filter = section.data.find(
              (option) => option.id === filterId,
            );
            if (filter) {
              selectedFiltersArray.push(JSON.parse(filter.input)); // Parse filter.input as JSON
            }
          });
        } else {
          // Handle other sections as variantOptions
          selectedFilters[sectionId].forEach((filterId) => {
            const filter = section.data.find(
              (option) => option.id === filterId,
            );

            if (filter) {
              selectedFiltersArray.push(JSON.parse(filter.input)); // Parse filter.input as JSON
            }
          });
        }
      }
    });

    // Here you can send selectedFiltersArray to your backend API or further process
    console.log('Selected Filters Array:', selectedFiltersArray);
    if (onFilterChange) {
      onFilterChange(selectedFiltersArray);
    }
  };

  // Update minPrice and maxPrice dynamically based on productFilters
  useEffect(() => {
    const priceFilter = productFilters.find(
      (filter) =>
        filter.type === 'PRICE_RANGE' && filter.id.includes('filter.v.price'),
    );

    if (priceFilter) {
      const prices = priceFilter.values.map((value) => JSON.parse(value.input));
      const min = Math.min(...prices.map((price) => price.price.min));
      const max = Math.max(...prices.map((price) => price.price.max));
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [productFilters]);

  // Update minPrice and maxPrice only initially based on productFilters
  useEffect(() => {
    const priceFilter = productFilters.find(
      (filter) =>
        filter.type === 'PRICE_RANGE' && filter.id.includes('filter.v.price'),
    );

    if (priceFilter) {
      const prices = priceFilter.values.map((value) => JSON.parse(value.input));
      const min = Math.min(...prices.map((price) => price.price.min));
      const max = Math.max(...prices.map((price) => price.price.max));
      setInitialMinPrice(min);
      setInitialMaxPrice(max);
    }
  }, [maxPrice]);

  const generateOptionHTML = (option, section) => {
    if (['Best Seller', 'New', 'On Sale'].includes(option.label)) {
      return null;
    }
    return (
      <div
        className={`form-check${
          section.id === 'color' ? ' d-flex align-items-center' : ''
        }`}
        key={option.id}
      >
        <input
          className={`form-check-input${
            section.id === 'color' ? ' me-1 color-input' : ''
          }`}
          type={section.isRadio ? 'radio' : 'checkbox'}
          value={option.id} // Use option.id instead of option.label
          id={`${option.id}-${option.label}`}
          data-section={section.id}
          checked={
            selectedFilters[section.id] &&
            selectedFilters[section.id].includes(option.id)
          }
          onChange={
            (e) =>
              updateSelectedFilters(section.id, option.id, e.target.checked) // Use option.id
          }
        />
        {section.id === 'color' && (
          <div
            className="ms-2 me-2 color-container"
            style={{backgroundColor: option.color}}
          ></div>
        )}
        <label
          className="form-check-label"
          htmlFor={`${option.id}-${option.label}`}
        >
          {option.label}
        </label>
      </div>
    );
  };

  // Render filter options for the selected section
  const renderFilterOptions = (sectionId) => {
    const section = filterProductSection.find((sec) => sec.id === sectionId);

    if (sectionId === 'price') {
      return (
        <div>
          <div className="price-inputs d-flex flex-column">
            <div className="d-flex flex-column price-section mb-3">
              <label htmlFor="min-price">Min</label>
              <input
                type="number"
                id="min-price"
                value={minPrice}
                onChange={onMinPriceChange}
                placeholder="Min Price"
                min={initialMinPrice}
                max={initialMaxPrice}
              />
            </div>
            <div className="d-flex flex-column price-section mb-3">
              <label htmlFor="max-price">Max</label>
              <input
                type="number"
                id="max-price"
                value={maxPrice}
                onChange={onMaxPriceChange}
                placeholder="Max Price"
                min={initialMinPrice}
                max={initialMaxPrice}
              />
            </div>
          </div>
          <div className="price-slider">
            <input
              type="range"
              id="min-slider"
              min={initialMinPrice}
              max={initialMaxPrice}
              value={minPrice}
              step="10"
              onChange={(e) => onMinPriceChange(e)}
            />
            <input
              type="range"
              id="max-slider"
              min={initialMinPrice}
              max={initialMaxPrice}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e)}
              step="10"
            />
          </div>
          <div className="slider-labels d-flex justify-content-between">
            <span>₹ {initialMinPrice}</span>
            <span>₹ {initialMaxPrice}</span>
          </div>
        </div>
      );
    } else if (section && section.data) {
      return section.data.map((option) => generateOptionHTML(option, section));
    }
    return null;
  };

  useEffect(() => {
    const counts = {};
    filterProductSection.forEach((section) => {
      const selectedFiltersCount = selectedFilters[section.id]
        ? selectedFilters[section.id].length
        : 0;
      counts[section.id] = selectedFiltersCount;
    });
    setFilterCounts(counts);
  }, [selectedFilters]);

  return (
    <div
      className="offcanvas offcanvas-bottom"
      tabIndex="-1"
      id="offcanvasFilters"
      aria-labelledby="offcanvasFilterLabel"
    >
      <div
        className="d-none prev-route"
        role="button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <img
          src={BackArrowIcon}
          style={{marginRight: '0.5rem'}}
          height={18}
          width={18}
          className="me-2 wh-18 d-inline-block"
        />
        Filters
      </div>
      <div className="d-flex justify-content-between flex-column filters-section-responsive">
        <div className="d-flex flex-row filters-layout">
          <div className="filter-headers" id="filterHeaders">
            {filterProductSection.map((section) => (
              <div
                key={section.id}
                className={`filter-header${
                  activeSection === section.id ? ' active' : ''
                }`}
                data-section={section.id}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
                {filterCounts[section.id] > 0 && (
                  <span className="filter-count">
                    {' '}
                    {filterCounts[section.id]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="filter-data filters-container" id="filterData">
            {renderFilterOptions(activeSection)}
          </div>
        </div>
        <div className="d-flex flex-row buttons-layout">
          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
          <button
            data-bs-dismiss="offcanvas"
            className="apply-btn"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponentOffcanvas;
