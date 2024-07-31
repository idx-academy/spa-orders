import { PropsWithChildren } from "react";

import AppContainer from "@/components/app-container/AppContainer";

import "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer.scss";

type TabContainerProps = PropsWithChildren;

const DashboardTabContainer = ({ children }: TabContainerProps) => {
  return (
    <AppContainer
      className="tab-container"
      data-testid="dashboard-tab-container"
    >
      {children}
    </AppContainer>
  );
};

export default DashboardTabContainer;
