import bannerMessages from "@/layouts/intro-banner/messages";
import commonMessages from "@/constants/common-messages";
import footerMessages from "@/layouts/footer/messages";
import bestSellersMessages from "@/layouts/best-sellers/messages";
import subintroMessages from "@/layouts/subintro/messages";
import categorySectionMessages from "@/layouts/category-section/messages";
import productCardMessages from "@/components/product-card/messages";
import productsItemsMessages from "@/pages/products/messages";
import notFoundMessages from "@/pages/not-found/messages";
import callToActionSectionMessages from "@/layouts/call-to-action/messages";
import authModalMessages from "@/layouts/modals/auth/messages";
import orderItemMessages from "@/layouts/order-item/messages";
import dropDownMessages from "@/components/app-dropdown/messages";
import signupFormMessages from "@/layouts/forms/sign-up-form/messages";
import signInFormMessages from "@/layouts/forms/sign-in-form/messages";
import orderPageMessages from "@/pages/orders/messages";

const messages = {
  en: {
    ...commonMessages.en,
    ...footerMessages.en,
    ...bannerMessages.en,
    ...bestSellersMessages.en,
    ...subintroMessages.en,
    ...categorySectionMessages.en,
    ...productCardMessages.en,
    ...productsItemsMessages.en,
    ...callToActionSectionMessages.en,
    ...authModalMessages.en,
    ...orderItemMessages.en,
    ...dropDownMessages.en,
    ...signupFormMessages.en,
    ...signInFormMessages.en,
    ...orderPageMessages.en,
    ...notFoundMessages.en
  },
  uk: {
    ...commonMessages.uk,
    ...footerMessages.uk,
    ...bannerMessages.uk,
    ...bestSellersMessages.uk,
    ...subintroMessages.uk,
    ...categorySectionMessages.uk,
    ...productCardMessages.uk,
    ...productsItemsMessages.uk,
    ...callToActionSectionMessages.uk,
    ...authModalMessages.uk,
    ...orderItemMessages.uk,
    ...dropDownMessages.uk,
    ...notFoundMessages.uk,
    ...signupFormMessages.uk,
    ...signInFormMessages.uk,
    ...orderPageMessages.uk
  }
};

export default messages;
