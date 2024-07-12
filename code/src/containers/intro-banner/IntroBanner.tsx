import { introBannerImages } from "@/containers/intro-banner/IntroBanner.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppTypography from "@/components/app-typography/AppTypography";

import routes from "@/constants/routes";
import useIntervalSwitcher from "@/hooks/use-interval-switcher/useIntervalSwitcher";

import "@/containers/intro-banner/IntroBanner.scss";

const IntroBanner = () => {
  const currentImageIndex = useIntervalSwitcher(introBannerImages.length);

  const badgeContent = (
    <AppTypography variant="body" translationKey="introBanner.badge" />
  );

  return (
    <AppBox
      className={`spa-banner-intro spa-banner-intro--image-${currentImageIndex}`}
      data-cy="banner"
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
            translationKey="introBanner.header"
          />
          <AppTypography
            variant="subtitle2"
            translationKey="introBanner.paragraphfirst"
            className="spa-banner-intro__desctiption"
          />
          <AppButton
            to={routes.products.path}
            size="large"
            className="spa-banner-intro__button"
            data-cy="banner-intro-button"
          >
            <AppTypography variant="body" translationKey="introBanner.button" />
          </AppButton>
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default IntroBanner;
