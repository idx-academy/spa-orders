import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

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
      <AppButton to={linkTo} variant="light" size="large">
        <AppTypography
          variant="caption"
          translationKey={buttonLabelTranslationKey}
        />
      </AppButton>
    </AppBox>
  );
};

export default CallToActionItem;
