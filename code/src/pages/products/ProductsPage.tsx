import { useSearchParams } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import ProductsContainer from "@/containers/products-container/ProductsContainer";

import AppBox from "@/components/app-box/AppBox";
import AppDropdown from "@/components/app-dropdown/AppDropdown";
import AppTypography from "@/components/app-typography/AppTypography";

import { sortOptions } from "@/pages/products/ProductsPage.constants";
import { useGetProductsQuery } from "@/store/api/productsApi";
import categoryFilter from "@/utils/filter-products-by-category/categoryFilter";
import validatePage from "@/utils/validate-page/validatePage";

import "@/pages/products/ProductsPage.scss";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get("sort");

  const categoryType = searchParams.get("category");

  const searchParamsPage = searchParams.get("page");
  const page = validatePage(searchParamsPage);

  const {
    data: productsResponse,
    isLoading,
    isError
  } = useGetProductsQuery({
    page: page - 1,
    size: 10,
    sort: sortOption ?? "recommended"
  });

  const productsList = productsResponse?.content;

  const filteredProductsList = categoryFilter(categoryType, productsList);

  const defaultDropdownText = (
    <AppTypography translationKey="productsDefault.label" />
  );

  const handleSortChange = (value: string) => {
    setSearchParams({ sort: value });
  };

  const productsCount = filteredProductsList?.length ?? 0;

  const productsAllLabels = !categoryType
    ? "productsAll.label"
    : `productsAll.${categoryType}`;

  const productsItemsLabel = !categoryType
    ? "productsItems.label"
    : `productsItems.category.${categoryType}`;

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
            {productsCount}
            <AppTypography
              translationKey={productsItemsLabel}
              component="span"
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
          products={filteredProductsList ?? []}
          loadingItemsCount={10}
          isLoading={isLoading}
          isError={isError}
        />
      </AppBox>
    </PageWrapper>
  );
};

export default ProductsPage;
