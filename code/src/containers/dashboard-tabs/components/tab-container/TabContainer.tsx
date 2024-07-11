import { PropsWithChildren } from "react";

import AppContainer from "@/components/app-container/AppContainer";

import "@/containers/dashboard-tabs/components/tab-container/TabContainer.scss";

type TabContainerProps = PropsWithChildren;

const TabContainer = ({ children }: TabContainerProps) => {
  return <AppContainer className="tab-container">{children}</AppContainer>;
};

export default TabContainer;
