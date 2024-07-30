// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/cart
export const CART_QUERY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        product {
        variants(first: 10) {
          edges {
            node {
              id
              availableForSale
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              product{
                availableForSale
                id
                handle
                description
                title
              }
            }
          }
        }
      }
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height

        }
        product {
          handle
          title
          id
          vendor
          options(first: 10) {
          name
          values
        }
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartApiQuery on Cart {
    updatedAt
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      nodes {
        ...CartLine
      }
    }
    cost {
      subtotalAmount {
        ...Money
      }
      totalAmount {
        ...Money
      }
      totalDutyAmount {
        ...Money
      }
      totalTaxAmount {
        ...Money
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }
`;

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
    resource {
    ... on Collection {
      id
      title
      handle
      image {
        url
        
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
      products(first: 10) {
              nodes {
                handle
                description
                descriptionHtml
                id
                title
                images(first: 10) {
                  nodes {
                    url
                  }
                }
              }
            }
    }
  }

  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
      items {
      ...ChildMenuItem
    }
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;

export const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;

export const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;

export const FOOTER_ABOUT_QUERY = `#graphql
  query FooterAbout(
    $handle: String!
    $type: String!
  ) {
    metaobject(handle: { handle: $handle, type: $type }) {
      field(key: "description") {
        value
      }
    }
  }
`;
