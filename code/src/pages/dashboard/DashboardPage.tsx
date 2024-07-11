import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import DashboardTabs from "@/containers/dashboard-tabs/DashboardTabs";

import "@/pages/dashboard/DashboardPage.scss";

const DashboardPage = () => {
  return (
    <PageWrapper className="dashboard-page">
      <DashboardTabs />
    </PageWrapper>
  );
};

export default DashboardPage;
