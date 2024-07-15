import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer.scss";

const OrdersTabFilterDrawer = () => {
  return (
    <AppBox className="order-tab-filters">
      <AppBox className="order-tab-filters__header">
        <AppTypography
          variant="subtitle2"
          translationKey="dashboardTabs.orders.filters.title"
          component="h2"
          fontWeight="extra-bold"
        />
      </AppBox>
      <AppBox className="order-tab-filters__items">
        {/* @TODO: add filter records */}
      </AppBox>
      <AppBox className="order-tab-filters__footer">
        <AppButton fullWidth>
          <AppTypography translationKey="dashboardTabs.orders.filters.applyFiltersButton" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default OrdersTabFilterDrawer;
