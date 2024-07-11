import categoryData from "@/containers/category-section/CategorySection.constants";
import CategoryItem from "@/containers/category-section/components/CategoryItem";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/category-section/CategorySection.scss";

const CategorySection = () => {
  const categoryItems = categoryData.map((element) => (
    <CategoryItem
      key={element.id}
      label={element.label}
      image={element.image}
    />
  ));

  return (
    <AppBox className="spa-category-section">
      <AppTypography
        translationKey="categorySection.title"
        variant="h3"
        className="spa-category-section__title"
      />
      <AppBox className="spa-category-section__container">
        {categoryItems}
      </AppBox>
    </AppBox>
  );
};

export default CategorySection;
