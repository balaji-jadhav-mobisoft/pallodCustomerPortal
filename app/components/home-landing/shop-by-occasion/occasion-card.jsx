import React, {useState} from 'react';
import './shop-by-occasion.css';
import LeftIcon from '~/assets/icon_left_chevron.svg';
import RightIcon from '~/assets/icon_right_chevron.svg';
const OccasionItem = ({item, colClass}) => (
  <div className={colClass + ' collection-img-container'}>
    <div className="img-wrapper occasion-img-wrapper">
      <img src={item.src} alt={item.alt} className="zoom-img" />
      <div className="img-caption d-flex flex-column">
        <div className="mb-2">{item.title}</div>
        <div className="d-flex justify-content-center">
          <div className="shop-now-link">{item.linkText}</div>
        </div>
      </div>
    </div>
  </div>
);

const OccasionCard = ({occasionItems, itemsPerPage}) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const renderOccasionItems = () => {
    return occasionItems
      .slice(currentStartIndex, currentStartIndex + itemsPerPage)
      .map((item, index) => (
        <OccasionItem key={index} item={item} colClass="col-4" />
      ));
  };

  const updateButtons = () => {
    const prevButtonDisabled = currentStartIndex === 0;
    const nextButtonDisabled =
      currentStartIndex + itemsPerPage >= occasionItems.length;

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
    <div className="fluid-container position-relative shop-by-occasion main-container">
      <div className="row" id="occasionItems">
        {renderOccasionItems()}
      </div>

      <img
        src={LeftIcon}
        className={`mi-lg wh-34 d-inline-block position-absolute left-scroll ${
          prevButtonDisabled ? 'disabled' : ''
        }`}
        id="occasion-prev"
        onClick={handlePrevClick}
      />
      <img
        src={RightIcon}
        className={`mi-lg wh-34 d-inline-block position-absolute right-scroll ${
          nextButtonDisabled ? 'disabled' : ''
        }`}
        id="occasion-next"
        onClick={handleNextClick}
      />
    </div>
  );
};

export default OccasionCard;
