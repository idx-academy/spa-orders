import Container, { ContainerProps } from "@mui/material/Container";

export type AppContainerProps = ContainerProps;

const AppContainer = (props: AppContainerProps) => {
  return <Container {...props} />;
};

export default AppContainer;
