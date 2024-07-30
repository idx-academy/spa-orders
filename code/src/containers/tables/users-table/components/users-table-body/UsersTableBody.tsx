import { UsersTableBodyProps } from "@/containers/tables/users-table/UsersTable.types";
import {
  roleBadges,
  statusBadges
} from "@/containers/tables/users-table/components/users-table-body/UsersTableBody.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import { UserRole } from "@/types/user.types";
import formatDate from "@/utils/format-date/formatDate";

const UsersTableBody = ({ user }: UsersTableBodyProps) => {
  // @TODO: replace with User type
  const roleBadgeDetails = roleBadges[user.role as UserRole];
  const roleBadge = (
    <AppBadge
      variant={roleBadgeDetails.variant}
      badgeContent={
        <AppTypography
          variant="caption-small"
          translationKey={roleBadgeDetails.translationKey}
        />
      }
    />
  );

  const statusBadgeDetails = statusBadges[user.status];
  const statusBadge = (
    <AppBadge
      variant={statusBadgeDetails.variant}
      badgeContent={
        <AppTypography
          variant="caption-small"
          translationKey={statusBadgeDetails.translationKey}
        />
      }
    />
  );

  return (
    <>
      <AppTableCell>
        {user.firstName} {user.lastName}
      </AppTableCell>
      <AppTableCell>{user.email}</AppTableCell>
      <AppTableCell>{roleBadge}</AppTableCell>
      <AppTableCell>{formatDate(user.createdAt)}</AppTableCell>
      <AppTableCell>{statusBadge}</AppTableCell>
    </>
  );
};

export default UsersTableBody;
