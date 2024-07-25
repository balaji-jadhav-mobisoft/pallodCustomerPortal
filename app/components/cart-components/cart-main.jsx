import React, {useEffect, useState} from 'react';
import './cart-main.css';
import Designer1 from '~/assets/wardrobe/Wardrobe_1.webp';
import Designer2 from '~/assets/wardrobe/Wardrobe_2.webp';
import Designer3 from '~/assets/wardrobe/Wardrobe_3.webp';
import DeliveryTruckIcon from '~/assets/Icon_Delivery.svg';
import DeliveryIcon from '~/assets/Delivery.svg';
import {useVariantUrl} from '~/lib/variants';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import Wishlist from '~/assets/wishList-icon.svg';
import CloseIcon from '~/assets/Icon_Close.svg';
import PlusIcon from '~/assets/product-details/Icon_Plus.svg';
import MinusIcon from '~/assets/product-details/Icon_Minus.svg';
import Loader from '../common/loader/loader';
import PayPalIcon from '~/assets/PayPal_Icon.webp';
import MastercardIcon from '~/assets/Master_Card.webp';
import VisaIcon from '~/assets/Visa_Icon.webp';
import ChangeAddressModal from './change-address-modal/change-address-modal';
import DeleteIcon from '~/assets/Delete.svg';
import DownArrow from '~/assets/icon_down.svg';

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount)
    return <div style={{visibility: 'hidden'}}>&nbsp;</div>;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.amountPerQuantity
      : line.cost.amountPerQuantity;
  // const moneyV2 =
  //   priceType === 'regular'
  //     ? line.cost.totalAmount
  //     : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return <div style={{visibility: 'hidden'}}>&nbsp;</div>;
  }

  return (
    <div>
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </div>
  );
}

function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="quantity d-flex align-items-center bg-white me-3 quantityBtn quantity-section">
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          className="plus-minus-button"
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <img
            src={MinusIcon}
            width={18}
            height={18}
            className="mi-lg mi-minus wh-18 d-inline-block me-2"
          ></img>
        </button>
      </CartLineUpdateButton>
      <span className="count">{quantity}</span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          className="plus-minus-button"
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
        >
          <img
            src={PlusIcon}
            width={18}
            height={18}
            className="mi-lg mi-plus wh-18 d-inline-block ms-2"
          ></img>
        </button>
      </CartLineUpdateButton>

      {/* <CartLineRemoveButton lineIds={[lineId]} /> */}
    </div>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({cost, layout, children = null}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4>Totals</h4>
      <dl className="cart-subtotal">
        <dt>Subtotal</dt>
        <dd>
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {children}
    </div>
  );
}

function CartLineRemoveButton({lineIds, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      {children}
    </CartForm>
  );
}

