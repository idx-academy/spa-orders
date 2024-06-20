import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import {
  customerSupportFooterItems,
  locationFooterItems,
  policyFooterItems,
  socialsFooterItems
} from "@/layouts/app-footer/AppFooter.constants";

import "@/layouts/app-footer/AppFooter.scss";

const AppFooter = () => {
  const locationItems = locationFooterItems.map((item) => (
    <Box component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        translationKey={item.label}
        component={item.href ? Link : undefined}
        to={item.href as string}
      />
    </Box>
  ));

  const socialsItems = socialsFooterItems.map((item) => (
    <Box component="li" className="footer__socials-item" key={item.href}>
      <AppTypography component={Link} to={item.href}>
        {item.element}
      </AppTypography>
    </Box>
  ));

  const customerSupportItems = customerSupportFooterItems.map((item) => (
    <Box component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        component={Link}
        to={item.href}
        translationKey={item.label}
      />
    </Box>
  ));

  const policyItems = policyFooterItems.map((item) => (
    <Box component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        component={Link}
        to={item.href}
        translationKey={item.label}
      />
    </Box>
  ));

  return (
    <Box className="footer" component="footer">
      <PageWrapper>
        <Box className="footer__container">
          <Box>
            <AppTypography
              className="footer__list-title"
              translationKey="footer.location.title"
              variant="h3"
            />
            <Box component="ul" className="footer__list">
              {locationItems}
            </Box>
            <Box className="footer__socials" component="ul">
              {socialsItems}
            </Box>
          </Box>
          <Box>
            <AppTypography
              className="footer__list-title"
              translationKey="footer.support.title"
              variant="h3"
            />
            <Box component="ul" className="footer__list">
              {customerSupportItems}
            </Box>
          </Box>
          <Box>
            <AppTypography
              className="footer__list-title"
              translationKey="footer.policy.title"
              variant="h3"
            />
            <Box component="ul" className="footer__list">
              {policyItems}
            </Box>
          </Box>
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default AppFooter;
