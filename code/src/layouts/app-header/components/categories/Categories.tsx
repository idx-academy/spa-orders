import Box from "@mui/material/Box";
import AppTypography from "@/components/app-typography/AppTypography";
import { categories } from "@/layouts/app-header/components/categories/Categories.constants";
import "@/layouts/app-header/components/categories/Categories.scss";

const Categories = () => {
  return (
    <Box className="menu">
      {categories.map((category, i) => (
        <AppTypography className="menu__item" key={i} data-testid="menu-item">
          {category}
        </AppTypography>
      ))}
    </Box>
  );
};

export default Categories;
