import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import { categories } from "@/layouts/header/components/header-categories/HeaderCategories.constants";

import "@/layouts/header/components/header-categories/HeaderCategories.scss";

const HeaderCategories = () => {
  // @TODO: change "to" prop in the future

  return (
    <AppContainer maxWidth="xl" className="menu">
      {categories.map((category, i) => (
        <AppLink to={`/category${i}`} variant="colored" isNavLink key={i}>
          <AppTypography
            className="menu__item"
            variant="caption"
            data-testid="menu-item"
          >
            {category}
          </AppTypography>
        </AppLink>
      ))}
    </AppContainer>
  );
};

export default HeaderCategories;
