import { ComponentPropsWithoutRef } from "react";
import AppBox from "@/components/app-box/AppBox";
import logo from "@/assets/images/logo.png";
import cn from "@/utils/cn";

const COMPONENT = "img";

type AppLogo = Omit<
  ComponentPropsWithoutRef<typeof COMPONENT>,
  "component" | "src" | "alt"
>;

const AppLogo = ({ className, ...props }: AppLogo) => {
  return (
    <AppBox
      component={COMPONENT}
      src={logo}
      alt="App logo"
      className={cn("spa-logo", className)}
      {...props}
    />
  );
};

export default AppLogo;
