import AppBox from "@/components/app-box/AppBox";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

type CategoryItemProps = {
  label: string;
  image: string;
  href: string;
};

const CategoryItem = ({ label, image, href }: CategoryItemProps) => {
  return (
    <AppBox
      className="spa-category-section__element"
      data-testid="spa-category-section-item"
    >
      <AppLink to={href} className="spa-category-section__link">
        <AppBox
          component="img"
          src={image}
          className="spa-category-section__image"
        />
      </AppLink>
      <AppTypography
        translationKey={label}
        variant="subtitle2"
        className="spa-category-section__label"
      />
    </AppBox>
  );
};

export default CategoryItem;
