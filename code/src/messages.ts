import bannerMessages from "@/layouts/intro-banner/messages";
import commonMessages from "@/constants/common-messages";
import footerMessages from "@/layouts/footer/messages";
import bestSellersMessages from "@/layouts/best-sellers/messages";
import subintroMessages from "@/layouts/subintro/messages";
import categorySectionMessages from "@/layouts/category-section/messages";

const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...bannerMessages.en,
    ...bestSellersMessages.en,
    ...subintroMessages.en,
    ...categorySectionMessages.en
  },
  uk: {
    ...commonMessages.uk,
    ...footerMessages.uk,
    ...bannerMessages.uk,
    ...bestSellersMessages.uk,
    ...subintroMessages.uk,
    ...categorySectionMessages.uk
  }
};

export default messages;
