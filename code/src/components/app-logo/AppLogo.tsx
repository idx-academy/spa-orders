import AppBox from "@/components/app-box/AppBox";
import logo from "@/assets/images/logo.png";
import cn from "@/utils/cn";
import { AppLogoType, COMPONENT } from "@/components/app-logo/AppLogo.types";

const AppLogo = ({ className, ...props }: AppLogoType) => {
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
