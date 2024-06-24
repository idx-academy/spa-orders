import AppBox from "@/components/app-box/AppBox";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import categoryData from "@/layouts/categorySection/CategorySection.constants";
import CategoryItem from "@/layouts/categorySection/components/CategoryItem";
import "@/layouts/categorySection/CategorySection.scss";

const CategorySection = () => {
  return (
    <PageWrapper>
      <AppBox className="spa-category-section">
        <AppTypography
          translationKey="categorySection.title"
          variant="subtitle1"
          className="spa-category-section__title"
        />
        {categoryData.map((element) => (
          <CategoryItem
            key={element.id}
            label={element.label}
            image={element.image}
          />
        ))}
      </AppBox>
    </PageWrapper>
  );
};

export default CategorySection;
