import React, {Suspense, useEffect, useRef, useState} from 'react';
import BannerImage from '~/assets/Discount_PLP.webp';
import './product-details.css';
import WardrobeImage1 from '~/assets/wardrobe/Wardrobe_1.webp';
import WardrobeImage2 from '~/assets/wardrobe/Wardrobe_2.webp';
import WardrobeImage3 from '~/assets/wardrobe/Wardrobe_3.webp';
import WardrobeImage4 from '~/assets/wardrobe/Wardrobe_4.webp';
import WardrobeImage11 from '~/assets/wardrobe/Wardrobe_11.webp';
import WardrobeImage22 from '~/assets/wardrobe/Wardrobe_22.webp';
import WardrobeImage33 from '~/assets/wardrobe/Wardrobe_33.webp';
import WardrobeImage44 from '~/assets/wardrobe/Wardrobe_44.webp';
import ProductDetailImage1 from '~/assets/product-details/Product_Detail_1.webp';
import ProductDetailImage2 from '~/assets/product-details/Product_Detail_2.webp';
import ProductDetailImage3 from '~/assets/product-details/Product_Detail_3.webp';
import PlusIcon from '~/assets/product-details/Icon_Plus.svg';
import MinusIcon from '~/assets/product-details/Icon_Minus.svg';
import WishlistIcon from '~/assets/wishlist-icon (1).svg';
import WishlistSelectedRedIcon from '~/assets/wishlist_selected_red_icon.svg';
import CheckoutIcon from '~/assets/BagIcon.svg';
import LeftArrow from '~/assets/icon_left_chevron.svg';
import RightArrow from '~/assets/icon_right_chevron.svg';
import WardrobeCarousal from '../common/wardrobe-carousal/wardrobe-carousal';
import RightArrowIcon from '~/assets/Icon_Right_Arrow.svg';
import MessageIcon from '~/assets/message-icon.svg';
import SizeGuideIcon from '~/assets/Icon_Size_Guide.svg';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import FAQ from './faq/faq';
import ShippingAndReturn from './shipping-and-returns/shipping-and-return';
import ProductDetailsSection from './product-details-section/product-details-section';
import {Await, Link, useNavigate} from '@remix-run/react';
import {
  Analytics,
  CartForm,
  Money,
  useAnalytics,
  VariantSelector,
} from '@shopify/hydrogen';
import {useAside} from '../Aside';

const wardrobeItems = [
  {
    src: WardrobeImage1,
    hoverSrc: WardrobeImage11,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '₹27200',
    productPrice: '₹30500',
    discount: '15%OFF',
    isBestSeller: true,
    isNew: false,
  },
  {
    src: WardrobeImage2,
    hoverSrc: WardrobeImage22,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '₹27200',
    productPrice: '₹30500',
    discount: '15%OFF',
    isBestSeller: false,
    isNew: true,
  },
  {
    src: WardrobeImage3,
    hoverSrc: WardrobeImage33,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '₹27200',
    productPrice: '₹30500',
    discount: '15%OFF',
    isBestSeller: true,
    isNew: false,
  },
  {
    src: WardrobeImage4,
    hoverSrc: WardrobeImage44,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '₹27200',
    productPrice: '₹30500',
    discount: '15%OFF',
    isBestSeller: false,
    isNew: true,
  },
  {
    src: WardrobeImage4,
    hoverSrc: WardrobeImage44,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '₹27200',
    productPrice: '₹30500',
    discount: '15%OFF',
    isBestSeller: false,
    isNew: true,
  },
  {
    src: WardrobeImage3,
    hoverSrc: WardrobeImage33,
    title: 'Pallod',
    description: 'Ivory Georgette Hand Embroidered',
    discountPrice: '₹27200',
    productPrice: '₹30500',
    discount: '15%OFF',
    isBestSeller: true,
    isNew: false,
  },
];

