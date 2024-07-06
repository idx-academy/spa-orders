import { PropsWithChildren, Ref, forwardRef } from "react";

import AppContainer from "@/components/app-container/AppContainer";
import { AppContainerProps } from "@/components/app-container/AppContainer.types";

import "@/layouts/page-wrapper/PageWrapper.scss";

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
