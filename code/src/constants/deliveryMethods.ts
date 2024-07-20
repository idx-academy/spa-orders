import novaPostaImage from "@/assets/images/dashboard/nova-posta.webp";
import ukrPostaImage from "@/assets/images/dashboard/ukr-posta.webp";

export const deliveryMethodValues = ["NOVA", "UKRPOSHTA"] as const;

export const deliveryMethods = {
  NOVA_POST: {
    translationKey: "dashboardTabs.orders.filters.novaPost",
    image: novaPostaImage,
    value: deliveryMethodValues[0]
  },
  UKRPOSHTA: {
    translationKey: "dashboardTabs.orders.filters.ukrPost",
    image: ukrPostaImage,
    value: deliveryMethodValues[1]
  }
} as const;
