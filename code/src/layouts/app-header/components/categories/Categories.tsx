import Box from "@mui/material/Box";
import { categories } from "@/layouts/app-header/components/categories/Categories.constants";
import "@/layouts/app-header/components/categories/Categories.scss";

const Categories = () => {
  return (
    <Box className="menu">
      {categories.map((category, i) => (
        <Box key={i} className="menu__item" data-testid="menu-item">
          {category}
        </Box>
      ))}
    </Box>
  );
};

export default Categories;
