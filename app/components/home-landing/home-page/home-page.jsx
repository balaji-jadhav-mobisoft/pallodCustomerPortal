import React from 'react';
import SalwarSagaCard from '../salwar-saga-card/salwar-saga-card';
import OurCollection from '../our-collection/our-collection';
import WeddingSpecial from '../wedding-special/wedding-special';
import WardrobeFavorites from '../wardrobe-favorites/wardrobe-favorites';
import EditorPick from '../editor-pick/editor-pick';
import DesignerStudio from '../designer-studio/designer-studio';
import ShopByOccasion from '../shop-by-occasion/shop-by-occasion';
import EleganceOfSaree from '../elegance-of-saree/elegence-of-saree';
import TrendingKurtis from '../trending-kurtis/trending-kurtis';
import CelebrityMustHave from '../celebrity-must-have/celebrity-must-have';
import DazzlingDecor from '../dazzling-decor/dazzling-decor';

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
      <EleganceOfSaree collection={data.eleganceOfSareeCollection} />

      <TrendingKurtis
        collection={data.trendingKurtisCollection}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <CelebrityMustHave
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
      <DazzlingDecor
        collection={data.bottomCollection}
        customerStoriesCollection={data.customerStoriesCollection}
        menu={menu}
        primaryDomain={primaryDomain}
        publicStoreDomain={publicStoreDomain}
      />
    </>
  );
};

export default HomePageComponent;
