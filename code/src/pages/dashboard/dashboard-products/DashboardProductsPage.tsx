import { useSearchParams } from "react-router-dom";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import PaginationBlock from "@/containers/pagination-block/PaginationBlock";
import ProductsTable from "@/containers/tables/products-table/ProductsTable";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import usePagination from "@/hooks/use-pagination/usePagination";
import DashboardProductsHeader from "@/pages/dashboard/dashboard-products/components/dashboard-products-header/DashboardProductsHeader";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";

import "@/pages/dashboard/dashboard-products/DashboardProductsPage.scss";

const DashboardProductsPage = () => {
  const { locale } = useLocaleContext();
  const { page } = usePagination();

  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const searchValue = searchParams.get("search") || undefined;

  const { data, isLoading, error } = useGetManagerProductsQuery({
    page: page - 1,
    size: 8,
    lang: locale,
    sort: ["createdAt,desc"],
    searchByName: searchValue
  });

  const handleSearchChange = (value: string) => {
    setSearchParams({ search: value });
  };

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
      <DashboardProductsHeader onSearch={handleSearchChange} />
      <ProductsTable products={products} />
      <PaginationBlock page={page} totalPages={data?.totalPages} />
    </DashboardTabContainer>
  );
};

export default DashboardProductsPage;
