import LogoutIcon from "@mui/icons-material/Logout";

import AppButton from "@/components/app-button/AppButton";

import useLogout from "@/hooks/use-logout/useLogout";

const HeaderLogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <AppButton
      onClick={handleLogout}
      variant="danger"
      size="small"
      key="auth-button"
      data-testid="header-logout-button"
    >
      <LogoutIcon />
    </AppButton>
  );
};

export default HeaderLogoutButton;
