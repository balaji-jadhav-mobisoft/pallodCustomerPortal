import {useEffect, useState} from 'react';
import AddToWishlistButton from '~/AddToWishlistButton';
import RemoveFromWishlistButton from '~/RemoveFromWishlistButton';
import {useRouteLoaderData} from '@remix-run/react';

export default function ProductChecker({
  shopifyProductId,
  customerId,
  product,
  collectionHandle,
  collectionId,
  imageUrl,
  price,
  variantId,
  isPdp,
}) {
  /** @type {RootLoader} */
  const loaderData = useRouteLoaderData('root');
  let customerAppUrl = null;
  let customAppUrl = null;
  if (loaderData) {
    customerAppUrl = loaderData?.customerAppUrl;
    customAppUrl = loaderData?.customAppUrl;
  }

  const [isMatch, setIsMatch] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const CUSTOMER_API_BASE_URL = customerAppUrl;
  const shop = 'Pallodstore';
  const _action = 'GET';

  const [loading, setLoading] = useState(true);

  if (!customerId) {
    return (
      <div>
        {isMatch ? (
          <RemoveFromWishlistButton
            product={product}
            customerId={customerId}
            isPdp={isPdp}
            customAppUrl={customAppUrl}
          />
        ) : (
          <AddToWishlistButton
            product={product}
            customerId={customerId}
            collectionHandle={collectionHandle}
            collectionId={collectionId}
            imageUrl={imageUrl}
            price={price}
            variantId={variantId}
            isPdp={isPdp}
            customAppUrl={customAppUrl}
          />
        )}
      </div>
    );
  }

  // useEffect(()=>{
  // window.location.reload()
  // },[apiData])

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from your custom API
        const formData = new FormData();

        formData.append('customerId', customerId);
        formData.append('shop', shop);
        formData.append('_action', _action);

        const response = await fetch(CUSTOMER_API_BASE_URL, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json(); // Parse the JSON response
        setApiData(data);

        // Check if the product ID matches any ID in the API response
        const productsArray = data.data || [];
        productsArray.map((product) => {
          if (product.productId === shopifyProductId) {
            setIsMatch(true);
          }
          return null;
        });
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [shopifyProductId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (apiData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isMatch ? (
        <RemoveFromWishlistButton
          product={product}
          customerId={customerId}
          isPdp={isPdp}
          customAppUrl={customAppUrl}
        />
      ) : (
        <AddToWishlistButton
          product={product}
          customerId={customerId}
          collectionHandle={collectionHandle}
          collectionId={collectionId}
          imageUrl={imageUrl}
          price={price}
          variantId={variantId}
          isPdp={isPdp}
          customAppUrl={customAppUrl}
        />
      )}
    </div>
  );
}

/** @typedef {LoaderReturnData} RootLoader */
