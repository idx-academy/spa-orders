import { UsersTableBodyProps } from "@/containers/tables/users-table/UsersTable.types";
import {
  roleBadges,
  statusBadges
} from "@/containers/tables/users-table/components/users-table-body/UsersTableBody.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import formatDate from "@/utils/format-date/formatDate";

const UsersTableBody = ({ user }: UsersTableBodyProps) => {
  const roleBadgeDetails = roleBadges[user.role];
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
        <AppTypography variant="caption">
          {user.firstName} {user.lastName}
        </AppTypography>
      </AppTableCell>
      <AppTableCell>
        <AppTypography variant="caption">{user.email}</AppTypography>
      </AppTableCell>
      <AppTableCell>{roleBadge}</AppTableCell>
      <AppTableCell>
        <AppTypography variant="caption">
          {formatDate(user.createdAt)}
        </AppTypography>
      </AppTableCell>
      <AppTableCell>{statusBadge}</AppTableCell>
    </>
  );
};

export default UsersTableBody;
