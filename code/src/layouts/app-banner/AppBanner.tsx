import Box from "@mui/material/Box";

import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";

import "@/layouts/app-banner/AppBanner.scss";

const AppBanner = () => {
  return (
    <Box className="banner">
      <PageWrapper>
        <Box className="banner__container">
          <Box>
            <AppTypography variant="h1" translationKey="appBanner.header" />
          </Box>
          <Box className="banner__paragraph">
            <AppTypography translationKey="appBanner.paragraphfirst" />
            <AppTypography translationKey="appBanner.paragraphsecond" />
          </Box>
          <Box className="banner__button">
            <AppButton variant="contained">Shop Now</AppButton>
          </Box>
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default AppBanner;
