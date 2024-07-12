import {defer, redirect} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
// import '~/components/common/collection-components/collection.css';
import MainCollectionComponent from '~/components/collection-components/main-collection-component/main-collection-component';
import {useEffect, useState} from 'react';
import Loader from '~/components/common/loader/loader';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  try {
    const criticalData = await loadCriticalData(args);

    return defer({...criticalData});
  } catch (error) {
    console.error('Error loading collection:', error);
    throw error;
  }
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const searchParams = new URL(request.url).searchParams;
  const sortParam = searchParams.get('sort');
  const filterParam = searchParams.get('filter');

  console.log(sortParam, 'sort');
  let filters = [];
  let sortKey = 'CREATED';
  let reverse = true;
  switch (sortParam) {
    case 'High to Low':
      sortKey = 'PRICE';
      reverse = true;
      break;
    case 'Low to High':
      sortKey = 'PRICE';
      reverse = false;
      break;
    case 'Best Seller':
      filters.push({tag: 'Best Seller'});
      break;
    case 'On Sale':
      filters.push({tag: 'On Sale'});
      break;
    case 'new':
      filters.push({tag: 'New'});
      break;
    default:
      break;
  }

  if (filterParam) {
    const additionalFilters = JSON.parse(filterParam);
    filters = [...filters, ...additionalFilters];
  }
  if (!handle) {
    throw redirect('/collections');
  }
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables, filters, sortKey, reverse},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */

export default function Collection() {
  const {collection} = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleSortChange = async (sortBy) => {
    try {
      setIsLoading(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('sort', sortBy);
      navigate(`?${newSearchParams.toString()}`);
      setIsOpen(false);
    } catch (error) {
      console.error('Error handling sort change:', error);
      setIsLoading(false);
    }
  };
  const handleFilterChange = async (filters) => {
    try {
      if (filters.length > 0) {
        setIsLoading(true);
      }
      const newSearchParams1 = new URLSearchParams(searchParams);
      newSearchParams1.set('filter', JSON.stringify(filters));
      navigate(`?${newSearchParams1.toString()}`);
      setIsOpen(false);
    } catch (error) {
      console.error('Error handling filter change:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams && isLoading) {
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="collection-main">
      {isLoading && <Loader />}
      <MainCollectionComponent
        collection={collection}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ImageFragment on Image {
    url
    altText
  }
  fragment MediaFragment on Media {
    ... on ExternalVideo {
      id
      alt
      mediaContentType
      originUrl
      previewImage {
        ...ImageFragment
      }
    }
    ... on MediaImage {
      id
      image {
        url
      }
      mediaContentType
      previewImage {
        ...ImageFragment
      }
      alt
    }
    ... on Video {
      id
      mediaContentType
      previewImage {
        ...ImageFragment
      }
      sources {
        format
        mimeType
        url
      }
      alt
    }
  }
  fragment ProductItem on Product {
    id
    handle
    title
    availableForSale
    descriptionHtml
    description
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          ...ImageFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    media(first: 10) {
      edges {
        node {
          ...MediaFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    options(first: 10) {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    productType
    totalInventory
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    tags
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }

  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $reverse: Boolean
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      metafield(namespace: "custom", key: "collection_banner") {
          namespace
          key
          value
          reference {
            ... on MediaImage {
            image {
            id
            altText
            url
            }
          }
        }
      }
      image {
        ...ImageFragment
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
        filters {
        id
        label
        presentation
        type
        values {
          count
          id
          input
          label
        }
      }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
