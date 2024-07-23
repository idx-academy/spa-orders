import { useEffect, useState } from "react";

// import { useSearchParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import OrdersTabFilterDrawer from "@/containers/dashboard-orders-filter-drawer/DashboardOrdersFilterDrawer";
import useFilteredAdminOrders from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders";
import OrdersTable from "@/containers/tables/orders-table/OrdersTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppDrawer from "@/components/app-drawer/AppDrawer";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/pages/dashboard/dashboard-orders/DashboardOrdersPage.scss";

const DashboardOrdersPage = () => {
  const { filters, filterActions, activeFiltersCount, orders, isLoading } =
    useFilteredAdminOrders();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  console.log(sortFilters);
  console.log(orders);

  const handleCloseFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  const handleOpenFilterDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  useEffect(() => {
    sortFilterActions.applyFilters();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // const [searchParams, setSearchParams] = useSearchParams();

  // const sortOption = searchParams.get("sort");

  // const {
  //   data: adminOrderResponse,
  //   isLoading,
  //   error
  // } = useGetAdminOrdersQuery({
  //   sort: sortOption ?? "createdAt,asc"
  // });

  // console.log(sortOption)

  // console.log(adminOrderResponse);

  // if (error) return <div>Error loading orders</div>;

  // const ordersData = adminOrderResponse?.content ?? [];

  // console.log(ordersData);

  const handleSortChange = (value: string) => {
    sortFilterActions.updateFilterByKey("sort", value);
    sortFilterActions.applyFilters();
  };

  const titleTypography =
    activeFiltersCount > 0 ? (
      <AppTypography
        translationKey="dashboardTabs.orders.filters.titleWithCount"
        translationProps={{
          values: {
            count: activeFiltersCount
          }
        }}
      />
    ) : (
      <AppTypography translationKey="dashboardTabs.orders.filters.title" />
    );

  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-tabs__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.orders.title"
        />
        <AppButton
          variant="dark"
          onClick={handleOpenFilterDrawer}
          data-testid="filter-button"
        >
          {titleTypography}
          <FilterListIcon />
        </AppButton>
      </AppBox>
      <OrdersTable ordersData={orders} onSortChange={handleSortChange} />
      <AppDrawer isOpen={isFilterDrawerOpen} onClose={handleCloseFilterDrawer}>
        <OrdersTabFilterDrawer
          filters={filters}
          filterActions={filterActions}
          activeFiltersCount={activeFiltersCount}
          closeFilterDrawer={handleCloseFilterDrawer}
        />
      </AppDrawer>
    </DashboardTabContainer>
  );
};

export default DashboardOrdersPage;
