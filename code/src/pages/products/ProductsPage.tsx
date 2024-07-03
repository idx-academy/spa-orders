import { useSearchParams } from "react-router-dom";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import ProductCard from "@/components/product-card/ProductCard";
import AppDropdown from "@/components/app-dropdown/AppDropdown";
import AppPagination from "@/components/app-pagination/AppPagination";
import AppContainer from "@/components/app-container/AppContainer";
import { sortOptions } from "@/pages/products/ProductsPage.constants";
import { useGetProductsQuery } from "@/store/api/productsApi";

import "@/pages/products/ProductsPage.scss";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get("sort") || "";

  const searchParamsPage = searchParams.get("page");
  const isPageValid = searchParamsPage && !Number.isNaN(searchParamsPage);
  const page = isPageValid ? Number(searchParamsPage) : 1;

  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({
      page: page - 1,
      size: 8,
      sort: sortOption
    });

  const defaultDropdownText = (
    <AppTypography translationKey="productsDefault.label" />
  );

  const productCards = productsResponse?.content?.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const handleSortChange = (value: string) => {
    setSearchParams({ sort: value });
  };

  if (productsLoading) return <AppTypography>Loading...</AppTypography>;

  const pagesCount = productsResponse?.totalPages ?? 1;
  const productsCount = productsResponse?.totalElements ?? 0;

  const paginationBlock = pagesCount > 1 && (
    <AppContainer className="spa-products-page__pagination">
      <AppPagination page={page} count={pagesCount} size="large" />
    </AppContainer>
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
