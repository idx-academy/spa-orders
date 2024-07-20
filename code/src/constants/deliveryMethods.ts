import novaPostaImage from "@/assets/images/dashboard/nova-posta.webp";
import ukrPostaImage from "@/assets/images/dashboard/ukr-posta.webp";

export const deliveryMethods = {
  NOVA_POST: {
    translationKey: "dashboardTabs.orders.filters.novaPost",
    image: novaPostaImage,
    value: "NOVA"
  },
  UKR_POST: {
    translationKey: "dashboardTabs.orders.filters.ukrPost",
    image: ukrPostaImage,
    value: "UKRPOSHTA"
  }
} as const;
