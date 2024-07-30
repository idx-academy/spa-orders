import { SyntheticEvent } from "react";

import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { SelectChangeEvent } from "@mui/material/Select";

import FilterRecordAccordion from "@/containers/dashboard-orders-filter-drawer/components/filter-record-accordion/FilterRecordAccordion";
import { AdminOrderFilters } from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders.types";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppRangeSlider from "@/components/app-range-slider/AppRangeSlider";
import AppSelect from "@/components/app-select/AppSelect";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import { deliveryMethods } from "@/constants/deliveryMethods";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { timeSpans } from "@/constants/timeSpans";
import { FilterActions } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";
import { ExtractSetValue, TimeSpan } from "@/types/common";
import { DeliveryMethod } from "@/types/delivery.types";
import { OrderStatus } from "@/types/order.types";

import "@/containers/dashboard-orders-filter-drawer/DashboardOrdersFilterDrawer.scss";

type OrdersTabFilterDrawerProps = {
  activeFiltersCount: number;
  filters: AdminOrderFilters;
  filterActions: FilterActions<AdminOrderFilters>;
  closeFilterDrawer: () => void;
};

type FiltersWithSets = Pick<AdminOrderFilters, "delivery-methods" | "statuses">;

const DashboardOrdersFilterDrawer = ({
  activeFiltersCount,
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

      updateFilterByKey(key, filtersSet as AdminOrderFilters[Key]);
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
      data-cy={`order-${status}-status`}
    />
  ));

  const isOrdersStatusFilterActive = checkFilterActive("statuses");

  const handleTimespanSelectChange = (event: SelectChangeEvent<unknown>) => {
    updateFilterByKey("timespan", event.target.value as TimeSpan);
  };

  const handleOrderStatusFilterReset = () => {
    resetFilterByKey("statuses");
  };

  const timespanSelectNonDefaultOptions = Object.entries(timeSpans).map(
    ([datePeriod, translationKey]) => (
      <AppMenuItem value={datePeriod} key={datePeriod} data-cy={`${datePeriod}-date-select`}>
        <AppTypography translationKey={translationKey} />
      </AppMenuItem>
    )
  );

  const timespanSelect = (
    <AppSelect
      fullWidth
      inputProps={{
        className: "order-tab-filters__date-period-select"
      }}
      displayEmpty
      defaultValue=""
      value={filters.timespan}
      onChange={handleTimespanSelectChange}
      data-cy='creation-date-select'
    >
      <AppMenuItem value="" disabled>
        <AppTypography translationKey="select.defaultOption" />
      </AppMenuItem>
      {timespanSelectNonDefaultOptions}
    </AppSelect>
  );

  const isTimespanFilterActive = checkFilterActive("timespan");

  const handleTimespanFilterReset = () => {
    updateFilterByKey("timespan", "");
    resetFilterByKey("timespan");
  };

  const deliveryMethodsCheckboxes = deliveryMethods.map(
    ({ image, translationKey, value }) => (
      <AppBox key={value}>
        <AppCheckbox
          data-cy={`delivery-method-${value}`}
          checked={filters["delivery-methods"].has(value as DeliveryMethod)}
          onChange={handleCheckboxListChange(
            "delivery-methods",
            value as DeliveryMethod
          )}
          variant="dark"
          labelTranslationKey={translationKey}
          icon={
            <AppBox
              component="img"
              className="order-tab-filters__delivery-method-image"
              src={image}
            />
          }
        />
      </AppBox>
    )
  );

  const isDeliveryMethodFilterActive = checkFilterActive("delivery-methods");

  const handleDeliveryMethodFilterReset = () => {
    resetFilterByKey("delivery-methods");
  };

  const handlePriceRangeChange = (event: Event, value: number[]) => {
    updateFilterByKey("price", { start: value[0], end: value[1] });
  };

  const isPriceFilterActive = checkFilterActive("price");

  const handlePriceFilterReset = () => {
    resetFilterByKey("price");
  };

  const isPaidFilterActive = checkFilterActive("paid");

  const handleIsPaidFilterReset = () => {
    resetFilterByKey("paid");
  };

  const handleIsPaidChange = (event: SyntheticEvent, checked: boolean) => {
    updateFilterByKey("paid", checked);
  };

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
    <AppBox className="order-tab-filters" data-cy="orders-filter-drawer">
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
          isFilterActive={isOrdersStatusFilterActive}
          resetFilter={handleOrderStatusFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.status"
        >
          {orderStatusesCheckboxes}
        </FilterRecordAccordion>
        <FilterRecordAccordion
          isFilterActive={isTimespanFilterActive}
          resetFilter={handleTimespanFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.timespan"
        >
          {timespanSelect}
        </FilterRecordAccordion>
        <FilterRecordAccordion
          isFilterActive={isDeliveryMethodFilterActive}
          resetFilter={handleDeliveryMethodFilterReset}
          sectionCaptionTranslationKey="dashboardTabs.orders.filters.deliveryMethod"
        >
          {deliveryMethodsCheckboxes}
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
            checked={filters.paid}
            onChange={handleIsPaidChange}
            variant="dark"
            labelTranslationKey="dashboardTabs.orders.filters.isPaid"
            data-cy="is-paid-checkbox"
          />
        </FilterRecordAccordion>
      </AppBox>
      <AppBox className="order-tab-filters__footer">
        <AppButton
          fullWidth
          onClick={handleApplyFilters}
          data-cy="apply-filters-button"
        >
          <AppTypography translationKey="dashboardTabs.orders.filters.applyFiltersButton" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default DashboardOrdersFilterDrawer;
