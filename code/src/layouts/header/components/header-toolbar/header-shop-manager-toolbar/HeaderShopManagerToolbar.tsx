import HeaderDashboardButton from "@/layouts/header/components/header-buttons/header-dashboard-button/HeaderDashboardButton";
import HeaderLogoutButton from "@/layouts/header/components/header-buttons/header-logout-button/HeaderLogoutButton";

const HeaderShopManagerToolbar = () => {
  return (
    <>
      <HeaderDashboardButton />
      <HeaderLogoutButton />
    </>
  );
};

export default HeaderShopManagerToolbar;
