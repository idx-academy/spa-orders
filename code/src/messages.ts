import commonMessages from "@/shared/i18n/common-messages";
import bannerMessages from "@/layouts/intro-banner/messages";
import footerMessages from "@/layouts/app-footer/messages";

const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...bannerMessages.en
  },
  uk: {
    ...commonMessages.uk,
    ...footerMessages.uk,
    ...bannerMessages.uk
  }
};

export default messages;
