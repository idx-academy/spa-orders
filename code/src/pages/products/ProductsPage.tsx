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

  const { data: products, isLoading } = useGetProductsQuery({
    page: page - 1,
    size: 10
  });

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const pagesCount = products?.totalPages;
  const productsCount = products?.totalItems ?? 0;

  //@TODO Create Skeleton for product items
  const productCards = products?.content?.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const paginationBlock = Boolean(pagesCount) && (
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
