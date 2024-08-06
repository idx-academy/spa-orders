import { skipToken } from "@reduxjs/toolkit/query/react";
import { useEffect, useRef, useState } from "react";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import { useGetUserProductsBySearchQuery } from "@/store/api/productsApi";
import { GetUserProductsBySearchQueryResponse } from "@/types/product.types";

const RESULTS_PER_PAGE = 10;
const MIN_QUERY_LENGTH = 4;
const DEBOUNCE_DELAY_MS = 500;

const useInfiniteSearch = (query: string) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchProducts, setSearchProducts] =
    useState<GetUserProductsBySearchQueryResponse>();
  const isLastPageRef = useRef(false);
  const isResettingRef = useRef(false);

  const { locale } = useLocaleContext();

  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_DELAY_MS);

  const queryParameters =
    debouncedQuery.length >= MIN_QUERY_LENGTH && !isResettingRef.current
      ? {
          searchQuery: debouncedQuery,
          lang: locale,
          page: currentPage,
          size: RESULTS_PER_PAGE
        }
      : skipToken;

  const { data, isLoading, isError } =
    useGetUserProductsBySearchQuery(queryParameters);

  useEffect(() => {
    if (data?.content) {
      setSearchProducts((prev) =>
        prev ? { ...data, content: [...prev.content, ...data.content] } : data
      );
      isLastPageRef.current = data.last;
    }
  }, [data?.content]);

  useEffect(() => {
    if (isResettingRef.current) {
      isResettingRef.current = false;
    }
    setCurrentPage(0);
    setSearchProducts(undefined);
  }, [debouncedQuery]);

  const loadNextPage = () => {
    if (!isLastPageRef.current) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const resetSearch = () => {
    isResettingRef.current = true;
    setCurrentPage(0);
    setSearchProducts(undefined);
  };

  return {
    searchProducts,
    isLoading,
    isError,
    loadNextPage,
    resetSearch
  };
};

export default useInfiniteSearch;
