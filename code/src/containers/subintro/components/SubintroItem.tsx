import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

type SubintroItemProps = {
  content: string;
  icon: string;
};

const SubintroItem = ({ content, icon }: SubintroItemProps) => {
  return (
    <AppBox className="spa-subintro__element" data-testid="spa-subintro-item">
      <img className="spa-subintro__icon" src={icon} />
      <AppTypography
        translationKey={content}
        variant="subtitle1"
        className="spa-subintro__content"
      />
    </AppBox>
  );
};

export default SubintroItem;
