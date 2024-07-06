import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

type CategoryItemProps = {
  label: string;
  image: string;
};

const CategoryItem = ({ label, image }: CategoryItemProps) => {
  return (
    <AppBox
      className="spa-category-section__element"
      data-testid="spa-category-section-item"
    >
      <AppBox
        component="img"
        src={image}
        className="spa-category-section__image"
      />
      <AppTypography
        translationKey={label}
        variant="subtitle2"
        className="spa-category-section__label"
      />
    </AppBox>
  );
};

export default CategoryItem;
