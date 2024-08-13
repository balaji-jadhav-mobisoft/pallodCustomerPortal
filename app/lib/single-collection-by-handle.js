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
        id
        selectedOptions {
          name
          value
        }
      }
    }

  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
export const COLLECTION_QUERY = `#graphql
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
