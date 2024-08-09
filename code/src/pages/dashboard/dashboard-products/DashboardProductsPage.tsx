import { useSearchParams } from "react-router-dom";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";
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
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  if (isLoading) {
    return <PageLoadingFallback />;
  }

  // @TODO: replace with actual error fallback
  if (error) {
    return <div>Error occured! Please try again later!</div>;
  }

  const products = data?.content ?? [];

  return (
    <DashboardTabContainer>
      <DashboardProductsHeader
        onSearch={handleSearchChange}
        defaultValue={searchValue}
      />
      <ProductsTable products={products} />
      <PaginationBlock page={page} totalPages={data?.totalPages} />
    </DashboardTabContainer>
  );
};

export default DashboardProductsPage;
