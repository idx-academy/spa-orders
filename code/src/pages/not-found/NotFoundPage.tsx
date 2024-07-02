import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import "@/pages/not-found/NotFoundPage.scss";

const NotFoundPage = () => {
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
          translationKey="notFoundDesc"
        />
        <AppButton to="/" variant="contained">
          <AppTypography
            className="not-found-page__link-text"
            translationKey="notFoundLink"
          />
        </AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default NotFoundPage;
