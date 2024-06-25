import { Ref, forwardRef, PropsWithChildren } from "react";

import AppContainer, {
  AppContainerProps
} from "@/components/app-container/AppContainer";

import "./PageWrapper.scss";

const PageWrapper = (
  { children, ...props }: PropsWithChildren<AppContainerProps>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <AppContainer
      className="spa-page-wrapper"
      maxWidth="xl"
      ref={ref}
      {...props}
    >
      {children}
    </AppContainer>
  );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<AppContainerProps>>(
  PageWrapper
);
