import { skipToken } from "@reduxjs/toolkit/query/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import { useGetUserProductsBySearchQuery } from "@/store/api/productsApi";
import { GetUserProductsBySearchQueryResponse } from "@/types/product.types";

type UseInfiniteProductsSearchConfig = {
  query?: string;
  pageSize?: number;
  minQueryLength?: number;
  debounceDelayMs?: number;
};

const useInfiniteProductsSearch = ({
  query = "",
  pageSize = 8,
  minQueryLength = 3,
  debounceDelayMs = 500
}: UseInfiniteProductsSearchConfig = {}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchProducts, setSearchProducts] =
    useState<GetUserProductsBySearchQueryResponse>();
  const isLastPageRef = useRef(false);

  const { locale } = useLocaleContext();

  const debouncedQuery = useDebouncedValue(query, debounceDelayMs);

  const queryParameters =
    debouncedQuery.length >= minQueryLength
      ? {
          searchQuery: debouncedQuery,
          lang: locale,
          page: currentPage,
          size: pageSize
        }
      : skipToken;

  const { data, isLoading, isError } =
    useGetUserProductsBySearchQuery(queryParameters);

  const resetSearch = useCallback(() => {
    setCurrentPage(0);
    setSearchProducts(undefined);
  }, []);

  useEffect(() => {
    resetSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    if (data) {
      setSearchProducts((prev) => {
        const wasSearchReset = prev !== undefined;

        return wasSearchReset
          ? { ...data, content: [...prev.content, ...data.content] }
          : data;
      });
      isLastPageRef.current = data.last;
    }
  }, [data]);

  const loadNextPage = () => {
    if (!isLastPageRef.current) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return {
    searchProducts,
    isLoading,
    isError,
    loadNextPage,
    resetSearch
  } as const;
};
export default useInfiniteProductsSearch;
