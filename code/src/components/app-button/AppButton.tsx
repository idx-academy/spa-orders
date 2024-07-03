import { ForwardedRef, forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";

import Button from "@mui/material/Button";
import AppLoader from "@/components/app-loader/AppLoader";

import cn from "@/utils/cn/cn";

import { AppButtonProps } from "@/components/app-button/AppButton.types";

import "@/components/app-button/AppButton.scss";

const AppButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AppButtonProps
>(
  (
    {
      children,
      className,
      variant = "contained",
      size = "medium",
      disabled,
      isLoading,
      isNavLink,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const loader = isLoading && <AppLoader variant="disabled" size="small" />;

    const linkComponent = isNavLink ? NavLink : Link;

    const containerComponent = props.to ? linkComponent : undefined;

    return (
      <Button
        disabled={isDisabled}
        className={cn(
          "spa-button",
          `spa-button__${variant}`,
          `spa-button__${size}`,
          className
        )}
        component={containerComponent}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...props}
      >
        {children}
        {loader}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";

export default AppButton;
