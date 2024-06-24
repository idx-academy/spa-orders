import Box from "@mui/material/Box";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import categoryData from "@/components/categorySection/CategorySection.constants";
import "@/components/categorySection/CategorySection.scss";

type CategoryElementProps = {
  label: string;
  image: string;
};

const CategoryElement = ({ label, image }: CategoryElementProps) => {
  return (
    <Box
      className="spa-category-section__element"
      data-testid="spa-category-section-item"
    >
      <img src={image} className="spa-category-section__image" />
      <AppTypography
        translationKey={label}
        variant="subtitle2"
        className="spa-category-section__label"
      />
    </Box>
  );
};

const CategorySection = () => {
  return (
    <PageWrapper>
      <Box className="spa-category-section">
        <AppTypography
          translationKey="categorySection.title"
          variant="subtitle1"
          className="spa-category-section__title"
        />
        {categoryData.map((element) => (
          <CategoryElement
            key={element.id}
            label={element.label}
            image={element.image}
          />
        ))}
      </Box>
    </PageWrapper>
  );
};

export default CategorySection;
