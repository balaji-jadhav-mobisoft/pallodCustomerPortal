import React, {useEffect, useState} from 'react';
import TrendingImg1 from '~/assets/trending1.png';
import TrendingImg2 from '~/assets/trending2.png';
import TrendingImg3 from '~/assets/trending3.png';
import TrendingImg4 from '~/assets/trending4.png';
import {INSTAGRAM_ACCESS_TOKEN} from '~/components/common/common-constants';
import Loader from '~/components/common/loader/loader';
import TrendingLookCarousal from '~/components/common/trending-look-carousal/trending-look-carousal';

const TrendingLooks = () => {
  const collection = 'Trending Looks';

  const [trendingLook, setTrendingLook] = useState([]);
  const [loading, setLoading] = useState(true);

  const TrendingLookMedia = async () => {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type=VIDEO,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
        {
          method: 'GET',
        },
      );

      const json = await response.json();
      const trending = json?.data?.map((item) => ({
        src: item.thumbnail_url,
        hoverSrc: item.thumbnail_url,
        instagramLink: item.permalink,
      }));
      setTrendingLook(trending);
    } catch (error) {
      console.error('Error fetching Instagram media:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    TrendingLookMedia();
  }, []);
  console.log(trendingLook, 'trendingLook');
  return (
    <div>
      {loading ? (
        ''
      ) : (
        <TrendingLookCarousal
          trendingLookItems={trendingLook}
          collection={collection}
        />
      )}
    </div>
  );
};

export default TrendingLooks;
