import { useSearchParams } from "react-router-dom";

import { categories } from "@/layouts/header/components/header-categories/HeaderCategories.constants";

import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/header/components/header-categories/HeaderCategories.scss";

const HeaderCategories = () => {
  const [searchParams] = useSearchParams();
  const categoryType = searchParams.get("category");

  return (
    <AppBox className="menu">
      <AppContainer maxWidth="xl" className="menu__container">
        {categories.map((category, index) => (
          <AppLink
            to={category.href}
            variant="colored"
            isNavLink={
              categoryType === null
                ? index === 0
                : category.href.includes(`${categoryType}`)
            }
            key={category.label}
          >
            <AppTypography
              variant="caption"
              data-testid="menu-item"
              translationKey={category.label}
              data-cy={`menu-item-${index}`}
            />
          </AppLink>
        ))}
      </AppContainer>
    </AppBox>
  );
};

export default HeaderCategories;
