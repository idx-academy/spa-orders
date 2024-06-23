import AppTypography from "@/components/app-typography/AppTypography";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppBox from "@/components/app-box/AppBox";
import AppBadge from "@/components/app-badge/AppBadge";

import useIntroBanner from "@/layouts/intro-banner/useIntroBanner";

import heroImage1 from "@/assets/images/home-page/hero-section-img-1.webp";
import heroImage2 from "@/assets/images/home-page/hero-section-img-2.webp";
import heroImage3 from "@/assets/images/home-page/hero-section-img-3.webp";

import "@/layouts/intro-banner/IntroBanner.scss";

const images = [heroImage1, heroImage2, heroImage3];

const IntroBanner = () => {
  const currentImageIndex = useIntroBanner(images);

  return (
    <AppBox
      className="spa-banner-intro"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`
      }}
    >
      <AppContainer maxWidth="lg">
        <AppBox className="spa-banner-intro__wrapper">
          <AppBadge
            color="danger"
            size="large"
            isRounded={false}
            badgeContent={
              <AppTypography
                variant="body"
                translationKey="IntroBanner.badge"
              />
            }
          />
          <AppTypography
            className="spa-banner-intro__heading"
            variant="h1"
            translationKey="IntroBanner.header"
          />
          <AppTypography
            variant="subtitle2"
            translationKey="IntroBanner.paragraphfirst"
            className="spa-banner-intro__desctiption"
          />
          <AppButton size="large" className="spa-banner-intro__button">
            <AppTypography variant="body" translationKey="IntroBanner.button" />
          </AppButton>
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default IntroBanner;
