import {Suspense} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData, useLocation} from '@remix-run/react';
import {
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
  Analytics,
  useAnalytics,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/lib/variants';
import {useAside} from '~/components/Aside';
import ProductDetails from '~/components/product-details/product-details';
import {BLOGS_QUERY} from '~/lib/productBlogs';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  const recommendedProducts = await storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
    {
      variables: {productId: product?.id},
    },
  );

  const shippingReturnBlog = await storefront.query(BLOGS_QUERY, {
    variables: {handle: 'shipping-returns'},
  });
  const faqBlog = await storefront.query(BLOGS_QUERY, {
    variables: {handle: 'product-details-faq'},
  });

  return {
    product,
    recommendedProducts,
    shippingReturnBlog,
    faqBlog,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context, params}) {
  const variants = context.storefront
    .query(VARIANTS_QUERY, {
      variables: {handle: params.handle},
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    variants,
  };
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];
  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, variants, recommendedProducts, shippingReturnBlog, faqBlog} =
    useLoaderData();
  const {selectedVariant} = product;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const collectionHandle = searchParams.get('collectionHandle');

  return (
    <>
      <div className="collection-main">
        <ProductDetails
          product={product}
          variants={variants}
          selectedVariant={selectedVariant}
          recommendedProducts={recommendedProducts}
          collectionHandle={collectionHandle}
          shippingReturnBlog={shippingReturnBlog}
          faqBlog={faqBlog}
        />
      </div>
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    taxable
    price {
      amount
      currencyCode
    }
    product {
            availableForSale
            description
            descriptionHtml
            id
            images(first: 10) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            productType
            title
            tags
            totalInventory
            vendor
          }
    selectedOptions {
      name
      value
    }
    weight
    weightUnit
    sku
    title
    quantityAvailable
    currentlyNotInStock
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    totalInventory
    images(first: 10) {
      nodes {
        altText
        url
      }
    }
    descriptionHtml
    description
    options {
      name
      values
    }
    product_work: metafield(key: "product_work", namespace: "custom") {
      value
    }
    manufactured_packed_by: metafield(
      key: "manufactured_packed_by"
      namespace: "custom"
    ) {
      value
    }
    product_care: metafield(key: "product_care", namespace: "custom") {
      value
    }
    product_note: metafield(key: "product_note", namespace: "custom") {
      value
    }
    size_fit: metafield(key: "size_fit", namespace: "custom") {
      value
    }
    productType
    tags
    metafield(namespace: "custom", key: "size_guide_file_") {
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
    availableForSale
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 10) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    vendor
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
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    availableForSale
    images(first: 10) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    tags
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode, $productId: ID!)
    @inContext(country: $country, language: $language) {
      productRecommendations(productId: $productId, intent: RELATED) {
        ...RecommendedProduct
        handle
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
