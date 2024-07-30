import { UsersTableHeadProps } from "@/containers/tables/users-table/UsersTable.types";

import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/tables/users-table/components/users-table-head/UsersTableHead.scss";

const UsersTableHead = ({ head }: UsersTableHeadProps) => {
  return (
    <AppTableCell className="users-table__head">
      <AppTypography translationKey={head} variant="caption" />
    </AppTableCell>
  );
};

export default UsersTableHead;
