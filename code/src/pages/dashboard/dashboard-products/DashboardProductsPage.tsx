import AddIcon from "@mui/icons-material/Add";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import PaginationBlock from "@/containers/pagination-block/PaginationBlock";
import ProductsTable from "@/containers/tables/products-table/ProductsTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import routePaths from "@/constants/routes";
import { useLocaleContext } from "@/context/i18n/I18nProvider";
import usePagination from "@/hooks/use-pagination/usePagination";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";

import "@/pages/dashboard/dashboard-products/DashboardProductsPage.scss";

const DashboardProductsPage = () => {
  const { locale } = useLocaleContext();
  const { page } = usePagination();

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
      <PaginationBlock page={page} totalPages={data?.totalPages} />
    </DashboardTabContainer>
  );
};

export default DashboardProductsPage;
