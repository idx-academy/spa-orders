import Container from "@mui/material/Container";
import { AppContainerProps } from "./AppContainer.types";

const AppContainer = (props: AppContainerProps) => {
  return <Container {...props} />;
};

export default AppContainer;
