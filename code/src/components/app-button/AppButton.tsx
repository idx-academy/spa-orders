import Button, { ButtonProps } from "@mui/material/Button";
import "@/components/app-button/AppButton.scss";

type AppButtonProps = ButtonProps & {};

// @TODO: It is just an example. Remove it or modify later
export default function AppButton({
  children,
  className,
  variant = "contained"
}: AppButtonProps) {
  return (
    <Button className={`button button__${variant} ${className}`}>
      {children}
    </Button>
  );
}
