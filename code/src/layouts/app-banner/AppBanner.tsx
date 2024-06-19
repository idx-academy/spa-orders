import { FC } from "react";
import { FormattedMessage } from "react-intl";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import PageWrapper from "@/layouts/app-wrapper/PageWrapper";

import "@/layouts/app-banner/AppBanner.scss";

const AppBanner: FC = () => {
  return (
    <Box className="banner">
      <PageWrapper>
        <Box className="banner__container">
          <Box>
            <Typography>
              <FormattedMessage id="appBanner.header" />
            </Typography>
          </Box>
          <Box className="banner__paragraph">
            <Typography>
              <FormattedMessage id="appBanner.paragraphfirst" />
            </Typography>
            <Typography>
              <FormattedMessage id="appBanner.paragraphsecond" />
            </Typography>
          </Box>
          <Box className="banner__button">
            <Button variant="contained">Shop Now</Button>
          </Box>
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default AppBanner;
