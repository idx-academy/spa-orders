import { skipToken } from "@reduxjs/toolkit/query/react";
import { ChangeEvent, useRef, useState } from "react";
import { useIntl } from "react-intl";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import SearchInputDropdown from "@/layouts/header/components/header-search-input-dropdown/HeaderSearchInputDropdown";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppInputBase from "@/components/app-input-base/AppInputBase";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import { useOnClickOutside } from "@/hooks/use-on-click-outside/useOnClickOutside";
import { useGetUserProductsBySearchQuery } from "@/store/api/productsApi";
import cn from "@/utils/cn/cn";

import "@/layouts/header/components/header-search-input/HeaderSearchInput.scss";

const HeaderSearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const { locale: lang } = useLocaleContext();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleCloseDropdown = () => {
    setIsDropdownOpened(false);
  };

  const handleOpenDropdown = () => {
    setIsDropdownOpened(true);
  };

  useOnClickOutside(searchInputRef, handleCloseDropdown);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const { formatMessage } = useIntl();

  const queryParams =
    debouncedSearchQuery.length >= 4
      ? {
          searchQuery: debouncedSearchQuery,
          lang,
          page: 1,
          size: 10 //for now, it's hardcoded data
        }
      : skipToken;

  const {
    data: searchProducts,
    isLoading,
    isError
  } = useGetUserProductsBySearchQuery(queryParams);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length > 0) {
      handleOpenDropdown();
    } else {
      handleCloseDropdown();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    handleCloseDropdown();
  };

  const searchContent = debouncedSearchQuery.length >= 4 && (
    <SearchInputDropdown
      totalElements={searchProducts?.totalElements ?? 0}
      handleCloseDropdown={handleCloseDropdown}
      searchResults={searchProducts?.content ?? []}
      isError={isError}
      isLoading={isLoading}
    />
  );

  return (
    <AppBox className="spa-search-input" ref={searchInputRef}>
      <AppInputBase
        value={searchQuery}
        className={cn("spa-search-input__text-field")}
        onChange={handleSearchChange}
        placeholder={formatMessage({ id: "header.searchInputPlaceholder" })}
      />
      <AppIconButton
        onClick={handleClearSearch}
        className={!searchQuery ? "spa-search-input__clear-icon" : undefined}
      >
        <ClearIcon fontSize="small" />
      </AppIconButton>
      <AppIconButton size="small" className="spa-search-input__search-icon">
        <SearchIcon />
      </AppIconButton>
      {isDropdownOpened && searchContent}
    </AppBox>
  );
};

export default HeaderSearchInput;
