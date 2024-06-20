import Box from "@mui/material/Box";

import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";

import "@/layouts/app-banner/AppBanner.scss";
import heroImage from "@/assets/images/home-page/hero_section_img.jpg";

const AppBanner = () => {
  return (
    <Box
      className="spa-banner"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: "12 / 5"
      }}
    >
      <PageWrapper>
        <Box className="spa-banner__container">
          <Box>
            <AppTypography
              className="spa-banner__header"
              variant="h1"
              translationKey="appBanner.header"
            />
          </Box>
          <Box className="spa-banner__paragraph">
            <AppTypography
              variant="subtitle2"
              translationKey="appBanner.paragraphfirst"
            />
          </Box>
          <Box className="spa-banner__button">
            <AppButton size="large">Shop Now</AppButton>
          </Box>
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default AppBanner;
