import DashboardTabs from "@/containers/dashboard-tabs/DashboardTabs";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import "@/pages/dashboard/DashboardPage.scss";

const DashboardPage = () => {
  return (
    <PageWrapper className="dashboard-page">
      <DashboardTabs />
    </PageWrapper>
  );
};

export default DashboardPage;
