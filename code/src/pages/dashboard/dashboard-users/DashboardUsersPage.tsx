import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import UsersTable from "@/containers/tables/users-table/UsersTable";

import AppTypography from "@/components/app-typography/AppTypography";

import { useGetUsersForAdminDashboardQuery } from "@/store/api/usersApi";

const DashboardUsersPage = () => {
  const { data, isLoading, isError } = useGetUsersForAdminDashboardQuery();

  // @TODO: Add loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // @TODO: Add error state
  if (isError) {
    return <div>Error</div>;
  }

  const users = data?.content ?? [];

  return (
    <DashboardTabContainer>
      <AppTypography
        component="h1"
        variant="h3"
        translationKey="dashboardTabs.users.label"
      />
      <UsersTable users={users} />
    </DashboardTabContainer>
  );
};

export default DashboardUsersPage;
