import React, {useState, useEffect} from 'react';
import './wardrobe-favorites.css'; // Ensure you have the necessary styles
import wardrobe1 from '~/assets/Wardrobe_1.webp';
import wardrobe2 from '~/assets/Wardrobe_2.webp';
import wardrobe3 from '~/assets/Wardrobe_3.webp';
import wardrobe4 from '~/assets/Wardrobe_4.webp';
import wardrobe11 from '~/assets/Wardrobe_11.webp';
import wardrobe22 from '~/assets/Wardrobe_22.webp';
import wardrobe33 from '~/assets/Wardrobe_33.webp';
import wardrobe44 from '~/assets/Wardrobe_44.webp';
import leftIcon from '~/assets/icon_left_chevron.svg';
import rightIcon from '~/assets/icon_right_chevron.svg';
import wishListIcon from '~/assets/wishList-icon.svg';

const wardrobeItems = [
  {
    src: wardrobe1,
    hoverSrc: wardrobe11,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '&#8377;27200',
    productPrice: '&#8377;30500',
    discount: '15%OFF',
    isBestSeller: true,
    isNew: false,
  },
  {
    src: wardrobe2,
    hoverSrc: wardrobe22,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '&#8377;27200',
    productPrice: '&#8377;30500',
    discount: '15%OFF',
    isBestSeller: false,
    isNew: true,
  },
  {
    src: wardrobe3,
    hoverSrc: wardrobe33,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '&#8377;27200',
    productPrice: '&#8377;30500',
    discount: '15%OFF',
    isBestSeller: true,
    isNew: false,
  },
  {
    src: wardrobe4,
    hoverSrc: wardrobe44,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '&#8377;27200',
    productPrice: '&#8377;30500',
    discount: '15%OFF',
    isBestSeller: false,
    isNew: true,
  },
  {
    src: wardrobe1,
    hoverSrc: wardrobe1,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '&#8377;27200',
    productPrice: '&#8377;30500',
    discount: '15%OFF',
    isBestSeller: false,
    isNew: true,
  },
  {
    src: wardrobe3,
    hoverSrc: wardrobe3,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '&#8377;27200',
    productPrice: '&#8377;30500',
    discount: '15%OFF',
    isBestSeller: true,
    isNew: false,
  },
];

const WardrobeFavorites = () => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        adjustItemsPerPage();
        updateButtons();
      };

      window.addEventListener('resize', handleResize);
      adjustItemsPerPage();
      updateButtons();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [currentStartIndex, itemsPerPage]);

  const adjustItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 1024 && window.innerWidth > 705) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    }
  };

  const generateWardrobeItemHTML = (item, colClass) => (
    <div className={`${colClass} wardrobe-sec`} key={item.src}>
      <div className="product-img-wrapper position-relative">
        <img
          src={item.src}
          data-hover-src={item.hoverSrc}
          alt={item.title}
          id="wardrobe-img"
          className="zoom-img"
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
          ></img>
        </div>
      </div>
      <h6 className="product-title">{item.title}</h6>
      <p className="product-description">{item.description}</p>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="discount-price me-1">
            <span dangerouslySetInnerHTML={{__html: item.discountPrice}} />
          </div>
          <div className="product-price me-1">
            <span dangerouslySetInnerHTML={{__html: item.productPrice}} />
          </div>
          <div className="discount">{item.discount}</div>
        </div>
        {item.isNew && <div className="new-stock">New</div>}
      </div>
    </div>
  );

  const renderWardrobeItems = () => {
    const itemsToDisplay = wardrobeItems.slice(
      currentStartIndex,
      currentStartIndex + itemsPerPage,
    );

    const colClass = 'col-3';
    return itemsToDisplay.map((item) =>
      generateWardrobeItemHTML(item, colClass),
    );
  };

  const updateButtons = () => {
    if (typeof window !== 'undefined') {
      const prevButton = document.getElementById('wardrobe-prev');
      const nextButton = document.getElementById('wardrobe-next');

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

  const handleNext = () => {
    if (currentStartIndex + itemsPerPage < wardrobeItems.length) {
      setCurrentStartIndex(currentStartIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentStartIndex > 0) {
      setCurrentStartIndex(currentStartIndex - itemsPerPage);
    }
  };

  return (
    <div className="wardrobe-main-container">
      <div className="d-flex justify-content-center mb-3 position-relative wardrobe-header">
        <div className="section-header mb-0">Wardrobe Favorites</div>
        <div className="position-absolute bottom-0 end-0 view-all-btn">
          VIEW ALL
        </div>
      </div>
      <div className="fluid-container position-relative main-container">
        <div className="row" id="wardrobeItems">
          {typeof window !== 'undefined' && renderWardrobeItems()}
        </div>
        <img
          src={leftIcon}
          className="mi-lg mi-chevron_left wh-34 d-inline-block position-absolute left-scroll"
          id="wardrobe-prev"
          onClick={handlePrev}
        ></img>
        <img
          src={rightIcon}
          className="mi-lg mi-chevron_right wh-34 d-inline-block position-absolute right-scroll"
          id="wardrobe-next"
          onClick={handleNext}
        ></img>
      </div>
    </div>
  );
};

export default WardrobeFavorites;
