import React from 'react';
import TrendingImg1 from '~/assets/trending1.png';
import TrendingImg2 from '~/assets/trending2.png';
import TrendingImg3 from '~/assets/trending3.png';
import TrendingImg4 from '~/assets/trending4.png';
import WardrobeCarousal from '~/components/common/wardrobe-carousal/wardrobe-carousal';

const TrendingLooks = () => {
  // Static images for bottomCollection
  const collection = 'Trending Looks';
  const bottomCollection = [
    {
      src: TrendingImg1,
      hoverSrc: TrendingImg1,
      description: '',
    },
    {
      src: TrendingImg2,
      hoverSrc: TrendingImg2,
      description: '',
    },
    {
      src: TrendingImg3,
      hoverSrc: TrendingImg3,
      description: '',
    },
    {
      src: TrendingImg4,
      hoverSrc: TrendingImg4,
      description: '',
    },
  ];
  return (
    <div>
      <WardrobeCarousal
        wardrobeItems={bottomCollection}
        collection={collection}
        wishList={false}
        trendingLooks={true}
      />
    </div>
  );
};

export default TrendingLooks;
