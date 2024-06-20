import { Instagram, Twitter, YouTube } from "@mui/icons-material";

export const locationFooterItems = [
  {
    label: "footer.location.street"
  },
  {
    label: "footer.location.city"
  },
  {
    label: "footer.location.email",
    href: "mailto:info@mysite.com"
  },
  {
    label: "footer.location.phone",
    href: "tel:1234567890"
  }
];

export const socialsFooterItems = [
  {
    href: "https://facebook.com",
    element: <YouTube />
  },
  {
    href: "https://instagram.com",
    element: <Instagram />
  },
  {
    href: "https://twitter.com",
    element: <Twitter />
  },
  {
    href: "https://youtube.com",
    element: <YouTube />
  }
];

export const customerSupportFooterItems = [
  {
    label: "footer.support.helpCenter",
    href: "/help-center"
  },
  {
    label: "footer.support.aboutUs",
    href: "/about-us"
  }
];

export const policyFooterItems = [
  {
    label: "footer.policy.shipping",
    href: "/shipping"
  },
  {
    label: "footer.policy.terms",
    href: "/terms"
  },
  {
    label: "footer.policy.payment",
    href: "/payment"
  },
  {
    label: "footer.policy.faq",
    href: "/faq"
  }
];
