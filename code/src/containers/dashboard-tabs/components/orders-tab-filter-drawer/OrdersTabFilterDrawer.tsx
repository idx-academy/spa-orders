import FilterRecordAccordion from "@/containers/dashboard-tabs/components/filter-record-accordion/FilterRecordAccordion";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppRangeSlider from "@/components/app-range-slider/AppRangeSlider";
import AppTypography from "@/components/app-typography/AppTypography";
import { TranslationProps } from "@/components/app-typography/AppTypography.types";

import { deliveryMethods } from "@/constants/deliveryMethods";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { useDrawerContext } from "@/context/drawer/DrawerContext";

import "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer.scss";

type OrdersTabFilterDrawerProps = {
  filtersTitleTranslationProps: TranslationProps;
};

const OrdersTabFilterDrawer = ({
  filtersTitleTranslationProps
}: OrdersTabFilterDrawerProps) => {
  const { closeDrawer } = useDrawerContext();

  const handleApplyFilters = () => {
    // @TODO: add logic of applying filters
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
