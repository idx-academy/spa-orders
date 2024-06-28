import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import ProductCard from "@/components/product-card/ProductCard";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppDropdown from "@/components/app-dropdown/AppDropdown";

import { sortOptions } from "@/pages/products/ProductsPage.constants";
import { Product } from "@/types/product.types";
import { useGetProductsQuery } from "@/store/api/productsApi";

import AppPagination from "@/components/app-pagination/AppPagination";
import AppContainer from "@/components/app-container/AppContainer";

import "@/pages/products/ProductsPage.scss";

const ProductsPage = () => {
  const [sortOption, setSortOption] = useState("");
  const [searchParams] = useSearchParams();

  const searchParamsPage = searchParams.get("page");
  const isPageValid = searchParamsPage && !Number.isNaN(searchParamsPage);
  const page = isPageValid ? Number(searchParamsPage) : 1;

  const { data: products, isLoading } = useGetProductsQuery({
    page: page - 1,
    size: 10,
    sort: sortOption
  });

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const pagesCount = products?.totalPages;
  const productsCount = products?.totalItems ?? 0;

  const productCards = products?.content?.map((product: Product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const paginationBlock = Boolean(pagesCount) && (
    <AppContainer className="spa-products-page__pagination">
      <AppPagination page={page} count={pagesCount} size="large" />
    </AppContainer>
  );

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const defaultDropdownText = (
    <AppTypography translationKey="productsDefault.label" />
  );

  return (
    <PageWrapper>
      <AppBox className="spa-products-page">
        <AppTypography
          variant="h3"
          className="spa-products-page__header"
          translationKey="productsAll.label"
          component="h1"
        />
        <AppBox className="spa-products-page__info">
          <AppTypography className="spa-products-page__count" component="span">
            {productsCount}
            <AppTypography
              translationKey="productsItems.label"
              component="span"
            />
          </AppTypography>
          <AppDropdown
            options={sortOptions}
            onSelect={handleSortChange}
            defaultLabel={defaultDropdownText}
            className="spa-products-page__sort"
          />
        </AppBox>
        <AppBox className="spa-products-page__grid">{productCards}</AppBox>
        {paginationBlock}
      </AppBox>
    </PageWrapper>
  );
};

export default ProductsPage;
