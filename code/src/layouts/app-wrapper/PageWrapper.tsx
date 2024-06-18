import Container, { ContainerProps } from "@mui/material/Container";

const PageWrapper = ({ children, ...rest }: ContainerProps) => {
  return (
    <Container maxWidth="lg" {...rest}>
      {children}
    </Container>
  );
};

export default PageWrapper
