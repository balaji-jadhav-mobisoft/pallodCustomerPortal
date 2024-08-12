// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
export const COLLECTION_ID_QUERY = `#graphql
query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
    }
  }
`;