function getImagesByColor(product) {
  const colorOptions = product?.options?.find(
    (option) => option.name === 'Color',
  ).values;
  const images = product.images.nodes;

  const filteredImages = images.filter((image) =>
    colorOptions.includes(image.altText),
  );

  const result = {};
  colorOptions.forEach((color) => {
    result[color] = filteredImages.find((image) => image.altText === color);
  });

  return result;
}

function ProductOptions({option, product}) {
  const imagesByColor = getImagesByColor(product);
  return (
    <div key={option.name}>
      {option.name === 'Color' && (
        <>
          <h5 className="product-detail-headers">Colors</h5>
          <div className="colors-option d-flex flex-row">
            {option.values.map((valueObj) => (
              <Link
                className="product-options-item"
                key={valueObj.value}
                prefetch="intent"
                preventScrollReset
                replace
                to={valueObj.to}
                style={{
                  opacity: valueObj.isAvailable ? 1 : 0.3,
                }}
              >
                <div className="d-flex flex-row color-option-img">
                  <img
                    src={imagesByColor[valueObj.value]?.url}
                    alt={valueObj.value}
                    style={{
                      opacity: valueObj.isAvailable ? 1 : 0.3,
                      border: valueObj.isActive ? '1px solid #000' : 'none',
                      width: '100px',
                      height: 'auto',
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      {option.name === 'Size' && (
        <>
          <div className="size-header d-flex flex-row justify-content-between">
            <h5 className="product-detail-headers">Size</h5>
            {product?.metafield?.reference?.image?.url && (
              <Link
                target="_blank"
                to={product?.metafield?.reference?.image?.url}
              >
                <h5 className="size-guide d-flex align-items-center">
                  Size Guide
                  <img
                    src={SizeGuideIcon}
                    className="mi-lg mi-size_guide wh-18 d-inline-block"
                  ></img>
                </h5>
              </Link>
            )}
          </div>
          <div className="size-validation">
            Select preferred size before proceeding to add item in bag
          </div>
          <div className="product-options-grid">
            {option.values.map(({value, isAvailable, isActive, to}) => {
              return (
                <Link
                  className="product-options-item"
                  key={option.name + value}
                  prefetch="intent"
                  preventScrollReset
                  replace
                  to={to}
                  style={{
                    opacity: isAvailable ? 1 : 0.3,
                  }}
                >
                  <div className="d-flex flex-row size-btns-container">
                    <button
                      style={{
                        backgroundColor: isActive ? '#000' : '#fff',
                        color: isActive ? '#fff' : '#000',
                        opacity: isAvailable ? 1 : 0.3,
                      }}
                      type="button"
                      className="btn size-btn position-relative"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      data-bs-placement="top"
                      // title="US 0<br><strong>Bust:</strong> 36<br><strong>Waist:</strong> 89<br><strong>Hip:</strong> 90"
                    >
                      {value}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
function ProductMain({
  selectedVariant,
  product,
  variants,
  setProductOutOfStock,
  isRemoved,
  handleButtonClick,
}) {
  const {title, descriptionHtml} = product;
  return (
    <>
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
            setProductOutOfStock={setProductOutOfStock}
            handleButtonClick={handleButtonClick}
            isRemoved={isRemoved}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data?.product?.variants.nodes || []}
              setProductOutOfStock={setProductOutOfStock}
              handleButtonClick={handleButtonClick}
              isRemoved={isRemoved}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}

function ProductForm({
  product,
  selectedVariant,
  variants,
  setProductOutOfStock,
  isRemoved,
  handleButtonClick,
}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();
  const navigate = useNavigate();
  useEffect(() => {
    // Update the out-of-stock state based on the selected variant
    if (selectedVariant) {
      setProductOutOfStock(!selectedVariant.availableForSale);
    }
  }, [selectedVariant, setProductOutOfStock]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  // Function to increment quantity
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Function to decrement quantity, minimum 0
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Function to handle quantity change from input
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 100);
    setQuantity(value >= 0 ? value : 0);
  };

  // Function to handle "Add to Bag" button click
  const handleAddToBagClick = () => {
    setIsAddedToBag(true);
  };

  const handleGoToBag = () => {
    // open('cart');
    navigate('/cart');
    publish('cart_viewed', {
      cart,
      prevCart,
      shop,
      url: window.location.href || '',
    });
  };

  // Ensure lines is always an array
  const lines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: quantity,
        },
      ]
    : [];

  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => (
          <ProductOptions key={option.name} option={option} product={product} />
        )}
      </VariantSelector>
      <br />
      {selectedVariant?.availableForSale && (
        <>
          <hr
            className="my-4"
            style={{marginTop: '1rem', marginBottom: '1rem'}}
          />

          <div
            className="details-btn-group d-flex flex-row"
            id="detailsBtnGroupResponsive"
          >
            <button className="quantity bg-white" id="quantityBtn">
              <img
                src={MinusIcon}
                className="mi-lg mi-minus wh-18 d-inline-block me-3"
                onClick={decrementQuantity}
              />
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <img
                src={PlusIcon}
                className="mi-lg mi-plus wh-18 d-inline-block ms-3"
                onClick={incrementQuantity}
              />
            </button>

            <AddToBagButton
              handleAddToBagClick={handleAddToBagClick}
              lines={lines}
              quantity={quantity}
              isAddedToBag={isAddedToBag}
              disabled={!selectedVariant || !selectedVariant.availableForSale}
            >
              {/* {selectedVariant?.availableForSale ? 'Add to bag' : 'Sold out'} */}
            </AddToBagButton>

            <button
              className="add-to-bag align-items-center go-to-bag-button"
              id="goToBagBtn"
              style={{display: isAddedToBag ? 'flex' : 'none'}}
              onClick={handleGoToBag}
            >
              GO TO BAG
              <img
                src={RightArrowIcon}
                className="mi-lg mi-right_arrow wh-18 d-inline-block ms-2"
              />
            </button>
            <button
              className={`wishlist bg-white ${isRemoved ? 'remove' : ''}`}
              id="wishlistBtn"
              onClick={handleButtonClick}
            >
              <img
                src={isRemoved ? WishlistSelectedRedIcon : WishlistIcon}
                className={`mi-lg mi-wishlist_2 d-inline-block me-2 ${
                  isRemoved ? 'wh-30' : 'wh-18'
                }`}
              />
              {isRemoved ? 'REMOVE' : 'WISHLIST'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
function AddToBagButton({
  analytics,
  children,
  quantity,
  disabled,
  lines = [],
  onClick,
  isAddedToBag,
  handleAddToBagClick,
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <div className="form1">
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <input name="quantity" type="hidden" value={quantity} />
          <button
            className="add-to-bag add-to-bag-button"
            id="addToBagBtn"
            type="submit"
            style={{display: isAddedToBag ? 'none' : 'inline-flex'}}
            onClick={() => {
              handleAddToBagClick();
              onClick;
            }}
          >
            <img
              src={CheckoutIcon}
              className="mi-lg mi-checkout wh-18 d-inline-block me-2"
            ></img>
            ADD TO BAG
          </button>
        </div>
      )}
    </CartForm>
  );
}

function ProductPrice({selectedVariant}) {
  return (
    <div className="">
      {selectedVariant?.compareAtPrice ? (
        <>
          <div className="product-price-on-sale">
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
}

function getImagesByColor1(product, selectedVariant) {
  const colorOptions =
    product?.options?.find((option) => option.name === 'Color')?.values || [];
  const images = product.images.nodes;
  // Initialize the result object with arrays for each color option
  const result = {};
  colorOptions.forEach((color) => {
    result[color] = [];
  });

  // Populate the result object with images grouped by color
  images.forEach((image) => {
    if (colorOptions.includes(image.altText)) {
      result[image.altText].push(image);
    }
  });

  // // Extract color dynamically from selectedVariant.title

  function getColorFromTitle(title, colorOptions) {
    const titleWords = title.split(/ \/ | /).filter(Boolean);

    // Find a match from titleWords in colorOptions
    const matchedColor = titleWords.find((word) =>
      colorOptions.includes(word.trim()),
    );

    return matchedColor || null;
  }
  const color = getColorFromTitle(selectedVariant.title, colorOptions);

  if (color && result[color]) {
    return result[color];
  } else {
    console.log('No images found for the selected color');
    return [];
  }
}

const ProductDetails = ({
  product,
  variants,
  selectedVariant,
  recommendedProducts,
  collectionHandle,
  shippingReturnBlog,
  faqBlog,
}) => {
  if (!product || !variants || !selectedVariant || !recommendedProducts)
    return null;

  const productImages = product?.images?.nodes;
  const productImages1 = getImagesByColor1(product, selectedVariant);
  const isBestSeller = product.tags.includes('Best Seller');
  const isNew = product.tags.includes('New');
  const [selectedImage, setSelectedImage] = useState();
  const [isRemoved, setIsRemoved] = useState(false);
  const [productOutOfStock, setProductOutOfStock] = useState(true);
  const [homeDecorCategory, setHomeDecorCategory] = useState(false);
  const [isCheckDeliveryOption, setIsCheckDeliveryOption] = useState(false);
  const imgRef = useRef(null);
  const resultRef = useRef(null);
  const breadcrumbItems = [
    {name: 'Home', href: '/'},
    {name: collectionHandle, href: `/collections/${collectionHandle}`},
    {
      name: product.title,
    },
  ];

  // Map products to wardrobeItems with necessary properties
  const wardrobeItems1 = recommendedProducts?.productRecommendations?.map(
    (product) => {
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
        hoverSrc: product.images.nodes[0]?.url,
        title: product.title,
        description: product.description,
        // productPrice: originalPrice,
        discountPrice: discountedPrice,
        // discount: `${discountPercentage.toFixed(0)}% OFF`,
        isBestSeller: product.tags.includes('Best Seller'),
        isNew: product.tags.includes('New'),
      };
    },
  );

  useEffect(() => {
    setSelectedImage(selectedVariant.image);
  }, [selectedVariant]);
  const handleButtonClick = () => {
    setIsRemoved(!isRemoved);
  };

  // Effect to handle image zoom lens functionality
  useEffect(() => {
    function createLens() {
      const lens = document.createElement('DIV');
      lens.className = 'img-zoom-lens';
      return lens;
    }

    function calculateRatios(result, lens, img) {
      const cx = result.offsetWidth / lens.offsetWidth;
      const cy = result.offsetHeight / lens.offsetHeight;
      return {cx, cy};
    }

    function setBackgroundProperties(result, img, cx, cy) {
      result.style.backgroundImage = `url('${img?.src}')`;
      result.style.backgroundSize = `${img?.width * cx}px ${
        img?.height * cy
      }px`;
    }

    function moveLens(e, img, lens, result, cx, cy) {
      e.preventDefault();
      const pos = getCursorPos(e, img);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      x = Math.max(0, Math.min(x, img.width - lens.offsetWidth));
      y = Math.max(0, Math.min(y, img.height - lens.offsetHeight));

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    function getCursorPos(e, img) {
      const a = img.getBoundingClientRect();
      const x = e.pageX - a.left - window.pageXOffset;
      const y = e.pageY - a.top - window.pageYOffset;
      return {x, y};
    }

    function toggleVisibility(lens, result, isVisible) {
      if (isVisible) {
        setTimeout(() => {
          lens.style.visibility = 'visible';
          lens.style.opacity = '1';
          result.style.visibility = 'visible';
          result.style.opacity = '1';
        }, 100); // 100ms delay
      } else {
        lens.style.visibility = 'hidden';
        lens.style.opacity = '0';
        result.style.visibility = 'hidden';
        result.style.opacity = '0';
      }
    }

    const img = imgRef.current;
    const result = resultRef.current;
    const lens = createLens();

    img?.parentElement.insertBefore(lens, img);

    const {cx, cy} = calculateRatios(result, lens, img);
    setBackgroundProperties(result, img, cx, cy);

    lens?.addEventListener('mousemove', (e) =>
      moveLens(e, img, lens, result, cx, cy),
    );
    img?.addEventListener('mousemove', (e) =>
      moveLens(e, img, lens, result, cx, cy),
    );

    lens?.addEventListener('touchmove', (e) =>
      moveLens(e, img, lens, result, cx, cy),
    );
    img?.addEventListener('touchmove', (e) =>
      moveLens(e, img, lens, result, cx, cy),
    );

    img?.addEventListener('mouseenter', () =>
      toggleVisibility(lens, result, true),
    );
    img?.addEventListener('mouseleave', () =>
      toggleVisibility(lens, result, false),
    );

    return () => {
      lens?.removeEventListener('mousemove', (e) =>
        moveLens(e, img, lens, result, cx, cy),
      );
      img?.removeEventListener('mousemove', (e) =>
        moveLens(e, img, lens, result, cx, cy),
      );

      lens?.removeEventListener('touchmove', (e) =>
        moveLens(e, img, lens, result, cx, cy),
      );
      img?.removeEventListener('touchmove', (e) =>
        moveLens(e, img, lens, result, cx, cy),
      );

      img?.removeEventListener('mouseenter', () =>
        toggleVisibility(lens, result, true),
      );
      img?.removeEventListener('mouseleave', () =>
        toggleVisibility(lens, result, false),
      );
    };
  }, [imgRef, resultRef]);

  // Initialize all tooltips
  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  const collection = {
    collection: {
      title: 'More From Similar Color',
      handle: collectionHandle,
    },
  };
  const similarProductCollection = {
    collection: {
      title: 'Similar Product',
      handle: collectionHandle,
    },
  };

  return (
    <div className="product-details-main-container">
      {/* <!-- breadcrumb --> */}
      <Breadcrumb items={breadcrumbItems} />
      {/* more from similar color offcanvas */}
      <div
        className="offcanvas offcanvas-bottom"
        tabIndex="-1"
        id="offcanvasColorItems"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="d-flex justify-content-center mb-3 position-relative wardrobe-header1 mt-3"></div>
        <div className="fluid-container position-relative main-container1 mb-0">
          <div className="row" id="similarItems"></div>
          <div id="similarItems" className="row">
            <WardrobeCarousal
              wardrobeItems={wardrobeItems}
              collection={collection}
              wishList={true}
              productDetails={true}
            />
          </div>
        </div>
      </div>

      {/* <!-- products images carousel for mobile view --> */}
      <div id="productCarousel" className="carousel slide d-none mb-1">
        <div className="carousel-inner" id="carouselProductImages">
          {productImages1.map(({url: imgSrc, altText}, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img src={imgSrc} className="d-block w-100" alt={altText} />
            </div>
          ))}
        </div>

        <div id="carouselProductIndicators" className="carousel-indicators">
          {productImages1.map((_, index) => (
            <button
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide-to={index}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              className={index === 0 ? 'active' : ''}
              key={index}
            ></button>
          ))}
        </div>
      </div>
      {/*  product-details  */}
      <div className="product-details-container mb-5 d-flex flex-row wardrobe-header">
        {homeDecorCategory ? (
          <div className="w-50 home-decor-section d-flex flex-row pe-0">
            {productImages?.map((val) => (
              <div className="img-container">
                <img src={val.url} alt={val.altText} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/*  sarees images section  */}
            <div className="w-50 image-section d-flex flex-row">
              <div className="product-images d-flex flex-column">
                {productImages1.map((val, index) => (
                  <>
                    <div className="img-container" key={index}>
                      <img
                        src={val.url}
                        alt={`Product Detail ${index + 1}`}
                        onClick={() => setSelectedImage(val)}
                        className={
                          val?.url === selectedImage?.url ? 'selected' : ''
                        }
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className="selected-img-section">
                <div className="selected-img">
                  <img
                    src={selectedImage?.url}
                    alt="Selected Product Image"
                    id="selectedImage"
                    // ref={imgRef}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    id="similarColorButton"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasColorItems"
                    aria-controls="offcanvasColorItems"
                    className="similar-color-btn"
                  >
                    MORE FROM SIMILAR COLOR
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/*  details-section  */}
        <div className="w-50 details-section position-relative">
          <div
            id="zoomResult"
            className="img-zoom-result"
            ref={resultRef}
          ></div>

          <div className="d-flex flex-row">
            {isNew && <div className="new-tag">New</div>}
            {isBestSeller && <div className="best-seller-top">Best Seller</div>}
          </div>
          <div className="brand">{product?.vendor}</div>
          <div className="product-name">{product?.title}</div>
          <div className="d-flex flex-row price-section align-items-center">
            <div className="discount-price me-2">
              {<ProductPrice selectedVariant={selectedVariant} />}
            </div>
          </div>
          <div className="inclusive-tax">(Inclusive of all taxes)</div>

          <hr />
          <ProductMain
            selectedVariant={selectedVariant}
            product={product}
            variants={variants}
            setProductOutOfStock={setProductOutOfStock}
            handleButtonClick={handleButtonClick}
            isRemoved={isRemoved}
          />
          <Analytics.ProductView
            data={{
              products: [
                {
                  id: product.id,
                  title: product.title,
                  price: selectedVariant?.price.amount || '0',
                  vendor: product.vendor,
                  variantId: selectedVariant?.id || '',
                  variantTitle: selectedVariant?.title || '',
                  quantity: 1,
                },
              ],
            }}
          />
          {/* <h5 className="product-detail-headers">Colors</h5>
          <div className="colors-option d-flex flex-row">
            <div className="color-option-img">
              <img src={ProductDetailImage1} />
            </div>
            <div className="color-option-img">
              <img src={ProductDetailImage2} />
            </div>
          </div> */}

          {/*  if product is out of stock show below commented section and notify me button with wishlist which is also commented for now  */}

          {productOutOfStock && (
            <>
              <h5 className="product-detail-headers pt-3">
                Product is Out of Stock
              </h5>
              <div className="out-of-stock-text">
                Please provide your email address, and we'll notify you as soon
                as the product is back in stock.
              </div>
              <div className="out-of-stock-container">
                <div className="out-of-stock-section">
                  <label
                    className="form-check-label mt-2 mb-1"
                    htmlFor="emailSearch"
                  >
                    Email
                  </label>
                  <input
                    className="form-control border pl-2 br-0 nav-search-bar mb-3"
                    type="email"
                    // value=""
                    name="email"
                    id="emailSearch"
                    placeholder="Enter your email ID"
                  />
                </div>
                <div className="or-text">Or</div>
                <div className="out-of-stock-section">
                  <label
                    className="form-check-label mt-2 mb-1"
                    htmlFor="whatsappNo"
                  >
                    What's App / Mobile Number
                  </label>
                  <input
                    className="form-control border pl-2 br-0 nav-search-bar mb-3"
                    type="text"
                    // value=""
                    id="whatsappNo"
                    placeholder="Enter your number"
                  />
                </div>
              </div>
              {/* <!-- notify me modal --> */}
              <div
                className="modal fade"
                id="notifyMe"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="notifyMeLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title d-flex flex-column"
                        id="notifyMeLabel"
                      >
                        <div className="main-title">
                          Thank you for expressing your interest.
                        </div>
                        <div className="content">
                          We shall notify you as soon as this product is
                          available for purchase.
                        </div>
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <button className="continue-shopping">
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* Check Delivery Options */}
          {isCheckDeliveryOption && (
            <>
              <h5 className="product-detail-headers">Check Delivery Options</h5>
              <div className="input-group mb-2">
                <input
                  className="form-control border delivery-search-bar position-relative"
                  type="text"
                  // value=""
                  id="example-search-pincode"
                  placeholder="Enter Pincode"
                />
                <span className="check-btn position-absolute" role="button">
                  CHECK
                </span>
                <span className="checked-icon mi-lg mi-active wh-22 d-inline-block me-3 position-absolute hidden-section"></span>
                <div className="mb-2 delivery-text d-flex align-items-center hidden-section">
                  <span className="mi-lg mi-delivery wh-18 d-inline-block me-2"></span>
                  Product will be delivered
                  <span className="pay-text ms-2">within 10 days</span>
                </div>
                <div className="pay-text d-flex align-items-center hidden-section">
                  <span className="mi-lg mi-pay wh-18 d-inline-block me-2"></span>
                  Pay on delivery available
                </div>
              </div>
            </>
          )}

          <div
            className="details-btn-group d-flex flex-row"
            id="detailsBtnGroup"
          >
            {productOutOfStock && (
              <>
                {/* <!-- notify me button --> */}
                <button
                  className="add-to-bag"
                  id="notifyBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#notifyMe"
                >
                  <img
                    src={MessageIcon}
                    className="mi-lg mi-message wh-18 d-inline-block me-2"
                  ></img>
                  NOTIFY ME
                </button>
                <button
                  className={`wishlist bg-white ${isRemoved ? 'remove' : ''}`}
                  id="wishlistBtn"
                  onClick={handleButtonClick}
                >
                  <img
                    src={isRemoved ? WishlistSelectedRedIcon : WishlistIcon}
                    className={`mi-lg mi-wishlist_2 d-inline-block me-2 ${
                      isRemoved ? 'wh-30' : 'wh-18'
                    }`}
                  ></img>
                  {isRemoved ? 'REMOVE' : 'WISHLIST'}
                </button>
              </>
            )}
          </div>

          <hr className="mb-0" />
          {/*  accordions  */}
          <div className="accordion" id="detailsAccordion">
            {/*  Product details Section  */}
            <ProductDetailsSection
              productDescription={product.descriptionHtml}
            />
            {/*  Shipping & Returns Section  */}
            <ShippingAndReturn shippingReturnBlog={shippingReturnBlog} />
            {/*  FAQ  */}
            <FAQ faqBlog={faqBlog} />
          </div>

          {/*  responsive btn group of checkout and wishlist  */}
          <div
            className="details-btn-group d-none mb-0 mt-3 flex-row"
            id="detailsBtnGroupResponsive"
          >
            {productOutOfStock && (
              <>
                <button
                  className="add-to-bag"
                  id="notifyBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#notifyMe"
                >
                  <img
                    src={MessageIcon}
                    className="mi-lg mi-message wh-18 d-inline-block me-2"
                  ></img>
                  NOTIFY ME
                </button>
                <button
                  className={`wishlist bg-white ${isRemoved ? 'remove' : ''}`}
                  id="wishlistBtn"
                  onClick={handleButtonClick}
                >
                  <img
                    src={isRemoved ? WishlistSelectedRedIcon : WishlistIcon}
                    className={`mi-lg mi-wishlist_2 d-inline-block me-2 ${
                      isRemoved ? 'wh-30' : 'wh-18'
                    }`}
                  ></img>
                  {isRemoved ? 'REMOVE' : 'WISHLIST'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <WardrobeCarousal
          wardrobeItems={wardrobeItems1}
          collection={similarProductCollection}
          wishList={true}
          productDetails={false}
          similarProduct={true}
        />
      </div>
      <div className="similar-product">
        <WardrobeCarousal
          wardrobeItems={wardrobeItems}
          collection={collection}
          wishList={true}
          moreColorProducts={true}
          similarProduct={true}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
