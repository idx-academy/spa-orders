import novaPostaImage from "@/assets/images/dashboard/nova-posta.webp";
import ukrPostaImage from "@/assets/images/dashboard/ukr-posta.png";

export const orderStatusesTranslationKeys = {
  IN_PROGRESS: "orders.statuses.inProgress",
  SHIPPED: "orders.statuses.shipped",
  DELIVERED: "orders.statuses.delivered",
  CANCELED: "orders.statuses.canceled",
  COMPLETED: "orders.statuses.completed"
} as const;

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
