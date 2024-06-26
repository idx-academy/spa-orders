import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";
import AppLink from "@/components/app-link/AppLink";

type CallToActionSectionItemProps = {
  titleTranslationKey: string;
  descriptionTranslationKey: string;
  captionTranslationKey: string;
  linkTo: string;
  imageUrl: string;
  buttonLabelTranslationKey: string;
};

const CallToActionItem = ({
  titleTranslationKey,
  descriptionTranslationKey,
  captionTranslationKey,
  buttonLabelTranslationKey,
  linkTo,
  imageUrl
}: CallToActionSectionItemProps) => {
  return (
    <AppBox
      className="call-to-action__item"
      sx={{ backgroundImage: `url(${imageUrl})` }}
    >
      <AppTypography
        variant="subtitle2"
        translationKey={captionTranslationKey}
      />
      <AppTypography variant="h2" translationKey={titleTranslationKey} />
      <AppTypography
        variant="subtitle2"
        translationKey={descriptionTranslationKey}
      />
      <AppLink to={linkTo}>
        <AppButton variant="light" size="large">
          <AppTypography
            variant="caption"
            translationKey={buttonLabelTranslationKey}
          />
        </AppButton>
      </AppLink>
    </AppBox>
  );
};

export default CallToActionItem;
