import { AppBadgeColorVariant } from "@/components/app-badge/AppBadge.types";

import { ROLES } from "@/constants/common";
import { UserRole } from "@/types/user.types";

type BadgeDetails = {
  translationKey: string;
  variant: AppBadgeColorVariant;
};

export const roleBadges: Record<UserRole, BadgeDetails> = {
  [ROLES.ADMIN]: {
    translationKey: "roles.admin",
    variant: "dark"
  },
  [ROLES.SHOP_MANAGER]: {
    translationKey: "roles.manager",
    variant: "pending"
  },
  [ROLES.USER]: {
    translationKey: "roles.user",
    variant: "info"
  }
};

// @TODO: replace with real statuses type
export const statusBadges: Record<string, BadgeDetails> = {
  ACTIVE: {
    translationKey: "user.status.active",
    variant: "success"
  },
  DISABLED: {
    translationKey: "user.status.blocked",
    variant: "danger"
  }
};
