import AppBox from "@/components/app-box/AppBox";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import categoryData from "@/layouts/category-section/CategorySection.constants";
import CategoryItem from "@/layouts/category-section/components/CategoryItem";

import "@/layouts/category-section/CategorySection.scss";

const CategorySection = () => {
  return (
    <PageWrapper>
      <AppBox className="spa-category-section">
        <AppTypography
          translationKey="categorySection.title"
          variant="subtitle1"
          className="spa-category-section__title"
        />
        <AppBox className="spa-category-section__container">
          {categoryData.map((element) => (
            <CategoryItem
              key={element.id}
              label={element.label}
              image={element.image}
            />
          ))}
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default CategorySection;
