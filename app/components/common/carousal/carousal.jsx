import React, {useState} from 'react';
import './carousal.css';
import {Link, NavLink} from '@remix-run/react';
import LeftIcon from '~/assets/icon_left_chevron.svg';
import RightIcon from '~/assets/icon_right_chevron.svg';
const OccasionItem = ({item, colClass}) => (
  <div className={colClass + ' collection-img-container'}>
    <div className="img-wrapper occasion-img-wrapper">
      <img src={item.src} alt={item.alt} className="zoom-img" />
      <div className="img-caption d-flex flex-column">
        <div className="mb-2">{item.title}</div>
        {item.subTitle && <div className="fs-25 mb-2">{item.subTitle}</div>}
        <div className="d-flex justify-content-center">
          <Link to={item.url} style={{textDecoration: 'none'}}>
            <div className="shop-now-link">{item.linkText}</div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Carousal = ({
  leftIcon,
  rightIcon,
  url,
  title,
  occasionItems,
  itemsPerPage,
  dazzling,
}) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const renderOccasionItems = () => {
    return occasionItems
      ?.slice(currentStartIndex, currentStartIndex + itemsPerPage)
      ?.map((item, index) => (
        <OccasionItem key={index} item={item} colClass="col-4" />
      ));
  };

  const updateButtons = () => {
    const prevButtonDisabled = currentStartIndex === 0;
    const nextButtonDisabled =
      currentStartIndex + itemsPerPage >= occasionItems?.length;

    return {
      prevButtonDisabled,
      nextButtonDisabled,
    };
  };

  const handleNextClick = () => {
    if (currentStartIndex + itemsPerPage < occasionItems.length) {
      setCurrentStartIndex(currentStartIndex + itemsPerPage);
    }
  };

  const handlePrevClick = () => {
    if (currentStartIndex > 0) {
      setCurrentStartIndex(currentStartIndex - itemsPerPage);
    }
  };

  const {prevButtonDisabled, nextButtonDisabled} = updateButtons();

  return (
    <div className={'carousal-container'}>
      <div
        className={`d-flex mb-3 position-relative carousal-header  ${
          url ? 'url-with-title' : 'url-without-title'
        }`}
      >
        <div className={`section-header mb-0  ${dazzling ? 'mt-20' : ''}`}>
          {title}
        </div>
        {url && (
          <NavLink
            to={url}
            prefetch="intent"
            style={{textDecoration: 'none'}}
            className={`position-absolute bottom-0 end-0 view-all-btn carousal-view-all ${
              dazzling ? 'mt-20' : ''
            }`}
          >
            VIEW ALL
          </NavLink>
        )}
      </div>
      <div
        className={`fluid-container position-relative main-container ${
          dazzling ? 'dazzling-main' : ''
        }`}
      >
        <div className="row" id="occasionItems">
          {renderOccasionItems()}
        </div>

        {leftIcon && (
          <img
            src={LeftIcon}
            height={35}
            width={35}
            alt="prev"
            className={`mi-lg wh-34 d-inline-block position-absolute left-scroll ${
              prevButtonDisabled ? 'disabled' : ''
            }`}
            id="occasion-prev"
            onClick={handlePrevClick}
          />
        )}
        {rightIcon && (
          <img
            src={RightIcon}
            height={35}
            width={35}
            alt="next"
            className={`mi-lg wh-34 d-inline-block position-absolute right-scroll ${
              nextButtonDisabled ? 'disabled' : ''
            }`}
            id="occasion-next"
            onClick={handleNextClick}
          />
        )}
      </div>
    </div>
  );
};

export default Carousal;
