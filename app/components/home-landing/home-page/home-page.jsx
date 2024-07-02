import React from 'react';
import SalwarSagaCard from '../salwar-saga-card/salwar-saga-card';
import OurCollection from '../our-collection/our-collection';
import WeddingSpecial from '../wedding-special/wedding-special';
import WardrobeFavorites from '../wardrobe-favorites/wardrobe-favorites';
import EditorPick from '../editor-pick/editor-pick';
import DesignerStudio from '../designer-studio/designer-studio';
import ShopByOccasion from '../shop-by-occasion/shop-by-occasion';

const HomePageComponent = ({menu, data, primaryDomain, publicStoreDomain}) => {
  if (!menu || !data || !primaryDomain || !publicStoreDomain) return null;
  return (
    <>
      <SalwarSagaCard
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <OurCollection
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <WeddingSpecial
        collection={data.weddingSpecialCollection}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <WardrobeFavorites
        collection={data.wardrobeWinnersCollection}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <EditorPick
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <DesignerStudio
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <ShopByOccasion
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
    </>
  );
};

export default HomePageComponent;
