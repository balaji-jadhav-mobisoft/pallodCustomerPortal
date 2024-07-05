import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import FooterSection from './footer/footer';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <>
      <Suspense>
        <Await resolve={footerPromise}>
          {(footer) => (
            <footer className="footer">
              {footer?.menu && header.shop.primaryDomain?.url && (
                <FooterMenu
                  menu={footer.menu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
            </footer>
          )}
        </Await>
      </Suspense>
    </>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */

function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <>
      <FooterSection
        menu={menu}
        primaryDomainUrl={primaryDomainUrl}
        publicStoreDomain={publicStoreDomain}
      />
    </>
  );
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
