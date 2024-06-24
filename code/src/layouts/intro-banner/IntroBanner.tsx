import AppTypography from "@/components/app-typography/AppTypography";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppBox from "@/components/app-box/AppBox";
import AppBadge from "@/components/app-badge/AppBadge";

import { introBannerImages } from "@/layouts/intro-banner/IntroBanner.constants";
import useIntroBanner from "@/layouts/intro-banner/useIntroBanner";

import "@/layouts/intro-banner/IntroBanner.scss";

const IntroBanner = () => {
  const currentImageIndex = useIntroBanner(introBannerImages.length);

  const badgeContent = (
    <AppTypography variant="body" translationKey="IntroBanner.badge" />
  );

  return (
    <AppBox
      className="spa-banner-intro"
      style={{
        backgroundImage: `url(${introBannerImages[currentImageIndex]})`
      }}
    >
      <AppContainer maxWidth="lg">
        <AppBox className="spa-banner-intro__wrapper">
          <AppBadge
            variant="danger"
            size="large"
            isRounded={false}
            badgeContent={badgeContent}
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
