import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";

import "@/pages/not-found/NotFoundPage.scss";

const NotFoundPage = () => {
  const { state } = useErrorPageRedirect();

  const goBackPath = state?.goBackPath ?? "/";
  const goBackButtonTranslationKey =
    state?.goBackButtonTranslationKey ?? "notFoundLink";
  const errorMessageTranslationKey =
    state?.errorMessageTranslationKey ?? "notFoundDesc";

  return (
    <PageWrapper className="not-found-page">
      <AppBox className="not-found-page__content">
        <AppTypography variant="h1" className="not-found-page__title">
          404
        </AppTypography>
        <AppTypography
          variant="h2"
          className="not-found-page__subtitle"
          translationKey="pageNotFound"
        />
        <AppTypography
          variant="body"
          className="not-found-page__description"
          translationKey={errorMessageTranslationKey}
        />
        <AppButton to={goBackPath} variant="contained">
          <AppTypography
            className="not-found-page__link-text"
            translationKey={goBackButtonTranslationKey}
          />
        </AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default NotFoundPage;
