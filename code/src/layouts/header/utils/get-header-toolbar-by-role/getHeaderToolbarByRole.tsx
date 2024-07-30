import HeaderAdminToolbar from "@/layouts/header/components/header-toolbar/header-admin-toolbar/HeaderAdminToolbar";
import HeaderShopManagerToolbar from "@/layouts/header/components/header-toolbar/header-shop-manager-toolbar/HeaderShopManagerToolbar";
import HeaderUnauthorizedUserToolbar from "@/layouts/header/components/header-toolbar/header-unauthorized-user-toolbar/HeaderUnauthorizedUserToolbar";
import HeaderUserToolbar from "@/layouts/header/components/header-toolbar/header-user-toolbar/HeaderUserToolbar";

import { ROLES } from "@/constants/common";

const getHeaderToolbarByRole = (role: string | null) => {
  switch (role) {
    case ROLES.ADMIN:
      return <HeaderAdminToolbar />;
    case ROLES.SHOP_MANAGER:
      return <HeaderShopManagerToolbar />;
    case ROLES.USER:
      return <HeaderUserToolbar />;
    default:
      return <HeaderUnauthorizedUserToolbar />;
  }
};

export default getHeaderToolbarByRole;
