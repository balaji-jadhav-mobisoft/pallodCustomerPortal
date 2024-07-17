import React from 'react';
import EditorPickCarousel from './editor-pick-carousal';
import './editor-pick.css';

import {NavLink} from '@remix-run/react';

const EditorPick = ({menu, primaryDomain, publicStoreDomain}) => {
  // Ensure required props are provided
  if (!menu || !menu?.items || !primaryDomain || !publicStoreDomain)
    return null;
  // Find the "Explore Our Collections" item in the menu
  const collection = menu?.items.find((item) => item.title === 'Editor’s Pick');

  if (!collection) return null;
  const editorPicks = collection?.items.map((item) => {
    if (!item.url) return null;

    // Determine the URL path for the collection item
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomain)
        ? new URL(item.url).pathname
        : item.url;

    return {
      title: item.title,
      subtitle: item.resource.title,
      image: item.resource.image.url,
      url: url,
    };
  });
  return (
    <div className="editor-pick-main-container  mt-30">
      <h3 className="section-header d-flex justify-content-center">
        {collection.title}
      </h3>
      <div className="fluid-container-desktop main-container">
        <div className="row">
          {editorPicks.map((pick, index) => (
            <div key={index} className="col-6">
              <div className="position-relative">
                <img src={pick.image} alt="PALLOD" className="zoom-img" />
                <div className="position-absolute editor-pick-caption d-flex flex-column align-items-start">
                  <h5>{pick.title}</h5>
                  <h3>{pick.subtitle}</h3>
                  <NavLink
                    to={pick.url}
                    prefetch="intent"
                    style={{textDecoration: 'none'}}
                  >
                    <button>SHOP NOW</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fluid-container main-container" id="editor-pick-section">
        <div className="row">
          <div className="col-12 mobile-carousal">
            <EditorPickCarousel
              collection={collection}
              primaryDomain={primaryDomain}
              publicStoreDomain={publicStoreDomain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPick;
