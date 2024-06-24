import { Link } from "react-router-dom";

import { categories } from "@/layouts/app-header/components/categories/Categories.constants";
import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/app-header/components/categories/Categories.scss";

const Categories = () => {
  return (
    <AppBox className="menu">
      {categories.map((category, i) => (
        <AppTypography
          className="menu__item"
          key={i}
          data-testid="menu-item"
          component={Link}
          to={category.href}
        >
          {category.label}
        </AppTypography>
      ))}
    </AppBox>
  );
};

export default Categories;
