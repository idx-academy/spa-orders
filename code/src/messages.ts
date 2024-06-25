import bannerMessages from "@/layouts/intro-banner/messages";
import commonMessages from "@/constants/common-messages";
import footerMessages from "@/layouts/app-footer/messages";
import subintroMessages from "@/layouts/subintro/messages";
import bestSellersMessages from "@/layouts/best-sellers/messages";

const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...bannerMessages.en,
    ...subintroMessages.en
    ...bannerMessages.en,
    ...bestSellersMessages.en
  },
  uk: {
    ...commonMessages.uk,
    ...footerMessages.uk,
    ...bannerMessages.uk,
    ...subintroMessages.uk
    ...bannerMessages.uk,
    ...bestSellersMessages.uk
  }
};

export default messages;
