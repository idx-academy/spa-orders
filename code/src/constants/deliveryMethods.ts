import novaPostaImage from "@/assets/images/dashboard/nova-posta.webp";
import ukrPostaImage from "@/assets/images/dashboard/ukr-posta.webp";

export const deliveryMethods = {
  NOVA_POST: {
    translationKey: "dashboardTabs.orders.filters.novaPost",
    image: novaPostaImage
  },
  UKR_POST: {
    translationKey: "dashboardTabs.orders.filters.ukrPost",
    image: ukrPostaImage
  }
} as const;
