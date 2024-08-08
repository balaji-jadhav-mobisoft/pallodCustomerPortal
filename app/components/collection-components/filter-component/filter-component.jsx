import React, {useState, useEffect} from 'react';
import '../main-collection-component/main-collection-component.css';
import CloseIcon from '~/assets/Icon_Close.svg';
import {
  BLACK_COLOR,
  BLUE_COLOR,
  GOLD_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  IVORY_COLOR,
  MAROON_COLOR,
  ORANGE_COLOR,
  PEACH_COLOR,
  PINK_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from '~/components/common/common-constants';

const FilterComponent = ({productFilters, onFilterChange}) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showAllOptions, setShowAllOptions] = useState({});
  const [filterLabelMap, setFilterLabelMap] = useState({});
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [initialMinPrice, setInitialMinPrice] = useState();
  const [initialMaxPrice, setInitialMaxPrice] = useState();

  // Function to transform productFilters to filterSections format

  const transformFilters = (productFilters) => {
    const filterSections = {};

    productFilters.forEach((filter) => {
      let sectionId = '';
      let sectionLabel = filter.label;
      let sectionType = filter.type;
      // Check conditions to exclude specific labels
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
        } else if (filter.id.includes('filter.p.m.custom.party')) {
          sectionId = 'occasion';
        } else if (filter.id.includes('filter.p.m.custom.style')) {
          sectionId = 'style';
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
            black: BLACK_COLOR,
            purple: PURPLE_COLOR,
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

  const filterSections1 = transformFilters(productFilters);

  useEffect(() => {
    const debounceSendFiltersToBackend = setTimeout(() => {
      sendFiltersToBackend(selectedFilters);
    }, 500);

    return () => {
      clearTimeout(debounceSendFiltersToBackend);
    };
  }, [selectedFilters]);

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
      price: [{input: JSON.stringify({price: {min, max}}), label: 'Price'}],
    };
    setSelectedFilters(updatedFilters);
  };

  const addSelectedFilter = (section, filter, label) => {
    const updatedFilters = {
      ...selectedFilters,
      [section]: selectedFilters[section]
        ? [...selectedFilters[section], {input: filter, label}]
        : [{input: filter, label}],
    };
    setSelectedFilters(updatedFilters);

    const updatedFilterLabelMap = {
      ...filterLabelMap,
      [filter]: label,
    };
    setFilterLabelMap(updatedFilterLabelMap);
  };

  const removeSelectedFilter = (section, filter) => {
    setSelectedFilters((prev) => {
      const newFilters = prev[section].filter((f) => f.input !== filter);
      const updatedFilters = {...prev, [section]: newFilters};
      // Remove the section if it's empty
      if (newFilters.length === 0) {
        delete updatedFilters[section];
      }
      return updatedFilters;
    });

    setFilterLabelMap((prev) => {
      const updatedFilterLabelMap = {...prev};
      delete updatedFilterLabelMap[filter];
      return updatedFilterLabelMap;
    });
  };

  const handleCheckboxChange = (e, section, label) => {
    const filter = e.target.value || e.target.id;
    if (e.target.checked) {
      addSelectedFilter(section, filter, label);
    } else {
      removeSelectedFilter(section, filter);
    }
  };

  const handleRemoveSelectedFilter = (section, filter) => {
    removeSelectedFilter(section, filter);
  };

  const clearAllWebFilters = () => {
    setSelectedFilters({});
    setFilterLabelMap({});
    setMinPrice(0);
    setMaxPrice(0);
    // setMinPrice(initialMinPrice);
    // setMaxPrice(initialMaxPrice);
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
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
    // Check if the option label should be hidden
    if (['Best Seller', 'New', 'On Sale'].includes(option.label)) {
      return null;
    }
    return (
      <>
        {option.label === 'Price' ? (
          <div className="filters-container" key={option.id}>
            <div className="price-inputs">
              <div className="d-flex flex-column price-section">
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
              <div className="d-flex flex-column price-section">
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
            <div className="price-slider d-flex justify-content-center">
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
        ) : (
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
              value={option.input}
              id={option.id}
              data-section={section.id}
              checked={
                selectedFilters[section.id]?.some(
                  (filterObj) => filterObj.input === option.input,
                ) || false
              }
              onChange={(e) =>
                handleCheckboxChange(e, section.id, option.label)
              }
            />
            {section.id === 'color' && (
              <div
                className="ms-2 me-2 color-container"
                style={{backgroundColor: option.color}}
              ></div>
            )}
            <label className="form-check-label" htmlFor={option.id}>
              {option.label}
            </label>
          </div>
        )}
      </>
    );
  };

  const generateFilterOptionsHTML = (section, index) => (
    <div id={`${section.id}-container`} key={index}>
      {section.data
        ?.slice(0, showAllOptions[section.id] ? section.data.length : 5)
        .map((option) => generateOptionHTML(option, section))}
      {section.data.length > 5 && (
        <div
          className="view-more-filters-sec"
          id={`${section.id}-view-more`}
          onClick={() =>
            setShowAllOptions((prev) => ({
              ...prev,
              [section.id]: !prev[section.id],
            }))
          }
        >
          {showAllOptions[section.id] ? 'View Less' : 'View More'}
        </div>
      )}
    </div>
  );

  const sendFiltersToBackend = (filters) => {
    const inputsToSend = [];

    Object.keys(filters).forEach((section) => {
      filters[section].forEach((filterObj) => {
        if (typeof filterObj.input === 'string') {
          inputsToSend.push(JSON.parse(filterObj.input));
        } else {
          inputsToSend.push(filterObj.input);
        }
      });
    });

    onFilterChange(inputsToSend);
  };

  return (
    <div className="w-25 filters-section" style={{width: '25%'}}>
      <div className="d-flex justify-content-between align-items-center flex-row filter-header-container">
        <h4 className="filters-header mb-0">Filters</h4>
        {/* <div
          className="clear-filters"
          id="clearFilters"
          role="button"
          onClick={clearAllWebFilters}
        >
          CLEAR FILTERS
        </div> */}
      </div>

      {Object.keys(selectedFilters).length > 0 && (
        <div className="selected-filters">
          <div className="d-flex justify-content-between">
            <h4>SELECTED FILTERS</h4>
            <div
              className="clear-filters"
              id="clearFilters"
              role="button"
              onClick={clearAllWebFilters}
            >
              CLEAR ALL
            </div>
          </div>
          {Object.keys(selectedFilters).map((section) =>
            selectedFilters[section].map((filterObj) => (
              <div
                className="d-flex flex-row justify-content-between mb-1"
                key={filterObj.input}
              >
                <div className="selected-filter-text">
                  {filterLabelMap[filterObj.input]
                    ? filterLabelMap[filterObj.input]
                    : filterObj.label}
                </div>
                <img
                  src={CloseIcon}
                  height={18}
                  width={18}
                  className="mi-lg mi-close wh-18 d-inline-block cursor-pointer"
                  data-section={section}
                  data-filter={filterObj.input}
                  onClick={() =>
                    handleRemoveSelectedFilter(section, filterObj.input)
                  }
                ></img>
              </div>
            )),
          )}
        </div>
      )}

      <div className="filters-container">
        {filterSections1.map((section, index) => (
          <div className="filters-container" key={index}>
            <div
              className="d-flex flex-row justify-content-between"
              id={`${section.id}-header`}
            >
              <h4>{section.label}</h4>
              {(section.id === 'designers' || section.id === 'material') && (
                <button
                  className="btn p-0 text-truncate"
                  onClick={() =>
                    setShowAllOptions((prev) => ({
                      ...prev,
                      [section.id]: !prev[section.id],
                    }))
                  }
                >
                  {showAllOptions[section.id] ? 'View Less' : 'View More'}
                </button>
              )}
            </div>

            {generateFilterOptionsHTML(section, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
