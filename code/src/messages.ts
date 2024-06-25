import bannerMessages from "@/layouts/intro-banner/messages";
import commonMessages from "@/constants/common-messages";
import footerMessages from "@/layouts/app-footer/messages";
import bestSellersMessages from "@/layouts/best-sellers/messages";
import subintroMessages from "@/layouts/subintro/messages";

const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...bannerMessages.en,
    ...bestSellersMessages.en,
    ...subintroMessages.en
  },
  uk: {
    ...commonMessages.uk,
    ...footerMessages.uk,
    ...bannerMessages.uk,
    ...bestSellersMessages.uk,
    ...subintroMessages.uk
  }
};

export default messages;
