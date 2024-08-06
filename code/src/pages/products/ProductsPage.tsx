import { useSearchParams } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import PaginationBlock from "@/containers/pagination-block/PaginationBlock";
import ProductsContainer from "@/containers/products-container/ProductsContainer";

import AppBox from "@/components/app-box/AppBox";
import AppDropdown from "@/components/app-dropdown/AppDropdown";
import AppTypography from "@/components/app-typography/AppTypography";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import usePagination from "@/hooks/use-pagination/usePagination";
import { sortOptions } from "@/pages/products/ProductsPage.constants";
import { useGetUserProductsQuery } from "@/store/api/productsApi";

import "@/pages/products/ProductsPage.scss";

const ProductsPage = () => {
  const { locale } = useLocaleContext();
  const { page } = usePagination();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get("sort");

  const categoryType = searchParams.get("category");

  const {
    data: productsResponse,
    isLoading,
    isError
  } = useGetUserProductsQuery({
    tags: categoryType ? `category:${categoryType}` : "",
    page: page - 1,
    size: 10,
    sort: sortOption ?? "recommended",
    lang: locale
  });

  const productsList = productsResponse?.content;

  const defaultDropdownText = (
    <AppTypography translationKey="productsDefault.label" />
  );

  const handleSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const productsAllLabels = !categoryType
    ? "productsAll.label"
    : `productsAll.${categoryType}`;

  const productsItemsLabel = !categoryType
    ? "productsItems.label"
    : `productsItems.category.${categoryType}`;

  const productsCount = productsResponse?.totalElements ?? 0;

  return (
    <PageWrapper>
      <AppBox className="spa-products-page" data-cy="products-page">
        <AppTypography
          variant="h3"
          className="spa-products-page__header"
          translationKey={productsAllLabels}
          component="h1"
        />
        <AppBox className="spa-products-page__info">
          <AppTypography className="spa-products-page__count" component="span">
            <AppTypography
              translationKey={productsItemsLabel}
              component="span"
              translationProps={{ values: { count: productsCount } }}
            />
          </AppTypography>
          <AppDropdown
            options={sortOptions}
            onSelect={handleSortChange}
            defaultLabel={defaultDropdownText}
            className="spa-products-page__sort"
            data-cy="products-dropdown"
          />
        </AppBox>
        <ProductsContainer
          className="spa-products-page__grid"
          products={productsList ?? []}
          loadingItemsCount={10}
          isLoading={isLoading}
          isError={isError}
        />
        <PaginationBlock
          page={page}
          totalPages={productsResponse?.totalPages}
        />
      </AppBox>
    </PageWrapper>
  );
};

export default ProductsPage;
