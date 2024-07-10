import { categories } from "@/layouts/header/components/header-categories/HeaderCategories.constants";

import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/header/components/header-categories/HeaderCategories.scss";

const HeaderCategories = () => {
  return (
    <AppBox className="menu">
      <AppContainer maxWidth="xl" className="menu__container">
        {categories.map((category) => (
          <AppLink
            to={category.href}
            variant="colored"
            isNavLink
            key={category.label}
          >
            <AppTypography variant="caption" data-testid="menu-item">
              {category.label}
            </AppTypography>
          </AppLink>
        ))}
      </AppContainer>
    </AppBox>
  );
};

export default HeaderCategories;
