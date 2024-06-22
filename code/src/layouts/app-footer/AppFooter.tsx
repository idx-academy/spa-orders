import { Link } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import {
  customerSupportFooterItems,
  locationFooterItems,
  policyFooterItems,
  socialsFooterItems
} from "@/layouts/app-footer/AppFooter.constants";

import "@/layouts/app-footer/AppFooter.scss";
import AppBox from "@/components/app-box/AppBox";

const AppFooter = () => {
  const locationItems = locationFooterItems.map((item) => (
    <AppBox component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        translationKey={item.label}
        component={item.href ? Link : undefined}
        to={item.href as string}
      />
    </AppBox>
  ));

  const socialsItems = socialsFooterItems.map((item) => (
    <AppBox component="li" className="footer__socials-item" key={item.href}>
      <Link to={item.href}>{item.element}</Link>
    </AppBox>
  ));

  const customerSupportItems = customerSupportFooterItems.map((item) => (
    <AppBox component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        component={Link}
        to={item.href}
        translationKey={item.label}
      />
    </AppBox>
  ));

  const policyItems = policyFooterItems.map((item) => (
    <AppBox component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        component={Link}
        to={item.href}
        translationKey={item.label}
      />
    </AppBox>
  ));

  return (
    <AppBox className="footer" component="footer">
      <PageWrapper>
        <AppBox className="footer__container">
          <AppBox>
            <AppTypography
              className="footer__list-title"
              translationKey="footer.location.title"
              variant="h3"
            />
            <AppBox component="ul" className="footer__list">
              {locationItems}
            </AppBox>
            <AppBox className="footer__socials" component="ul">
              {socialsItems}
            </AppBox>
          </AppBox>
          <AppBox>
            <AppTypography
              className="footer__list-title"
              translationKey="footer.support.title"
              variant="h3"
            />
            <AppBox component="ul" className="footer__list">
              {customerSupportItems}
            </AppBox>
          </AppBox>
          <AppBox>
            <AppTypography
              className="footer__list-title"
              translationKey="footer.policy.title"
              variant="h3"
            />
            <AppBox component="ul" className="footer__list">
              {policyItems}
            </AppBox>
          </AppBox>
        </AppBox>
      </PageWrapper>
    </AppBox>
  );
};

export default AppFooter;
