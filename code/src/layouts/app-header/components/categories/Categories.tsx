import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import AppLink from "@/components/app-link/AppLink";

import { categories } from "@/layouts/app-header/components/categories/Categories.constants";

import "@/layouts/app-header/components/categories/Categories.scss";

const Categories = () => {
  return (
    <AppBox className="menu">
      {categories.map((category, i) => (
        <AppTypography
          className="menu__item"
          key={i}
          data-testid="menu-item"
          component={AppLink}
          to={category.href}
        >
          {category.label}
        </AppTypography>
      ))}
    </AppBox>
  );
};

export default Categories;
