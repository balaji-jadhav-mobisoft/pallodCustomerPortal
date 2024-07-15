import {defer, redirect} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import MainCollectionComponent from '~/components/collection-components/main-collection-component/main-collection-component';
import {useEffect, useState} from 'react';
import Loader from '~/components/common/loader/loader';
import {COLLECTION_QUERY} from '~/lib/single-collection-by-handle';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader(args) {
  try {
    const criticalData = await loadCriticalData(args);
    return defer({...criticalData});
  } catch (error) {
    console.error('Error loading collection:', error);
    throw error;
  }
}

async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  const searchParams = new URL(request.url).searchParams;
  const sortParam = searchParams.get('sort');
  const filterParam = searchParams.get('filter');

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
    pageBy: 10,
  });

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

export default function Collection() {
  const {collection} = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleSortChange = async (sortBy) => {
    setIsLoading(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', sortBy);
    navigate(`?${newSearchParams.toString()}`, {replace: true});
    setIsOpen(false);
  };

  const handleFilterChange = async (filters) => {
    setIsLoading(filters.length > 0);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('filter', JSON.stringify(filters));
    navigate(`?${newSearchParams.toString()}`, {replace: true});
    setIsOpen(false);
  };

  useEffect(() => {
    // Remove 'sort' parameter on initial load
    if (initialLoad) {
      const urlParams = new URLSearchParams(searchParams);
      if (urlParams.has('sort')) {
        urlParams.delete('sort');
        const newUrl = `${location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      }
      setInitialLoad(false);
    }
  }, [initialLoad, searchParams, location.pathname]);

  useEffect(() => {
    // Reset loading state when searchParams change
    if (isLoading) {
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
