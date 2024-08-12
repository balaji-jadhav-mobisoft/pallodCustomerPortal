const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
           maxVariantPrice {
             amount
             currencyCode
           }
           minVariantPrice {
             amount
             currencyCode
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
    images(first: 10) {
    nodes {
      url
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
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      image {
     url
     altText
         }
         collection_banner_images: metafield(
              key: "collection_banner_images"
              namespace: "custom"
            ) {
              key
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    id
                    image {
                      url
                    }
                  }
                }
              }
            }
            collection_background_image: metafield(
              key: "collection_background_image"
              namespace: "custom"
            ) {
              key
              reference {
                ... on MediaImage {
                  image {
                    id
                    url
                  }
                }
              }
            }
      description
      descriptionHtml
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
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
      }
    }
  }
`;
