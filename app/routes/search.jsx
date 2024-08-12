import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';

import {SearchForm, SearchResults, NoSearchResults} from '~/components/Search';
import {SearchResult} from '~/components/search/search-result';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `Pallod | Search`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const variables = getPaginationVariables(request, {pageBy: 8});
  const searchTerm = String(searchParams.get('q') || '');

  if (!searchTerm) {
    return {
      searchResults: {results: null, totalResults: 0},
      searchTerm,
    };
  }

  const {errors, ...data} = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: searchTerm,
      ...variables,
    },
  });

  if (!data) {
    throw new Error('No search data returned from Shopify API');
  }

  const totalResults = Object.values(data).reduce((total, value) => {
    return total + value.nodes.length;
  }, 0);

  const searchResults = {
    results: data,
    totalResults,
  };

  return defer({
    searchTerm,
    searchResults,
  });
}

export default function SearchPage() {
  /** @type {LoaderReturnData} */
  const {searchTerm, searchResults} = useLoaderData();

  return (
    <div className="search">
      {/* <SearchForm searchTerm={searchTerm} /> */}
      {!searchTerm || !searchResults.totalResults ? (
        <NoSearchResults />
      ) : (
        // <SearchResults
        //   results={searchResults.results}
        //   searchTerm={searchTerm}
        // />
        <SearchResult results={searchResults.results} searchTerm={searchTerm} />
      )}
      <Analytics.SearchView data={{searchTerm, searchResults}} />
    </div>
  );
}

const SEARCH_QUERY = `#graphql
  fragment ImageFragment on Image {
    url
    altText
  }
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    description
    vendor
    tags
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
    collections(first: 1) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
  query search(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $query: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products: search(
      query: $query,
      unavailableProducts: HIDE,
      types: [PRODUCT],
      first: $first,
      sortKey: RELEVANCE,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    pages: search(
      query: $query,
      types: [PAGE],
      first: 10
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    articles: search(
      query: $query,
      types: [ARTICLE],
      first: 10
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
