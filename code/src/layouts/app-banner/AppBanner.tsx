import AppTypography from "@/components/app-typography/AppTypography";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppBox from "@/components/app-box/AppBox";

import useAppBanner from "@/layouts/app-banner/useAppBanner";

import heroImage1 from "@/assets/images/home-page/hero-section-img-1.webp";
import heroImage2 from "@/assets/images/home-page/hero-section-img-2.webp";
import heroImage3 from "@/assets/images/home-page/hero-section-img-3.webp";

import "@/layouts/app-banner/AppBanner.scss";

const images = [heroImage1, heroImage2, heroImage3];

const AppBanner = () => {
  const currentImageIndex = useAppBanner(images, 6);

  return (
    <AppBox
      className="spa-banner"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`
      }}
    >
      <AppContainer maxWidth="lg">
        <AppBox className="spa-banner__wrapper">
          <div className="best-prices">
            <AppTypography variant="body" translationKey="appBanner.badge" />
          </div>
          <AppTypography
            className="spa-banner__heading"
            variant="h1"
            translationKey="appBanner.header"
          />

          <AppTypography
            variant="subtitle2"
            translationKey="appBanner.paragraphfirst"
            className="spa-banner__desctiption"
          />

          <AppButton size="large" className="spa-banner__button">
            <AppTypography variant="body" translationKey="appBanner.button" />
          </AppButton>
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default AppBanner;
