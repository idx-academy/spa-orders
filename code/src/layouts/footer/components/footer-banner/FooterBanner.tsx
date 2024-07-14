import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/footer/components/footer-banner/FooterBanner.scss";

const FooterBanner = () => {
  return (
    <AppBox className="footer-banner">
      <AppBox className="footer-banner__container">
        <AppContainer maxWidth="xl" className="footer-banner__content">
          <AppTypography
            variant="h3"
            className="footer-banner__heading"
            translationKey="footer.banner.title"
          />
          <AppTypography
            variant="body"
            translationKey="footer.banner.description"
          />
          <AppButton variant="light" className="footer-banner__button">
            <AppTypography
              variant="body"
              translationKey="footer.banner.button"
            />
          </AppButton>
        </AppContainer>
      </AppBox>
    </AppBox>
  );
};

export default FooterBanner;
