import Box from "@mui/material/Box";

import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";

import "@/layouts/app-banner/AppBanner.scss";

const AppBanner = () => {
  return (
    <Box className="spa-banner">
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
          <Box>
            <AppButton size="large">Shop Now</AppButton>
          </Box>
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default AppBanner;
