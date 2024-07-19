import { SyntheticEvent } from "react";

import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import FilterRecordAccordion from "@/containers/dashboard-tabs/components/filter-record-accordion/FilterRecordAccordion";
import { OrderFilters } from "@/containers/dashboard-tabs/hooks/use-filtered-admin-orders/useFilteredAdminOrders";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppRangeSlider from "@/components/app-range-slider/AppRangeSlider";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import { deliveryMethods } from "@/constants/deliveryMethods";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { FilterActions } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";
import { ExtractSetValue } from "@/types/common";
import { DeliveryMethod } from "@/types/delivery.types";
import { OrderStatus } from "@/types/order.types";

import "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer.scss";

type OrdersTabFilterDrawerProps = {
  filtersTitleTranslationProps: {
    values: {
      count: number;
    };
  };
  filters: OrderFilters;
  filterActions: FilterActions<OrderFilters>;
  closeFilterDrawer: () => void;
};

type FiltersWithSets = Pick<OrderFilters, "deliveryMethods" | "statuses">;

const OrdersTabFilterDrawer = ({
  filtersTitleTranslationProps,
  filters,
  filterActions,
  closeFilterDrawer
}: OrdersTabFilterDrawerProps) => {
  const {
    applyFilters,
    checkFilterActive,
    resetFilterByKey,
    updateFilterByKey,
    resetFilters
  } = filterActions;

  const handleCheckboxListChange =
    <Key extends keyof FiltersWithSets>(
      key: Key,
      value: ExtractSetValue<FiltersWithSets[Key]>
    ) =>
    (event: SyntheticEvent, checked: boolean) => {
      const filtersSet = new Set(filters[key]);

      if (checked) {
        filtersSet.add(value);
      } else {
        filtersSet.delete(value);
      }

      updateFilterByKey(key, filtersSet as OrderFilters[Key]);
    };

  const deliveryMethodsCheckboxes = Object.entries(deliveryMethods).map(
    ([deliveryMethodKey, deliveryMethod]) => (
      <AppBox key={deliveryMethodKey}>
        <AppCheckbox
          checked={filters.deliveryMethods.has(
            deliveryMethodKey as DeliveryMethod
          )}
          onChange={handleCheckboxListChange(
            "deliveryMethods",
            deliveryMethodKey as DeliveryMethod
          )}
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

  const isDeliveryMethodFilterActive = checkFilterActive("deliveryMethods");

  const handleDeliveryMethodFilterReset = () => {
    resetFilterByKey("deliveryMethods");
  };

  const orderStatusesCheckboxes = Object.entries(
    orderStatusesTranslationKeys
  ).map(([status, translationKey]) => (
    <AppCheckbox
      key={translationKey}
      checked={filters.statuses.has(status as OrderStatus)}
      onChange={handleCheckboxListChange("statuses", status as OrderStatus)}
      variant="dark"
      labelTranslationKey={translationKey}
    />
  ));

  const isOrdersStatusFilterActive = checkFilterActive("statuses");

  const handleOrderStatusFilterReset = () => {
    resetFilterByKey("statuses");
  };

  const handlePriceRangeChange = (event: Event, value: number[]) => {
    updateFilterByKey("price", { start: value[0], end: value[1] });
  };

  const isPriceFilterActive = checkFilterActive("price");

  const handlePriceFilterReset = () => {
    resetFilterByKey("price");
  };

  const isPaidFilterActive = checkFilterActive("isPaid");

  const handleIsPaidFilterReset = () => {
    resetFilterByKey("isPaid");
  };

  const handleIsPaidChange = (event: SyntheticEvent, checked: boolean) => {
    updateFilterByKey("isPaid", checked);
  };

  const activeFiltersCount = filtersTitleTranslationProps.values.count;

  const resetFiltersButton = activeFiltersCount > 0 && (
    <AppTooltip
      placement="bottom"
      titleTranslationKey="dashboardTabs.orders.filters.clearAllFiltersTooltip"
      className="order-tab-filters__clear-filters-tooltip"
    >
      <AppBadge badgeContent={activeFiltersCount} size="small">
        <AppIconButton onClick={resetFilters}>
          <FilterListOffIcon />
        </AppIconButton>
      </AppBadge>
    </AppTooltip>
  );

  const handleApplyFilters = () => {
    applyFilters();
    closeFilterDrawer();
  };

  return (
    <AppBox className="order-tab-filters">
      <AppBox className="order-tab-filters__header">
        <AppTypography
          variant="subtitle2"
          translationKey="dashboardTabs.orders.filters.title"
          component="h2"
          fontWeight="extra-bold"
        />
        {resetFiltersButton}
      </AppBox>
      <AppBox className="order-tab-filters__items">
        <FilterRecordAccordion
          isFilterActive={isDeliveryMethodFilterActive}
          resetFilter={handleDeliveryMethodFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.deliveryMethod"
        >
          {deliveryMethodsCheckboxes}
        </FilterRecordAccordion>
        <FilterRecordAccordion
          isFilterActive={isOrdersStatusFilterActive}
          resetFilter={handleOrderStatusFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.status"
        >
          {orderStatusesCheckboxes}
        </FilterRecordAccordion>
        <FilterRecordAccordion
          isFilterActive={isPriceFilterActive}
          resetFilter={handlePriceFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.price"
        >
          <AppRangeSlider
            value={[filters.price.start, filters.price.end]}
            onChange={handlePriceRangeChange}
          />
        </FilterRecordAccordion>
        <FilterRecordAccordion
          isFilterActive={isPaidFilterActive}
          resetFilter={handleIsPaidFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.other"
        >
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
