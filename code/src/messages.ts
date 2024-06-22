import bannerMessages from "@/layouts/intro-banner/messages";
import commonMessages from "@/constants/common-messages";
import footerMessages from "@/layouts/app-footer/messages";
import productsListMessages from "@/layouts/app-products/messages";

const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...bannerMessages.en,
    ...productsListMessages.en
  },
  uk: {
    ...commonMessages.uk,
    ...footerMessages.uk,
    ...bannerMessages.uk,
    ...productsListMessages.uk
  }
};

export default messages;
