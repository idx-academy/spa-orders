import { SyntheticEvent } from "react";

import FilterRecordAccordion from "@/containers/dashboard-tabs/components/filter-record-accordion/FilterRecordAccordion";
import { OrderFilters } from "@/containers/dashboard-tabs/components/orders-tab/OrdersTab";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppRangeSlider from "@/components/app-range-slider/AppRangeSlider";
import AppTypography from "@/components/app-typography/AppTypography";
import { TranslationProps } from "@/components/app-typography/AppTypography.types";

import { deliveryMethods } from "@/constants/deliveryMethods";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { useDrawerContext } from "@/context/drawer/DrawerContext";
import { FilterActions } from "@/hooks/use-filters-with-apply/useFiltersWithApply";

import "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer.scss";

type OrdersTabFilterDrawerProps = {
  filtersTitleTranslationProps: TranslationProps;
  filters: OrderFilters;
  filterActions: FilterActions<OrderFilters>;
};

const OrdersTabFilterDrawer = ({
  filtersTitleTranslationProps,
  filters,
  filterActions
}: OrdersTabFilterDrawerProps) => {
  const { closeDrawer } = useDrawerContext();

  const handleApplyFilters = () => {
    filterActions.applyFilters();
    closeDrawer();
  };

  const deliveryMethodsCheckboxes = Object.entries(deliveryMethods).map(
    ([key, deliveryMethod]) => (
      <AppBox key={key}>
        <AppCheckbox
          variant="dark"
          labelTranslationKey={deliveryMethod.translationKey}
          icon={
            <AppBox
              component="img"
              className="order-tab-filters__delivery-method-image"
              src={deliveryMethod.image}
            />
          }
        />
      </AppBox>
    )
  );

  const orderStatusesCheckboxes = Object.values(
    orderStatusesTranslationKeys
  ).map((translationKey) => (
    <AppCheckbox
      key={translationKey}
      variant="dark"
      labelTranslationKey={translationKey}
    />
  ));

  const handleIsPaidChange = (event: SyntheticEvent, checked: boolean) => {
    filterActions.updateFilterByKey("isPaid", checked);
  };

  // @TODO: improve ui
  return (
    <AppBox className="order-tab-filters">
      <AppBox className="order-tab-filters__header">
        <AppTypography
          variant="subtitle2"
          translationKey="dashboardTabs.orders.filters.title"
          translationProps={filtersTitleTranslationProps}
          component="h2"
          fontWeight="extra-bold"
        />
      </AppBox>
      <AppBox className="order-tab-filters__items">
        <FilterRecordAccordion
          isFilterActive
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.deliveryMethod"
        >
          {deliveryMethodsCheckboxes}
        </FilterRecordAccordion>
        <FilterRecordAccordion
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.status"
          isFilterActive
        >
          {orderStatusesCheckboxes}
        </FilterRecordAccordion>
        <FilterRecordAccordion sectionCaptionTranslationKey="dashboardTabs.orders.filters.price">
          <AppRangeSlider />
        </FilterRecordAccordion>
        <FilterRecordAccordion sectionCaptionTranslationKey="dashboardTabs.orders.filters.other">
          <AppCheckbox
            checked={filters.isPaid}
            onChange={handleIsPaidChange}
            variant="dark"
            labelTranslationKey="dashboardTabs.orders.filters.isPaid"
          />
        </FilterRecordAccordion>
      </AppBox>
      <AppBox className="order-tab-filters__footer">
        <AppButton fullWidth onClick={handleApplyFilters}>
          <AppTypography translationKey="dashboardTabs.orders.filters.applyFiltersButton" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default OrdersTabFilterDrawer;
