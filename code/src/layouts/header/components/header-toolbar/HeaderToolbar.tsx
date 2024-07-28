import HeaderSearchInput from "@/layouts/header/components/header-search-input/HeaderSearchInput";
import HeaderAdminToolbar from "@/layouts/header/components/header-toolbar/header-admin-toolbar/HeaderAdminToolbar";
import HeaderShopManagerToolbar from "@/layouts/header/components/header-toolbar/header-shop-manager-toolbar/HeaderShopManagerToolbar";
import HeaderUnauthorizedUserToolbar from "@/layouts/header/components/header-toolbar/header-unauthorized-user-toolbar/HeaderUnauthorizedUserToolbar";
import HeaderUserToolbar from "@/layouts/header/components/header-toolbar/header-user-toolbar/HeaderUserToolbar";

import LanguageSelect from "@/containers/language-select/LanguageSelect";

import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppLoader from "@/components/app-loader/AppLoader";
import AppLogo from "@/components/app-logo/AppLogo";

import { ROLES } from "@/constants/common";
import {
  useIsAuthLoadingSelector,
  useUserRoleSelector
} from "@/store/slices/userSlice";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

const HeaderToolbar = () => {
  const role = useUserRoleSelector();
  const isAuthLoading = useIsAuthLoadingSelector();

  let headerNavigation;

  switch (role) {
    case ROLES.ADMIN:
      headerNavigation = <HeaderAdminToolbar />;
      break;
    case ROLES.SHOP_MANAGER:
      headerNavigation = <HeaderShopManagerToolbar />;
      break;
    case ROLES.USER:
      headerNavigation = <HeaderUserToolbar />;
      break;
    default:
      headerNavigation = <HeaderUnauthorizedUserToolbar />;
  }

  const content = isAuthLoading
    ? repeatComponent(<AppLoader data-testid="header-icon-loader" />, 4)
    : headerNavigation;

  return (
    <AppBox className="header__wrapper" data-cy="header-toolbar">
      <AppContainer maxWidth="xl" className="header__toolbar">
        <AppLink to="/">
          <AppLogo className="header__toolbar-logo-image" data-cy="logo" />
        </AppLink>
        <AppBox className="header__toolbar-action">
          <HeaderSearchInput />
          <AppBox className="header__toolbar-action-icons">
            <LanguageSelect />
            {content}
          </AppBox>
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default HeaderToolbar;
