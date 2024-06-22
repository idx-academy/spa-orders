import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";
import AppBox from "@/components/app-box/AppBox";

import heroImage from "@/assets/images/home-page/hero_section_img.jpg";

import "@/layouts/app-banner/AppBanner.scss";

const AppBanner = () => {
  return (
    <AppBox
      className="spa-banner"
      style={{
        backgroundImage: `url(${heroImage})`
      }}
    >
      <PageWrapper>
        <AppBox className="spa-banner__container">
          <AppBox>
            <AppTypography
              className="spa-banner__header"
              variant="h1"
              translationKey="appBanner.header"
            />
            <AppBox className="spa-banner__paragraph">
              <AppTypography
                variant="subtitle2"
                translationKey="appBanner.paragraphfirst"
              />
            </AppBox>
            <AppBox className="spa-banner__button">
              <AppButton size="large">Shop Now</AppButton>
            </AppBox>
          </AppBox>
        </AppBox>
      </PageWrapper>
    </AppBox>
  );
};

export default AppBanner;
