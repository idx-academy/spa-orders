import { Ref, forwardRef, PropsWithChildren } from "react";

import AppContainer, {
  AppContainerProps
} from "@/components/app-container/AppContainer";

const PageWrapper = (
  { children, ...rest }: PropsWithChildren<AppContainerProps>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <AppContainer maxWidth="lg" ref={ref} {...rest}>
      {children}
    </AppContainer>
  );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<AppContainerProps>>(
  PageWrapper
);
