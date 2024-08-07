import { ChangeEvent, useState } from "react";
import { useIntl } from "react-intl";

import FilterListIcon from "@mui/icons-material/FilterList";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import DashboardOrdersFilterDrawer from "@/containers/dashboard-orders-filter-drawer/DashboardOrdersFilterDrawer";
import useFilteredAdminOrders from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders";
import PaginationBlock from "@/containers/pagination-block/PaginationBlock";
import OrdersTable from "@/containers/tables/orders-table/OrdersTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppDrawer from "@/components/app-drawer/AppDrawer";
import AppSearchInput from "@/components/app-search-input/AppSearchInput";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/pages/dashboard/dashboard-orders/DashboardOrdersPage.scss";

const DashboardOrdersPage = () => {
  const {
    filters,
    filterActions,
    searchActions,
    searchFilters,
    activeFiltersCount,
    orders,
    page,
    totalPages,
    isLoading
  } = useFilteredAdminOrders();

  const { applyFilters, resetFilterByKey, updateFilterByKey } = searchActions;

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const { formatMessage } = useIntl();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateFilterByKey("accountEmail", value);
  };

  const handleClearSearch = () => {
    resetFilterByKey("accountEmail");
    applyFilters();
  };

  const handleSearch = () => {
    applyFilters({ additionalParams: { page: "1" } });
  };

  const handleCloseFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  const handleOpenFilterDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const titleTypography =
    activeFiltersCount > 0 ? (
      <AppTypography
        translationKey="dashboardTabs.orders.filters.titleWithCount"
        data-cy="applied-filters-count"
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
      <AppBox
        className="dashboard-orders-tab__toolbar"
        data-cy="dashboard-orders-tab-content"
      >
        <AppTypography
          component="h1"
          variant="h3"
          data-cy="orders-tab"
          translationKey="dashboardTabs.orders.title"
        />
        <AppBox className="dashboard-orders-tab__toolbar-filter-icons">
          <AppSearchInput
            placeholder={formatMessage({ id: "dashboardTabs.orders.search" })}
            value={searchFilters.accountEmail}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onSearch={handleSearch}
          />
          <AppButton
            variant="dark"
            onClick={handleOpenFilterDrawer}
            data-testid="filter-button"
            data-cy="filter-button"
          >
            {titleTypography}
            <FilterListIcon />
          </AppButton>
        </AppBox>
      </AppBox>
      <OrdersTable ordersData={orders} />
      <AppDrawer isOpen={isFilterDrawerOpen} onClose={handleCloseFilterDrawer}>
        <DashboardOrdersFilterDrawer
          filters={filters}
          filterActions={filterActions}
          activeFiltersCount={activeFiltersCount}
          closeFilterDrawer={handleCloseFilterDrawer}
        />
      </AppDrawer>
      <PaginationBlock page={page} totalPages={totalPages} />
    </DashboardTabContainer>
  );
};

export default DashboardOrdersPage;
