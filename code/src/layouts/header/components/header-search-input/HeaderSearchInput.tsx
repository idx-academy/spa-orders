import { ChangeEvent, useRef, useState } from "react";
import { useIntl } from "react-intl";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import SearchInputDropdown from "@/layouts/header/components/header-search-input-dropdown/HeaderSearchInputDropdown";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppInputBase from "@/components/app-input-base/AppInputBase";

import useDropdown from "@/hooks/use-dropdown/useDropdown";
import useInfiniteProductsSearch from "@/hooks/use-infinite-products-search/useInfiniteProductsSearch";
import { useOnClickOutside } from "@/hooks/use-on-click-outside/useOnClickOutside";
import cn from "@/utils/cn/cn";

import "@/layouts/header/components/header-search-input/HeaderSearchInput.scss";

const MIN_SEARCH_QUERY_LENGTH = 3;

const HeaderSearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { handleCloseDropdown, handleOpenDropdown, isDropdownOpened } =
    useDropdown();

  const { formatMessage } = useIntl();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useOnClickOutside(searchInputRef, handleCloseDropdown);

  const { searchProducts, isLoading, isError, loadNextPage, resetSearch } =
    useInfiniteProductsSearch({
      query: searchQuery
    });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    value.length && handleOpenDropdown();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    handleCloseDropdown();
    resetSearch();
  };

  const searchContent = searchQuery.length >= MIN_SEARCH_QUERY_LENGTH && (
    <SearchInputDropdown
      loadNextPage={loadNextPage}
      totalElements={searchProducts?.totalElements}
      handleCloseDropdown={handleCloseDropdown}
      searchResults={searchProducts?.content}
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
