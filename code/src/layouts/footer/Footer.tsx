import {
  customerSupportFooterItems,
  locationFooterItems,
  policyFooterItems,
  socialsFooterItems
} from "@/layouts/footer/Footer.constants";
import FooterBanner from "@/layouts/footer/components/footer-banner/FooterBanner";

import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/footer/Footer.scss";

const Footer = () => {
  const locationItems = locationFooterItems.map((item) => (
    <AppBox component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className={item.href && "footer__list-item-link"}
        translationKey={item.label}
        component={item.href ? AppLink : undefined}
        to={item.href as string}
      />
    </AppBox>
  ));

  const socialsItems = socialsFooterItems.map((item) => (
    <AppBox component="li" className="footer__socials-item" key={item.href}>
      <AppLink to={item.href}>{item.element}</AppLink>
    </AppBox>
  ));

  const customerSupportItems = customerSupportFooterItems.map((item) => (
    <AppBox component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        component={AppLink}
        to={item.href}
        translationKey={item.label}
      />
    </AppBox>
  ));

  const policyItems = policyFooterItems.map((item) => (
    <AppBox component="li" className="footer__list-item" key={item.label}>
      <AppTypography
        className="footer__list-item-link"
        component={AppLink}
        to={item.href}
        translationKey={item.label}
      />
    </AppBox>
  ));

  return (
    <AppBox component="footer" data-cy="footer">
      <FooterBanner />
      <AppBox className="footer">
        <AppContainer maxWidth="lg">
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
        </AppContainer>
      </AppBox>
    </AppBox>
  );
};

export default Footer;
