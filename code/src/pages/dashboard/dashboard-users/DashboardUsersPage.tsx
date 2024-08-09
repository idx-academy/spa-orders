import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";
import PaginationBlock from "@/containers/pagination-block/PaginationBlock";
import UsersTable from "@/containers/tables/users-table/UsersTable";

import AppTypography from "@/components/app-typography/AppTypography";

import usePagination from "@/hooks/use-pagination/usePagination";
import { useGetUsersForAdminDashboardQuery } from "@/store/api/usersApi";

const DashboardUsersPage = () => {
  const { page } = usePagination();
  const { data, isLoading, isError } = useGetUsersForAdminDashboardQuery({
    page: page - 1,
    size: 8
  });

  if (isLoading) {
    return <PageLoadingFallback />;
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
      <PaginationBlock page={page} totalPages={data?.totalPages} />
    </DashboardTabContainer>
  );
};

export default DashboardUsersPage;
