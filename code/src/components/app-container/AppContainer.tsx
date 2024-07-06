import Container from "@mui/material/Container";

import { AppContainerProps } from "@/components/app-container/AppContainer.types";

const AppContainer = (props: AppContainerProps) => {
  return <Container {...props} />;
};

export default AppContainer;
