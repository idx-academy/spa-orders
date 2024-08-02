import { AppBadgeColorVariant } from "@/components/app-badge/AppBadge.types";

import { ROLES, USER_STATUSES } from "@/constants/common";
import { UserRole, UserStatus } from "@/types/user.types";

import "@/containers/tables/users-table/components/users-table-body/UsersTableBody.scss";

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

export const statusBadges: Record<UserStatus, BadgeDetails> = {
  [USER_STATUSES.ACTIVE]: {
    translationKey: "user.status.active",
    variant: "success"
  },
  [USER_STATUSES.DEACTIVATED]: {
    translationKey: "user.status.deactivated",
    variant: "danger"
  }
};
