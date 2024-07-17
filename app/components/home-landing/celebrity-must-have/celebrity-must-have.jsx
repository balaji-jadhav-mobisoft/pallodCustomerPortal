import React from 'react';
import Carousal from '~/components/common/carousal/carousal';

const CelebrityMustHave = ({menu, primaryDomain, publicStoreDomain}) => {
  // Ensure required props are provided
  if (!menu || !menu?.items || !primaryDomain || !publicStoreDomain)
    return null;
  // Find the "Explore Our Collections" item in the menu
  const shopByOccasionCollection = menu?.items.find(
    (item) => item.title === 'Celebratory Must Haves',
  );
  const occasionItems = shopByOccasionCollection?.items.map((item) => {
    if (!item.url) return null;

    return {
      title: item.title.split(' ')[0],
      subTitle: item.title.split(' ')[1],
      src: item.resource.image.url,
      alt: item.title,
      linkText: 'SHOP NOW',
    };
  });

  return (
    <div>
      <Carousal
        occasionItems={occasionItems}
        itemsPerPage={3}
        url={false}
        title={shopByOccasionCollection?.title}
        leftIcon={false}
        rightIcon={false}
      />
    </div>
  );
};

export default CelebrityMustHave;
