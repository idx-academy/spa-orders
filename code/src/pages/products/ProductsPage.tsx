import { useSearchParams } from "react-router-dom";

import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import ProductCard from "@/components/product-card/ProductCard";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import { useGetProductsQuery } from "@/store/api/productsApi";

import AppPagination from "@/components/app-pagination/AppPagination";
import AppContainer from "@/components/app-container/AppContainer";

import "@/pages/products/ProductsPage.scss";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const searchParamsPage = searchParams.get("page");
  const isPageValid = searchParamsPage && !Number.isNaN(searchParamsPage);
  const page = isPageValid ? Number(searchParamsPage) : 1;

  const { data, isLoading } = useGetProductsQuery({
    page,
    itemsPerPage: 10
  });

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const pagesCount = data?.pagesCount;

  //@TODO Create Skeleton for product items
  const productCards = data?.items
    ? data?.items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    : null;

  const paginationBlock = pagesCount ? (
    <AppContainer className="spa-products-page__pagination">
      <AppPagination page={page} count={pagesCount} size="large" />
    </AppContainer>
  ) : null;

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
            {data?.itemsCount}
            <AppTypography
              translationKey="productsItems.label"
              component="span"
            />
          </AppTypography>
          {/**@TODO Create dropdown for sort by */}
          <AppTypography className="spa-products-page__sort" component="span">
            Sort by: Recommended
          </AppTypography>
        </AppBox>
        <AppBox className="spa-products-page__grid">{productCards}</AppBox>
        {paginationBlock}
      </AppBox>
    </PageWrapper>
  );
};

export default ProductsPage;
