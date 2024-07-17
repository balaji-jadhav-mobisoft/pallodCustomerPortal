import React, {useEffect, useState} from 'react';
import './footer.css';
import CallIcon from '~/assets/call.svg';
import WhatsAppIcon from '~/assets/whatsapp.svg';
import MailIcon from '~/assets/mail.svg';
import FacebookIcon from '~/assets/facebook-footer.svg';
import InstagramIcon from '~/assets/instagram-footer.svg';
import PlayStoreLogo from '~/assets/Play_Store_Download.webp';
import AppleLogo from '~/assets/App_Store_Download.webp';
import PallodFooterIcon from '~/assets/Pallod_Footer_Logo.webp';
import PayPalIcon from '~/assets/PayPal_Icon.webp';
import AmericanExpress from '~/assets/american-express.svg';
import MastercardIcon from '~/assets/Master_Card.webp';
import VisaIcon from '~/assets/Visa_Icon.webp';
import {NavLink} from '@remix-run/react';

const FooterSection = ({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
  footerAbout,
}) => {
  const [contactInputValue, setContactInputValue] = useState('');
  const [contactMethod, setContactMethod] = useState('email');

  useEffect(() => {
    const sets = [
      {
        emailRadio: 'emailRadioFooter',
        phoneRadio: 'phoneRadioFooter',
        contactInput: 'footer-search-input',
      },
      {
        emailRadio: 'emailRadioFtr',
        phoneRadio: 'phoneRadioFtr',
        contactInput: 'footer-search-ipt',
      },
      {
        emailRadio: 'emailRadioModal',
        phoneRadio: 'phoneRadioModal',
        contactInput: 'footer-search-modal',
      },
    ];

    const updatePlaceholder = (emailRadio, phoneRadio, contactInput) => {
      if (emailRadio.checked) {
        contactInput.placeholder = 'Enter Email Address';
      } else if (phoneRadio.checked) {
        contactInput.placeholder = 'Enter Phone Number';
      }
    };

    const addEventListeners = (emailRadio, phoneRadio, contactInput) => {
      emailRadio.addEventListener('change', () =>
        updatePlaceholder(emailRadio, phoneRadio, contactInput),
      );
      phoneRadio.addEventListener('change', () =>
        updatePlaceholder(emailRadio, phoneRadio, contactInput),
      );
      updatePlaceholder(emailRadio, phoneRadio, contactInput);
    };

    sets.forEach((set) => {
      const emailRadio = document.getElementById(set.emailRadio);
      const phoneRadio = document.getElementById(set.phoneRadio);
      const contactInput = document.getElementById(set.contactInput);

      if (emailRadio && phoneRadio && contactInput) {
        emailRadio.checked = true;
        phoneRadio.checked = false;
        addEventListeners(emailRadio, phoneRadio, contactInput);
      }
    });
  }, []);

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
  };

  const handleContactInputChange = (event) => {
    setContactInputValue(event.target.value);
  };

  return (
    <div className="footer-container-main">
      <div
        className="fluid-container wardrobe-header"
        style={{paddingTop: '29px'}}
      >
        <div className="row" id="defaultFooter">
          <div className="col-6">
            <div className="row">
              {['Quick Links', 'More Links', 'Customer Care'].map((title) => {
                const items =
                  menu?.items.find((item) => item.title === title)?.items || [];

                return (
                  <div key={title} className="col-4 footer-container">
                    <h5>{title}</h5>
                    {items.map((item, index) => {
                      if (!item.url) return null;
                      const url =
                        item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(primaryDomainUrl)
                          ? new URL(item.url).pathname
                          : item.url;
                      const isExternal = !url.startsWith('/');
                      return isExternal ? (
                        <a
                          key={item.id}
                          href={url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <NavLink
                          style={{textDecoration: 'none'}}
                          end
                          key={index}
                          prefetch="intent"
                          to={url}
                        >
                          <p>{item.title}</p>
                        </NavLink>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6 footer-container">
                <h5>Contact Us</h5>
                <p>
                  <img
                    src={CallIcon}
                    className="mi-lg mi-phone wh-20 align-bottom me-2 d-inline-block"
                    alt="Call Icon"
                  ></img>
                  +91 9999999999
                </p>
                <p>
                  <img
                    src={WhatsAppIcon}
                    className="mi-lg mi-whatsapp wh-20 align-bottom me-2 d-inline-block"
                    alt="WhatsApp Icon"
                  ></img>
                  +91 9999999999
                </p>
                <p
                  className="ellipsis-text"
                  title="customercare@pallodshop.com"
                >
                  <img
                    src={MailIcon}
                    className="mi-lg mi-mail wh-20 align-bottom me-2 d-inline-block"
                    alt="Mail Icon"
                  ></img>
                  customercare@pallodshop.com
                </p>
                <h5 className="mt-5">Follow Us On</h5>
                <p>
                  <img
                    src={FacebookIcon}
                    className="mi-lg mi-facebook social-media-icon d-inline-block"
                    alt="Facebook Icon"
                  ></img>
                  <img
                    src={InstagramIcon}
                    className="mi-lg mi-instagram social-media-icon d-inline-block"
                    alt="Instagram Icon"
                  ></img>
                </p>
              </div>
              <div className="col-6 footer-container">
                <h5>Get The Pallod Store app</h5>
                <p style={{color: 'rgba(30, 30, 30, 0.75'}}>
                  We will send you a link on your selected media, open it on
                  your phone & download the app.
                </p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contact"
                    id="emailRadioFooter"
                    value="email"
                    checked={contactMethod === 'email'}
                    onChange={handleContactMethodChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="emailRadioFooter"
                  >
                    Email
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contact"
                    id="phoneRadioFooter"
                    value="phone"
                    checked={contactMethod === 'phone'}
                    onChange={handleContactMethodChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="phoneRadioFooter"
                  >
                    Phone
                  </label>
                </div>
                <input
                  className="form-control border pl-2 my-2 nav-search-bar"
                  type="text"
                  name=""
                  value={contactInputValue}
                  id="footer-search-input"
                  placeholder={
                    contactMethod === 'email'
                      ? 'Enter Email Address'
                      : 'Enter Phone Number'
                  }
                  onChange={handleContactInputChange}
                />
                <button className="mt-2 share-app-link-btn">
                  SHARE APP LINK
                </button>
                <div className="d-flex flex-row mt-4">
                  <div className="me-3">
                    <img
                      src={PlayStoreLogo}
                      alt="Play Store"
                      className="zoom-img"
                    />
                  </div>
                  <div>
                    <img
                      src={AppleLogo}
                      alt="Apple Store"
                      className="zoom-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion d-none" id="footerAccordion">
          <div className="accordion-item">
            {['Quick Links', 'More Links', 'Customer Care'].map(
              (title, index) => {
                const items =
                  menu?.items.find((item) => item.title === title)?.items || [];
                const collapseId = `collapse${title.replace(/\s+/g, '')}`;

                return (
                  <div key={index} className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={`heading${title.replace(/\s+/g, '')}`}
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded="false"
                        aria-controls={collapseId}
                      >
                        {title}
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${title.replace(/\s+/g, '')}`}
                      data-bs-parent="#footerAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          {items.map((item, idx) => {
                            if (!item.url) return null;
                            const url =
                              item.url.includes('myshopify.com') ||
                              item.url.includes(publicStoreDomain) ||
                              item.url.includes(primaryDomainUrl)
                                ? new URL(item.url).pathname
                                : item.url;
                            const isExternal = !url.startsWith('/');
                            return isExternal ? (
                              <a
                                key={idx}
                                href={url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {item.title}
                              </a>
                            ) : (
                              <NavLink
                                style={{textDecoration: 'none'}}
                                end
                                key={idx}
                                prefetch="intent"
                                to={url}
                              >
                                <p>{item.title}</p>
                              </NavLink>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          {/* Contact Us Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingContactUs">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseContactUs"
                aria-expanded="false"
                aria-controls="collapseContactUs"
              >
                Contact Us
              </button>
            </h2>
            <div
              id="collapseContactUs"
              className="accordion-collapse collapse"
              aria-labelledby="headingContactUs"
              data-bs-parent="#footerAccordion"
            >
              <div className="accordion-body">
                <p>
                  <img
                    src={CallIcon}
                    className="mi-lg mi-phone wh-20 align-bottom me-2 d-inline-block"
                    alt="Call Icon"
                  ></img>
                  +91 9999999999
                </p>
                <p>
                  <img
                    src={WhatsAppIcon}
                    className="mi-lg mi-whatsapp wh-20 align-bottom me-2 d-inline-block"
                    alt="WhatsApp Icon"
                  ></img>
                  +91 9999999999
                </p>
                <p
                  className="ellipsis-text"
                  title="customercare@pallodshop.com"
                >
                  <img
                    src={MailIcon}
                    className="mi-lg mi-mail wh-20 align-bottom me-2 d-inline-block"
                    alt="Mail Icon"
                  ></img>
                  customercare@pallodshop.com
                </p>
                <h5 className="mt-5">Follow Us On</h5>
                <p>
                  <img
                    src={FacebookIcon}
                    className="mi-lg mi-facebook social-media-icon d-inline-block"
                    alt="Facebook Icon"
                  ></img>
                  <img
                    src={InstagramIcon}
                    className="mi-lg mi-instagram social-media-icon d-inline-block"
                    alt="Instagram Icon"
                  ></img>
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Follow Us On Section --> */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFollowUs">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFollowUs"
                aria-expanded="false"
                aria-controls="collapseFollowUs"
              >
                Follow Us On
              </button>
            </h2>
            <div
              id="collapseFollowUs"
              className="accordion-collapse collapse"
              aria-labelledby="headingFollowUs"
              data-bs-parent="#footerAccordion"
            >
              <div className="accordion-body">
                <p className="mt-3">
                  <img
                    src={FacebookIcon}
                    className="mi-lg mi-facebook social-media-icon d-inline-block"
                  ></img>
                  <img
                    src={InstagramIcon}
                    className="mi-lg mi-instagram social-media-icon d-inline-block"
                  ></img>
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Get Pallod App Section --> */}
          <div className="footer-container mt-3 ms-1">
            <h5 style={{fontWeight: 600}}>Get Pallod app</h5>
            <p style={{color: 'rgba(30, 30, 30, 0.75)'}}>
              We will send you a link on your selected media, open it on your
              phone & download the app.
            </p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="contact"
                id="emailRadioFtr"
                value="email"
                defaultChecked={false}
                checked={contactMethod === 'email'}
                onChange={handleContactMethodChange}
              />
              <label className="form-check-label" htmlFor="emailRadioFtr">
                Email
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="contact"
                id="phoneRadioFtr"
                value="phone"
                checked={contactMethod === 'phone'}
                onChange={handleContactMethodChange}
                defaultChecked={false}
              />
              <label className="form-check-label" htmlFor="phoneRadioFtr">
                Phone
              </label>
            </div>
            <input
              className="form-control border pl-2 my-2 nav-search-bar"
              type="text"
              value={contactInputValue}
              id="footer-search-ipt"
              placeholder={
                contactMethod === 'email'
                  ? 'Enter Email Address'
                  : 'Enter Phone Number'
              }
              onChange={handleContactInputChange}
            />
            <button className="mt-2 share-app-link-btn">SHARE APP LINK</button>
            <div className="d-flex flex-row mt-4">
              <div className="me-3 play-store-img">
                <img src={PlayStoreLogo} alt="pallod" className="zoom-img" />
              </div>
              <div className="play-store-img">
                <img src={AppleLogo} alt="pallod" className="zoom-img" />
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-ruler" />

        <div
          className="d-flex flex-row justify-content-start align-items-center customer-support-footer"
          id="footerPaymentMethods"
        >
          <div className="d-flex flex-grow-1">
            <div className="customer-support-text font-16">
              Completely Safe & Secure Payment Methods
            </div>
            <div
              className="me-0 d-flex flex-row justify-content-between"
              style={{marginLeft: '25px'}}
            >
              <div className="payment-options-icon me-4">
                <img src={AmericanExpress} alt="pallod" className="zoom-img" />
              </div>
              <div className="payment-options-icon me-4">
                <img src={PayPalIcon} alt="pallod" className="zoom-img" />
              </div>
              <div className="payment-options-icon me-4">
                <img src={MastercardIcon} alt="pallod" className="zoom-img" />
              </div>
              <div className="payment-options-icon me-4">
                <img src={VisaIcon} alt="pallod" className="zoom-img" />
              </div>
            </div>
          </div>
        </div>

        <div className="d-none" id="footerPaymentMethodsResponsive">
          <div className="customer-support-text font-16">
            Completely Safe & Secure Payment Methods
          </div>
          <div className="ms-5 me-0 d-flex flex-row flex-grow-1 justify-content-start">
            <div className="payment-options-icon me-4">
              <img src={PayPalIcon} alt="pallod" className="zoom-img" />
            </div>
            <div className="payment-options-icon me-4">
              <img src={MastercardIcon} alt="pallod" className="zoom-img" />
            </div>
            <div className="payment-options-icon me-4">
              <img src={VisaIcon} alt="pallod" className="zoom-img" />
            </div>
          </div>
        </div>

        <hr className="footer-ruler" />

        <div className="d-flex flex-column main-footer">
          <div className="d-flex flex-row">
            <div className="me-5 footer-logo">
              <img
                src={PallodFooterIcon}
                alt="pallod"
                className="zoom-img"
                style={{objectFit: 'contain'}}
              />
            </div>
            <div>
              <h4 className="mb-3 font-20 footer-header">
                About The Pallod Store
              </h4>
              <div className="footer-content">{footerAbout.field.value}</div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-5 footer-content font-16">
            © 2009 - 2024 Pallod Store All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
