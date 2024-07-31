import React, {useEffect, useState} from 'react';
import DeleteIcon from '~/assets/delete.svg';
import AddIcon from '~/assets/add-icon.svg';
import BackIcon from '~/assets/Icon_Back_Arrow.svg';
import '../cart-main.css';
import AddAddressModal from '../add-address-modal/add-address-modal';

const ChangeAddressModal = ({
  isAddAddressModalOpen,
  setIsAddAddressModalOpen,
  isModalOpen,
  onModalClose,
}) => {
  const [selectedAddress, setSelectedAddress] = useState('defaultAddress');
  const [modalType, setModalType] = useState('');

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.id);
  };
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsAddAddressModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddAddressModalOpen(false);
  };
  useEffect(() => {
    const modalElement = document.getElementById('changeAddress');

    const handleModalClose = () => {
      onModalClose();
    };

    modalElement.addEventListener('hidden.bs.modal', handleModalClose);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  }, [onModalClose]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isModalOpen]);
  return (
    <div
      className={`modal fade ${isModalOpen ? 'show' : ''}`}
      id="changeAddress"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="changeAddressLabel"
      aria-hidden={!isModalOpen}
      style={{display: isModalOpen ? 'block' : 'none'}}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title d-flex align-items-center"
              id="changeAddressLabel"
            >
              <img
                onClick={onModalClose}
                src={BackIcon}
                role="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="wh-26 mi-lg mi-back_arrow d-none me-2"
              />
              Select Delivery Address
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onModalClose}
            />
          </div>
          <div className="modal-body">
            <div className="saved-address d-flex justify-content-between flex-row">
              <div className="title">Saved Address</div>
              <div
                onClick={() => handleOpenModal('add')}
                className="add-address-btn d-flex align-items-center"
                role="button"
              >
                <img
                  src={AddIcon}
                  alt={'add-icon'}
                  height={20}
                  width={20}
                  className="mi-lg me-2 mi-add wh-20 d-inline-block"
                />
                Add New Address
              </div>
            </div>
            {/* addresses */}
            <div className="address-block position-relative">
              {/* <div className="address-category default-category position-absolute">
                Home
              </div> */}
              <input
                className="form-check-input"
                type="radio"
                name="addressType"
                id="defaultAddress"
                defaultChecked
                value="defaultAddress"
                checked={selectedAddress === 'defaultAddress'}
                onChange={handleAddressChange}
              />
              <label
                className="form-check-label d-flex flex-column"
                htmlFor="defaultAddress"
              >
                <div className="username">
                  Radha Mehta <span>(Default)</span>
                </div>
                <div className="address">
                  41/2, Manjula Chambers, 41/2, Manjula Chambers, Karve Road,
                  Near Yatri Hotel, Paud Road, 412101
                </div>
                <div className="contact d-flex flex-row">
                  <div className="contact-type">Mobile:</div>
                  <div className="content">+91 8989898989</div>
                </div>
                {selectedAddress === 'defaultAddress' && (
                  <div className="action-btns d-flex flex-row justify-content-between">
                    <div>
                      <button className="me-3 deliver-here-btn">
                        DELIVER HERE
                      </button>
                      <button
                        onClick={() => handleOpenModal('edit')}
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addAddress"
                      >
                        EDIT
                      </button>
                    </div>
                    <button className="d-flex align-items-center">
                      <img
                        src={DeleteIcon}
                        className="mi-lg mi-delete wh-18 d-inline-block"
                      />
                    </button>
                  </div>
                )}
              </label>
            </div>
            <div className="address-block position-relative">
              {/* <div className="address-category position-absolute">Work</div> */}
              <input
                className="form-check-input"
                type="radio"
                name="addressType"
                id="otherAddress"
                defaultValue="otherAddress"
                value="otherAddress"
                checked={selectedAddress === 'otherAddress'}
                onChange={handleAddressChange}
              />
              <label
                className="form-check-label d-flex flex-column"
                htmlFor="otherAddress"
              >
                <div className="username">Rakesh Mehta</div>
                <div className="address">
                  41/2, Manjula Chambers, 41/2, Manjula Chambers, Kar...
                </div>
                {selectedAddress === 'otherAddress' && (
                  <div className="action-btns d-flex flex-row justify-content-between">
                    <div>
                      <button className="me-3 deliver-here-btn">
                        DELIVER HERE
                      </button>
                      <button
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addAddress"
                        onClick={() => handleOpenModal('edit')}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                )}
              </label>
            </div>
            <div className="address-block position-relative">
              {/* <div className="address-category position-absolute">Work</div> */}
              <input
                className="form-check-input"
                type="radio"
                name="addressType"
                id="otherAddress2"
                defaultValue="otherAddress2"
                value="otherAddress2"
                checked={selectedAddress === 'otherAddress2'}
                onChange={handleAddressChange}
              />
              <label
                className="form-check-label d-flex flex-column"
                htmlFor="otherAddress2"
              >
                <div className="username">Rakesh Mehta</div>
                <div className="address">
                  41/2, Manjula Chambers, 41/2, Manjula Chambers, Kar...
                </div>
                {selectedAddress === 'otherAddress2' && (
                  <div className="action-btns d-flex flex-row justify-content-between">
                    <div>
                      <button className="me-3 deliver-here-btn">
                        DELIVER HERE
                      </button>
                      <button
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addAddress"
                        onClick={() => handleOpenModal('edit')}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                )}
              </label>
            </div>
            <div className="address-block position-relative">
              {/* <div className="address-category position-absolute">Work</div> */}
              <input
                className="form-check-input"
                type="radio"
                name="addressType"
                id="otherAddress3"
                defaultValue="otherAddress3"
                value="otherAddress3"
                checked={selectedAddress === 'otherAddress3'}
                onChange={handleAddressChange}
              />
              <label
                className="form-check-label d-flex flex-column"
                htmlFor="otherAddress3"
              >
                <div className="username">John Mehta</div>
                <div className="address">
                  41/2, Manjula Chambers, 41/2, Manjula Chambers, Kar...
                </div>
                {selectedAddress === 'otherAddress3' && (
                  <div className="action-btns d-flex flex-row justify-content-between">
                    <div>
                      <button className="me-3 deliver-here-btn">
                        DELIVER HERE
                      </button>
                      <button
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addAddress"
                        onClick={() => handleOpenModal('edit')}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                )}
              </label>
            </div>
            <div
              className="add-address-btn mt-3 d-flex align-items-center"
              role="button"
              onClick={() => handleOpenModal('add')}
            >
              <img
                src={AddIcon}
                alt={'add-icon'}
                height={20}
                width={20}
                className="mi-lg me-2 mi-add wh-20 d-inline-block"
              />
              Add New Address
            </div>
            <hr className="mt-3 mb-2 address-ruler" />
          </div>
          <div className="modal-footer d-none">
            <button
              className="add-address-fixed"
              onClick={() => handleOpenModal('add')}
            >
              <img
                src={AddIcon}
                alt={'add-icon'}
                height={20}
                width={20}
                className="mi-lg me-2 wh-20 d-inline-block"
              />
              ADD NEW ADDRESS
            </button>
          </div>
          <AddAddressModal
            isOpen={isAddAddressModalOpen}
            onClose={handleCloseModal}
            type={modalType}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeAddressModal;
