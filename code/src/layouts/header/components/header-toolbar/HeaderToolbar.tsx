import HeaderSearchInput from "@/layouts/header/components/header-search-input/HeaderSearchInput";
import getHeaderToolbarByRole from "@/layouts/header/utils/get-header-toolbar-by-role/getHeaderToolbarByRole";

import LanguageSelect from "@/containers/language-select/LanguageSelect";

import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppLoader from "@/components/app-loader/AppLoader";
import AppLogo from "@/components/app-logo/AppLogo";

import {
  useIsAuthLoadingSelector,
  useUserRoleSelector
} from "@/store/slices/userSlice";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

const HeaderToolbar = () => {
  const role = useUserRoleSelector();
  const isAuthLoading = useIsAuthLoadingSelector();

  const headerNavigation = getHeaderToolbarByRole(role);

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
