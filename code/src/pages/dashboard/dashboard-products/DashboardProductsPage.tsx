import { useSearchParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import ProductsTable from "@/containers/tables/products-table/ProductsTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppPagination from "@/components/app-pagination/AppPagination";
import AppTypography from "@/components/app-typography/AppTypography";

import routePaths from "@/constants/routes";
import { useLocaleContext } from "@/context/i18n/I18nProvider";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";
import validatePage from "@/utils/validate-page/validatePage";

import "@/pages/dashboard/dashboard-products/DashboardProductsPage.scss";

const DashboardProductsPage = () => {
  const { locale } = useLocaleContext();

  const [searchParams] = useSearchParams();

  const searchParamsPage = searchParams.get("page");
  const page = validatePage(searchParamsPage);

  const { data, isLoading, error } = useGetManagerProductsQuery({
    page: page - 1,
    size: 8,
    lang: locale,
    sort: ["createdAt,desc"]
  });

  // @TODO: replace with actual loading fallback
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // @TODO: replace with actual error fallback
  if (error) {
    return <div>Error occured! Please try again later!</div>;
  }

  const products = data?.content ?? [];

  const pagesCount = data?.totalPages ?? 1;

  const paginationBlock = pagesCount > 1 && (
    <AppContainer className="dashboard-products-tab__pagination">
      <AppPagination page={page} count={pagesCount} size="large" />
    </AppContainer>
  );

  return (
    <DashboardTabContainer>
      <AppBox
        className="dashboard-products-tab__toolbar"
        data-cy="dashboard-products-tab-content"
      >
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.products.label"
        />
        <AppButton
          data-cy="new-product-button"
          variant="contained"
          to={routePaths.dashboard.products.new.path}
        >
          <AddIcon />
          <AppTypography translationKey="dashboardTabs.addProduct.label" />
        </AppButton>
      </AppBox>
      <ProductsTable products={products} />
      {paginationBlock}
    </DashboardTabContainer>
  );
};

export default DashboardProductsPage;
