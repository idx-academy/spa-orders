import Button, { ButtonProps } from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

import "@/components/app-button/AppButton.scss";

type ButtonVariant =
  | "contained"
  | "outlined"
  | "text"
  | "danger"
  | "white"
  | "black";
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
  
  //@TODO: Create a separate component for the loader
  const loader = isLoading && (
    <CircularProgress className="spa-loader" size={16} />
  );

  return (
    <Button
      disabled={isDisabled}
      className={`spa-button spa-button__${variant} spa-button__${size} ${className}`}
      {...props}
    >
      {children}
      {loader}
    </Button>
  );
};

export default AppButton;
