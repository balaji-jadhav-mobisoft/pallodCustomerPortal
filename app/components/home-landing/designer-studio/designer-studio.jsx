import React, {useEffect, useState} from 'react';
import './designer-studio.css'; // Make sure to include the necessary CSS
import PallodVideo from '~/assets/pallod-video.mov';
import {NavLink} from '@remix-run/react';

const DesignerStudio = ({menu, primaryDomain, publicStoreDomain}) => {
  // Ensure required props are provided
  if (!menu || !menu?.items || !primaryDomain || !publicStoreDomain)
    return null;
  const [isResponsive, setIsResponsive] = useState(false);

  // Find the "Explore Our Collections" item in the menu
  const designerCollection = menu?.items.find(
    (item) => item.title === 'Designer’s Studio',
  );
  const individualDesignerCollection = menu?.items.find(
    (item) => item.title === 'Individual Designer’s Studio',
  );
  if (!designerCollection || !individualDesignerCollection) return null;

  const designerStudioItems = designerCollection?.items.map((item, index) => {
    if (!item.url) return null;

    return {
      title: item.resource.title,
      subtitle: item.title,
      colClass: 'col-4 designer-scrollable',
      src: item.resource.image.url,
      key: `designer-${index}`,
    };
  });

  const individualDesignerCollectionItems =
    individualDesignerCollection?.items.map((item, index) => {
      if (!item.url) return null;
      // Determine the URL path for the collection item
      const url =
        item.url.includes('myshopify.com') ||
        item.url.includes(publicStoreDomain) ||
        item.url.includes(primaryDomain)
          ? new URL(item.url).pathname
          : item.url;

      return {
        title: item.resource.title,
        subtitle: item.title,
        colClass: 'col-12 col-md-6',
        src: item.resource.image.url,
        url: url,
        key: `individual-${index}`,
      };
    });

  // Determine the URL path for the collection item
  const designerCollectionUrl =
    designerCollection.url.includes('myshopify.com') ||
    designerCollection.url.includes(publicStoreDomain) ||
    designerCollection.url.includes(primaryDomain)
      ? new URL(designerCollection.url).pathname
      : designerCollection.url;

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderItems = (items) =>
    items.map((item) => (
      <div
        key={item.key}
        className={`${item.colClass} collection-img-container`}
      >
        <div className="img-wrapper">
          <img src={item.src} alt={item.alt} className="zoom-img" />
          <div
            className={`img-caption d-flex flex-column ${item.textAlign || ''}`}
          >
            <div>{item.title}</div>
            <div className="fs-16">{item.subtitle}</div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="designer-studio-main-container">
        <div className="d-flex designer-studio-header-sec mb-3 position-relative align-items-center">
          <div className="section-header mb-0">Designer's Studio</div>
          <NavLink
            to={designerCollectionUrl}
            prefetch="intent"
            style={{textDecoration: 'none'}}
            className="position-absolute view-all-btn designer-studio-view-all"
          >
            VIEW ALL
          </NavLink>
        </div>
        <div
          className="fluid-container main-container"
          style={{marginBottom: '30px'}}
          id="designerStudio"
        >
          <div className="row" id="designerStudioItems">
            {!isResponsive && renderItems(designerStudioItems)}
            {!isResponsive && renderItems(individualDesignerCollectionItems)}
          </div>

          {/* responsive part */}
          {isResponsive && (
            <>
              <div id="responsiveDesignerItems">
                {renderItems(designerStudioItems)}
              </div>
              <div className="row" id="responsiveDesignerItemsGrid">
                {renderItems(individualDesignerCollectionItems, true)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="video-banner1">
        <video controls className="col-12 col-md-12">
          <source src={PallodVideo} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default DesignerStudio;