const CartMainSection = ({
  line,
  layout,
  cart,
  setShowModal,
  setSelectedProducts,
  setLineIdsToRemove,
  setMobileQuantityModal,
  setMobileSizeModal,
}) => {
  const {id, merchandise, quantity} = line;
  const {product, title, image, selectedOptions, availableForSale} =
    merchandise;
  const [selectedSize, setSelectedSize] = useState(
    selectedOptions.find((option) => option.name === 'Size')?.value || '',
  );

  const [currentVariant, setCurrentVariant] = useState(merchandise);
  const [loading, setLoading] = useState(false);
  const sizeOptions =
    product.options.find((option) => option.name === 'Size')?.values || [];
  const color =
    selectedOptions.find((option) => option.name === 'Color')?.value || '';
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const handleRemoveClick = () => {
    setLineIdsToRemove([id]);
    setSelectedProducts([{image: image.url, title: product.title}]);
    setShowModal(true);
  };

  useEffect(() => {
    const newVariant = product.variants.edges.find(
      (variant) =>
        variant.node.selectedOptions.find((option) => option.name === 'Size')
          ?.value === selectedSize,
    )?.node;
    if (newVariant) {
      setCurrentVariant(newVariant);
    }
  }, [selectedSize, product.variants.edges]);

  const handleSizeChange = async (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    setLoading(true);
    const newVariant = product.variants.edges.find(
      (variant) =>
        variant.node.selectedOptions.find((option) => option.name === 'Size')
          ?.value === newSize,
    )?.node;

    if (!newVariant) {
      console.error('Variant not found for the selected size:', newSize);
      setLoading(false);
      return;
    }

    // Create a form data object for removing the old line
    const removeFormData = new FormData();
    removeFormData.append(
      'cartFormInput',
      JSON.stringify({
        action: 'LinesRemove',
        inputs: {lineIds: [id]},
      }),
    );

    // Create a form data object for adding the new line
    const addFormData = new FormData();
    addFormData.append(
      'cartFormInput',
      JSON.stringify({
        action: 'LinesAdd',
        inputs: {lines: [{merchandiseId: newVariant.id, quantity: quantity}]},
      }),
    );

    try {
      // Submit the remove form
      const removeResponse = await fetch('/cart', {
        method: 'POST',
        body: removeFormData,
      });

      if (!removeResponse.ok) {
        throw new Error('Failed to remove line');
      }

      // Submit the add form
      const addResponse = await fetch('/cart', {
        method: 'POST',
        body: addFormData,
      });

      if (!addResponse.ok) {
        throw new Error('Failed to add line');
      }

      // Optionally refresh the page or cart state
      window.location.reload();
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="added-item d-flex flex-row position-relative"
      key={line.code}
    >
      {loading && <Loader />}
      <img
        id="closeMobileIcon"
        onClick={handleRemoveClick}
        width={20}
        height={20}
        src={CloseIcon}
        className="mi-lg position-absolute wh-20 d-none"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#removeCartItem"
      ></img>
      <div className="item-img position-relative">
        {image && (
          <Image
            className={!availableForSale ? 'blur-img' : 'img'}
            sizes="(max-width: 600px) 100vw, 50vw"
            alt={title}
            data={image}
            loading="lazy"
          />
        )}
        {!availableForSale && (
          <div className="out-of-stock-item position-absolute">
            OUT OF STOCK
          </div>
        )}
      </div>
      <div className="d-flex flex-row justify-content-between flex-grow-1">
        <div className="d-flex flex-column item-details">
          <Link
            style={{textDecoration: 'none'}}
            prefetch="intent"
            to={lineItemUrl}
          >
            <p className="product-title-section">{product.title}</p>
          </Link>

          <div className="d-flex flex-row item-size-container">
            {/* <div className="code">
                Code: <span>{2324}</span>
              </div> */}
            <div className="size">
              Size: <span>{selectedSize}</span>
            </div>
            <div className="color">
              Color: <span>{color}</span>
            </div>
          </div>
          <div className="d-flex flex-row align-items-baseline">
            <CartLineQuantity line={line} />
            <button
              onClick={() => setMobileQuantityModal(true)}
              className="size-dropdown d-none align-items-center bg-white me-3"
              role="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#quantityOffcanvas"
              aria-controls="#quantityOffcanvas"
              id="qtyBtn"
            >
              Qty: {9087}
              <img
                src={DownArrow}
                width={18}
                height={18}
                className="bi bi-chevron-down wh-18 d-inline-block ms-2"
              />
            </button>
            <div className="dropdown" id="sizeDropdown">
              <ul>
                {selectedOptions.map((option) => (
                  <li key={option.name}>
                    {option.name === 'Size' && (
                      <select
                        className="size-selector"
                        value={selectedSize}
                        onChange={handleSizeChange}
                      >
                        {sizeOptions.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setMobileSizeModal(true)}
              className="size-dropdown d-none align-items-center bg-white"
              id="sizeDropdownMobile"
              role="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sizeOffcanvas"
              aria-controls="#sizeOffcanvas"
            >
              {'L'}
              <img
                src={DownArrow}
                width={18}
                height={18}
                className="bi bi-chevron-down wh-18 d-inline-block ms-2"
              />
            </button>
          </div>
          <div
            className="delivery-time d-none mt-2 mb-0 align-content-center"
            id="deliveryTime"
          >
            <img
              alt="deliver"
              src={DeliveryTruckIcon}
              width={20}
              height={20}
              className="mi-lg wh-20 d-inline-block align-bottom"
            ></img>
            Delivered within 8-10 days
          </div>
        </div>
        <div className="d-flex flex-column delivery-details justify-content-between">
          <div className="price d-flex flex-column">
            <div className="d-flex flex-row justify-content-between mb-1">
              <div className="discount-price">
                <CartLinePrice line={line} as="span" />
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src={Wishlist}
                  height={22}
                  width={22}
                  className="bi-lg bi-heart wh-22 d-inline-block me-3"
                ></img>
                {/* <CartLineRemoveButton lineIds={[id]} /> */}
                <img
                  onClick={handleRemoveClick}
                  width={24}
                  height={24}
                  src={CloseIcon}
                  className="bi bi-x-lg wh-24"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#removeCartItem"
                ></img>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center"></div>
          </div>
          <div className="delivery-time d-flex">
            <img
              alt="deliver"
              src={DeliveryIcon}
              width={20}
              height={20}
              className="bi bi-truck wh-20 d-inline-block align-bottom"
            ></img>
            Delivered within 8-10 days
          </div>
        </div>
      </div>
    </div>
  );
};
const CartMain = ({cart, layout, hidden}) => {
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const lines = cart?.lines?.nodes;
  const [showModal, setShowModal] = useState(false);
  const [mobileSizeModal, setMobileSizeModal] = useState(false);
  const [mobileQuantityModal, setMobileQuantityModal] = useState(false);
  const [isChangeAddressModalOpen, setIsChangeAddressModalOpen] =
    useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const handleChangeAddressModalClose = () => {
    setIsChangeAddressModalOpen(false);
  };
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [lineIdsToRemove, setLineIdsToRemove] = useState([]);

  const renderCartItems = () => {
    return (
      <>
        {lines.map((line, index) => (
          <CartMainSection
            setSelectedProducts={setSelectedProducts}
            setLineIdsToRemove={setLineIdsToRemove}
            setShowModal={setShowModal}
            setMobileSizeModal={setMobileSizeModal}
            setMobileQuantityModal={setMobileQuantityModal}
            key={index}
            line={line}
            layout={layout}
            cart={cart}
          />
        ))}
      </>
    );
  };

  return (
    <div className="cart-main-container">
      <div className="main-container d-flex flex-row cart-section">
        {hidden && (
          <>
            <div className="added-items-container">
              <div className="delivery-address d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                  <div className="deliver-to">
                    Delivery to: <span>Radha Mehta, 412101</span>
                  </div>
                  <div className="location">
                    Gool Poonawalla Garden, Salisbury Park, Pune
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() => setIsChangeAddressModalOpen(true)}
                    data-bs-toggle="modal"
                    data-bs-target="#changeAddress"
                  >
                    CHANGE <span className="responsive-hide">ADDRESS</span>
                  </button>
                </div>
              </div>
              {lines.length > 0 && (
                <h3>
                  Added Items <span> ({lines.length})</span>
                </h3>
              )}
              <div id="cartItems">{renderCartItems()}</div>
              <div className="cart-policy d-flex flex-column" id="cartPolicy">
                <p>
                  *Once your order has been placed no subsequent changes can be
                  made in it.
                </p>
                <p>
                  *Shipping cost may vary depending on the delivery destination.
                </p>
                <p>
                  *Please check the final amount on the order summary page
                  before completing the payment.
                </p>
                <p>*An item's price may vary according to the size selected.</p>
                <div className="d-flex flex-row links">
                  <a href className="me-3">
                    SHIPPING POLICY
                  </a>
                  <a href className="me-3">
                    HELP
                  </a>
                  <a href className="me-3">
                    CONTACT US
                  </a>
                </div>
              </div>
              <div className="continue-shopping-responsive d-none">
                <button className="continue-shopping">
                  <Link to="/" style={{textDecoration: 'none'}}>
                    CONTINUE SHOPPING
                  </Link>
                </button>
              </div>
            </div>

            <div className="price-summary-container" id="priceSummary">
              <h3>Price Summary</h3>
              <div className="d-flex flex-row justify-content-between price-content">
                <div>Bag total</div>
                <div>
                  {cart?.cost?.subtotalAmount?.amount ? (
                    <Money data={cart?.cost?.subtotalAmount} />
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between price-content">
                <div>Tax</div>
                <div>
                  {cart?.cost?.totalTaxAmount?.amount ? (
                    <Money data={cart?.cost?.totalTaxAmount} />
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between price-content">
                <div>Shipping</div>
                <div>Free</div>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-between total-pay">
                <div>Total Payable</div>
                <div>
                  {cart?.cost?.totalAmount?.amount ? (
                    <Money data={cart?.cost?.totalAmount} />
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div className="d-flex flex-column">
                <button className="checkout-btn proceed-to-checkout">
                  <Link
                    to={cart.checkoutUrl}
                    style={{textDecoration: 'none', color: '#fff'}}
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </button>
                <button className="continue-btn">
                  <Link style={{textDecoration: 'none'}} to="/">
                    CONTINUE SHOPPING
                  </Link>
                </button>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="secure-payment-text d-flex align-items-start">
                  <span className="mi-lg mi-delivery wh-20 me-1 d-inline-block" />
                  Safe &amp; Secure Payment Methods
                </div>
                <div className="d-flex flex-row">
                  <div className="payment-options-icon me-3">
                    <img src={PayPalIcon} alt="pay-pal" className="zoom-img" />
                  </div>
                  <div className="payment-options-icon me-3">
                    <img
                      src={MastercardIcon}
                      alt="payment-icon"
                      className="zoom-img"
                    />
                  </div>
                  <div className="payment-options-icon">
                    <img src={VisaIcon} alt="visa-icon" className="zoom-img" />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- change address modal --> */}
            {isChangeAddressModalOpen && (
              <ChangeAddressModal
                isModalOpen={isChangeAddressModalOpen}
                onModalClose={handleChangeAddressModalClose}
                isAddAddressModalOpen={isAddAddressModalOpen}
                setIsAddAddressModalOpen={setIsAddAddressModalOpen}
              />
            )}

            {showModal && (
              <div
                className="modal fade"
                id="removeCartItem"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="removeCartItemLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header d-flex flex-row justify-content-between">
                      <h5
                        className="modal-title d-flex flex-column"
                        id="removeCartItemLabel"
                      >
                        <span className="main-title">Move from Bag</span>
                        <span className="sub-title">
                          Are you sure you want to move this item from bag?
                        </span>
                      </h5>
                      <button
                        type="button"
                        className="btn-close d-flex align-items-center"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      {selectedProducts.map((product, index) => (
                        <div
                          key={index}
                          className="product d-flex flex-row align-items-center"
                        >
                          <div className="img-container">
                            <img src={product.image} alt={product.title} />
                          </div>
                          <div className="prod-title">{product.title}</div>
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer">
                      <CartLineRemoveButton lineIds={lineIdsToRemove}>
                        <button
                          type="submit"
                          className="remove-btn"
                          data-bs-dismiss="modal"
                        >
                          REMOVE
                        </button>
                      </CartLineRemoveButton>
                      <button
                        type="button"
                        className="move-btn"
                        data-bs-dismiss="modal"
                      >
                        MOVE TO WISHLIST
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* sizeOffcanvas offcanvas  */}
        {mobileQuantityModal && (
          <div
            className="offcanvas offcanvas-bottom"
            tabIndex="-1"
            id="sizeOffcanvas"
            aria-labelledby="sizeOffcanvas"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasLabel">
                Select Size
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div className="quantity-section d-flex flex-row overflow-scroll">
                <div className="qty selected">US 1</div>
                <div className="qty">US 2</div>
                <div className="qty">US 3</div>
                <div className="qty">US 4</div>
                <div className="qty">US 5</div>
                <div className="qty">US 6</div>
                <div className="qty">US 7</div>
                <div className="qty">US 8</div>
              </div>
              <div className="offcanvas-footer d-flex">
                <button className="done-btn">DONE</button>
              </div>
            </div>
          </div>
        )}

        {/* quantityOffcanvas offcanvas  */}
        {mobileSizeModal && (
          <div
            className="offcanvas offcanvas-bottom"
            tabIndex={-1}
            id="quantityOffcanvas"
            aria-labelledby="quantityOffcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasLabel">
                Select Quantity
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div className="quantity-section d-flex flex-row overflow-scroll">
                <div className="qty selected">01</div>
                <div className="qty">02</div>
                <div className="qty">03</div>
                <div className="qty">04</div>
                <div className="qty">05</div>
                <div className="qty">06</div>
                <div className="qty">07</div>
                <div className="qty">08</div>
              </div>
              <div className="offcanvas-footer d-flex">
                <button className="done-btn">DONE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartMain;
