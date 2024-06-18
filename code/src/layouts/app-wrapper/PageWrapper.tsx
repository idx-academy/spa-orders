import { Ref, forwardRef, PropsWithChildren } from "react";
import Container, { ContainerProps } from "@mui/material/Container";

const PageWrapper = (
  { children, ...rest }: PropsWithChildren<ContainerProps>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <Container maxWidth="lg" ref={ref} {...rest}>
      {children}
    </Container>
  );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(PageWrapper);