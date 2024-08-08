import { ChangeEvent, useState } from "react";
import { useIntl } from "react-intl";

import AddIcon from "@mui/icons-material/Add";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppSearchInput from "@/components/app-search-input/AppSearchInput";
import AppTypography from "@/components/app-typography/AppTypography";

import routes from "@/constants/routes";
import { DashboardProductsHeaderProps } from "@/pages/dashboard/dashboard-products/DashboardProductsPage.types";

const DashboardProductsHeader = ({
  onSearch,
  defaultValue = ""
}: DashboardProductsHeaderProps) => {
  const [searchValue, setSearchValue] = useState(defaultValue);

  const { formatMessage } = useIntl();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <AppBox
      className="dashboard-products-tab__toolbar"
      data-cy="dashboard-products-tab-content"
    >
      <AppTypography
        component="h1"
        variant="h3"
        translationKey="dashboardTabs.products.label"
      />
      <AppBox className="dashboard-products-tab__header-container">
        <AppSearchInput
          placeholder={formatMessage({
            id: "dashboardTabs.search.placeholder"
          })}
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          onSearch={handleSearch}
        />
        <AppButton
          data-cy="new-product-button"
          variant="contained"
          to={routes.dashboard.products.new.path}
        >
          <AddIcon />
          <AppTypography translationKey="dashboardTabs.addProduct.label" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default DashboardProductsHeader;
