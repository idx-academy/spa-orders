import { render, screen } from "@testing-library/react";

import getHeaderToolbarByRole from "@/layouts/header/utils/get-header-toolbar-by-role/getHeaderToolbarByRole";

import { ROLES } from "@/constants/common";

jest.mock(
  "@/layouts/header/components/header-toolbar/header-admin-toolbar/HeaderAdminToolbar",
  () => ({
    __esModule: true,
    default: jest.fn(() => <div>HeaderAdminToolbar</div>)
  })
);

jest.mock(
  "@/layouts/header/components/header-toolbar/header-shop-manager-toolbar/HeaderShopManagerToolbar",
  () => ({
    __esModule: true,
    default: jest.fn(() => <div>HeaderShopManagerToolbar</div>)
  })
);

jest.mock(
  "@/layouts/header/components/header-toolbar/header-unauthorized-user-toolbar/HeaderUnauthorizedUserToolbar",
  () => ({
    __esModule: true,
    default: jest.fn(() => <div>HeaderUnauthorizedUserToolbar</div>)
  })
);

jest.mock(
  "@/layouts/header/components/header-toolbar/header-user-toolbar/HeaderUserToolbar",
  () => ({
    __esModule: true,
    default: jest.fn(() => <div>HeaderUserToolbar</div>)
  })
);

const testData = [
  {
    role: ROLES.ADMIN,
    textToSearch: "HeaderAdminToolbar"
  },
  {
    role: ROLES.SHOP_MANAGER,
    textToSearch: "HeaderShopManagerToolbar"
  },
  {
    role: ROLES.USER,
    textToSearch: "HeaderUserToolbar"
  },
  {
    role: null,
    textToSearch: "HeaderUnauthorizedUserToolbar"
  }
];

describe("Test getHeaderToolbarByRole", () => {
  test.each(testData)(
    "should render toolbar for role $role",
    ({ role, textToSearch }) => {
      render(getHeaderToolbarByRole(role));

      const toolbar = screen.getByText(textToSearch);
      expect(toolbar).toBeInTheDocument();
    }
  );
});
