import { usersTableColumns } from "@/containers/tables/users-table/UsersTable.constants";
import { UsersTableProps } from "@/containers/tables/users-table/UsersTable.types";
import UsersTableBody from "@/containers/tables/users-table/components/users-table-body/UsersTableBody";
import UsersTableHead from "@/containers/tables/users-table/components/users-table-head/UsersTableHead";

import AppTable from "@/components/app-table/AppTable";
import AppTypography from "@/components/app-typography/AppTypography";

import { ExtendedUserDetails } from "@/types/user.types";

import "@/containers/tables/users-table/UsersTable.scss";

const UsersTable = ({ users }: UsersTableProps) => {
  const UsersTableBodyItem = (user: ExtendedUserDetails) => {
    return <UsersTableBody user={user} />;
  };

  const UsersTableHeadItem = (head: string) => (
    <UsersTableHead head={head} key={head} />
  );

  const usersTableFallback = (
    <AppTypography
      textAlign="center"
      variant="subtitle1"
      translationKey="usersTable.fallback"
    />
  );

  return (
    <AppTable
      classNames={{
        container: "users-table",
        body: "users-table__body",
        fallback: "users-table__fallback"
      }}
      headItems={usersTableColumns}
      bodyItems={users}
      fallback={usersTableFallback}
      renderBodyItem={UsersTableBodyItem}
      renderHeadItem={UsersTableHeadItem}
    />
  );
};

export default UsersTable;
