import { UsersTableBodyProps } from "@/containers/tables/users-table/UsersTable.types";
import {
  roleBadges,
  statusBadges
} from "@/containers/tables/users-table/components/users-table-body/UsersTableBody.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import useLongestTranslationLength from "@/hooks/use-longest-translation-length/useLongestTranslationLength";
import extractFullname from "@/utils/extract-fullname/extractFullname";
import formatDate from "@/utils/format-date/formatDate";

const UsersTableBody = ({ user }: UsersTableBodyProps) => {
  const roleBadgeWidth = useLongestTranslationLength(
    Object.values(roleBadges),
    (value) => value.translationKey
  );

  const statusBadgeWidth = useLongestTranslationLength(
    Object.values(statusBadges),
    (value) => value.translationKey
  );

  const { role, status, createdAt, email } = user;
  const fullName = extractFullname(user);

  const roleBadgeDetails = roleBadges[role];
  const roleBadge = (
    <AppBadge
      variant={roleBadgeDetails.variant}
      badgeContent={
        <AppTypography
          data-testid="role-badge"
          style={{ width: `${roleBadgeWidth}ch` }}
          variant="caption-small"
          translationKey={roleBadgeDetails.translationKey}
        />
      }
    />
  );

  const statusBadgeDetails = statusBadges[status];
  const statusBadge = (
    <AppBadge
      variant={statusBadgeDetails.variant}
      badgeContent={
        <AppTypography
          data-testid="status-badge"
          style={{ width: `${statusBadgeWidth}ch` }}
          variant="caption-small"
          translationKey={statusBadgeDetails.translationKey}
        />
      }
    />
  );

  return (
    <>
      <AppTableCell>
        <AppTypography variant="caption">{fullName}</AppTypography>
      </AppTableCell>
      <AppTableCell>
        <AppTypography variant="caption">{email}</AppTypography>
      </AppTableCell>
      <AppTableCell>{roleBadge}</AppTableCell>
      <AppTableCell>
        <AppTypography variant="caption">{formatDate(createdAt)}</AppTypography>
      </AppTableCell>
      <AppTableCell>{statusBadge}</AppTableCell>
    </>
  );
};

export default UsersTableBody;
