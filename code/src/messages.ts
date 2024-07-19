import footerMessages from "@/layouts/footer/messages";

import bestSellersMessages from "@/containers/best-sellers/messages";
import callToActionSectionMessages from "@/containers/call-to-action/messages";
import cartDrawerMessages from "@/containers/cart-drawer/message";
import categorySectionMessages from "@/containers/category-section/messages";
import dashboardTabsMessages from "@/containers/dashboard-tabs/messages";
import signInFormMessages from "@/containers/forms/sign-in-form/messages";
import signupFormMessages from "@/containers/forms/sign-up-form/messages";
import bannerMessages from "@/containers/intro-banner/messages";
import authModalMessages from "@/containers/modals/auth/messages";
import orderItemMessages from "@/containers/order-item/messages";
import subintroMessages from "@/containers/subintro/messages";
import ordersTableMessages from "@/containers/tables/orders-table/messages";

import dropDownMessages from "@/components/app-dropdown/messages";
import productCardMessages from "@/components/product-card/messages";

import commonMessages from "@/constants/common-messages";
import { Locale } from "@/context/i18n/I18nProvider";
import cartPageMessages from "@/pages/cart/messages";
import notFoundMessages from "@/pages/not-found/messages";
import orderPageMessages from "@/pages/orders/messages";
import productsItemsMessages from "@/pages/products/messages";

type MessagesType = Record<Locale, Record<string, string>>;

const messages: MessagesType = {
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
    ...notFoundMessages.en,
    ...cartPageMessages.en,
    ...cartDrawerMessages.en,
    ...ordersTableMessages.en,
    ...cartPageMessages.en,
    ...dashboardTabsMessages.en
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
    ...orderPageMessages.uk,
    ...cartPageMessages.uk,
    ...cartDrawerMessages.uk,
    ...ordersTableMessages.uk,
    ...cartPageMessages.uk,
    ...dashboardTabsMessages.uk
  }
};

export default messages;
