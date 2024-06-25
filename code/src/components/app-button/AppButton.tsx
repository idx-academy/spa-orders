import Button, { ButtonProps } from "@mui/material/Button";
import AppLoader from "@/components/app-loader/AppLoader";
import cn from "@/utils/cn";

import "@/components/app-button/AppButton.scss";

type ButtonVariant =
  | "contained"
  | "outlined"
  | "text"
  | "danger"
  | "light"
  | "dark";
type ButtonSize = "small" | "medium" | "large" | "extra-large";

type AppButtonProps = Omit<ButtonProps, "variant" | "size"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

const AppButton = ({
  children,
  className,
  variant = "contained",
  size = "medium",
  disabled,
  isLoading,
  ...props
}: AppButtonProps) => {
  const isDisabled = disabled || isLoading;

  const loader = isLoading && <AppLoader variant="disabled" size="small" />;

  return (
    <Button
      disabled={isDisabled}
      className={cn(
        "spa-button",
        `spa-button__${variant}`,
        `spa-button__${size}`,
        className
      )}
      {...props}
    >
      {children}
      {loader}
    </Button>
  );
};

export default AppButton;
