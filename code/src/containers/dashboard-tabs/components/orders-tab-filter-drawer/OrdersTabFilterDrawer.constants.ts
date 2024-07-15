import { AppBadgeColorVariant } from "@/components/app-badge/AppBadge.types";

type StatusRecord = {
  badgeLabelTranslationKey: string;
  badgeVariant: AppBadgeColorVariant;
};

export const statuses: StatusRecord[] = [
  { badgeLabelTranslationKey: "In progress", badgeVariant: "pending" },
  { badgeLabelTranslationKey: "Shipped", badgeVariant: "dark" },
  { badgeLabelTranslationKey: "Canceled", badgeVariant: "danger" },
  { badgeLabelTranslationKey: "Delivered", badgeVariant: "info" },
  { badgeLabelTranslationKey: "Completed", badgeVariant: "success" }
] as const;
