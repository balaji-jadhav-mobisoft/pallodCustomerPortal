import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import FooterSection from './footer/footer';

/**
 * @param {FooterProps}
 */
export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
  footerAbout: footerAboutPromise,
  pallodAboutBlog: pallodAboutBlogPromise,
}) {
  return (
    <>
      <>
        <Suspense>
          <Await resolve={footerPromise}>
            {(footer) => (
              <footer className="footer">
                {footer?.menu && header.shop.primaryDomain?.url && (
                  <Suspense>
                    <Await resolve={footerAboutPromise}>
                      {(footerAbout) => (
                        <Suspense>
                          <Await resolve={pallodAboutBlogPromise}>
                            {(pallodAboutBlog) => (
                              <FooterMenu
                                menu={footer.menu}
                                primaryDomainUrl={header.shop.primaryDomain.url}
                                publicStoreDomain={publicStoreDomain}
                                footerAbout={footerAbout.metaobject}
                                pallodAboutBlog={pallodAboutBlog}
                              />
                            )}
                          </Await>
                        </Suspense>
                      )}
                    </Await>
                  </Suspense>
                )}
              </footer>
            )}
          </Await>
        </Suspense>
      </>
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

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
  footerAbout,
  pallodAboutBlog,
}) {
  return (
    <>
      <FooterSection
        menu={menu}
        primaryDomainUrl={primaryDomainUrl}
        publicStoreDomain={publicStoreDomain}
        footerAbout={footerAbout}
        pallodAboutBlog={pallodAboutBlog}
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
