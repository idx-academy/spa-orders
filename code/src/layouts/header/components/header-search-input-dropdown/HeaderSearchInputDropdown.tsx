import AppBox from "@/components/app-box/AppBox";
import AppLink from "@/components/app-link/AppLink";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppTypography from "@/components/app-typography/AppTypography";

import noResultsImage from "@/assets/images/search/no-results.png";
import routePaths from "@/constants/routes";
import { ProductFromSearch } from "@/types/product.types";

import "@/layouts/header/components/header-search-input-dropdown/HeaderSearchInputDropdown.scss";

type HeaderSearchInputDropdownProps = {
  isError: boolean;
  searchResults: ProductFromSearch[];
  handleCloseDropdown: () => void;
  totalElements: number;
  isLoading: boolean;
};

const HeaderSearchInputDropdown = ({
  handleCloseDropdown,
  searchResults,
  totalElements,
  isError,
  isLoading
}: HeaderSearchInputDropdownProps) => {
  const errorLabel = (
    <AppTypography component="li" translationKey="errors.somethingWentWrong" /> //@TODO  will be replaced by error layout
  );

  const searchResultsLabel = (
    <AppMenuItem className="search-input-dropdown__results" disabled>
      <AppTypography
        variant="caption"
        component="p"
        translationKey="header.searchInputResults"
      />
      <AppTypography
        className="search-input-dropdown__results-value"
        variant="caption"
      >
        {totalElements}
      </AppTypography>
    </AppMenuItem>
  );

  //@TODO: Will be implemented with pagination
  const loadingLabel = <AppTypography component="li">Loading...</AppTypography>;

  const noResultsLabel = (
    <AppBox className="search-input-dropdown__no-results">
      <AppTypography
        component="li"
        className="search-input-dropdown__no-results-label"
        fontWeight="extra-bold"
        translationKey="header.searchInputNoResults"
      />
      <AppBox
        className="search-input-dropdown__no-results-image"
        component="img"
        src={noResultsImage}
        alt="no results image"
      />
    </AppBox>
  );

  let content;

  if (isError) {
    content = errorLabel;
  } else if (isLoading) {
    content = loadingLabel;
  } else if (totalElements === 0) {
    content = noResultsLabel;
  } else {
    content = (
      <>
        {searchResultsLabel}
        {searchResults.map(({ id, name, image }) => (
          <AppMenuItem
            key={id}
            className="search-input-dropdown__item"
            onClick={handleCloseDropdown}
          >
            <AppLink
              className="search-input-dropdown__item-container"
              to={routePaths.productDetails.path(id)}
            >
              <AppBox
                className="search-input-dropdown__item-image"
                component="img"
                src={image}
                alt={name}
              />
              <AppTypography variant="caption-small">{name}</AppTypography>
            </AppLink>
          </AppMenuItem>
        ))}
      </>
    );
  }

  return (
    <AppBox
      data-testid="search-dropdown"
      component="ul"
      className=" search-input-dropdown"
    >
      {content}
    </AppBox>
  );
};

export default HeaderSearchInputDropdown;
