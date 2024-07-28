import { fireEvent, screen } from "@testing-library/react";

import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";

import { ROLES } from "@/constants/common";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import {
  logout,
  useIsAuthLoadingSelector,
  useIsAuthSelector,
  useUserRoleSelector
} from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";
import { UserRole } from "@/types/user.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock(
  "@/layouts/header/components/header-toolbar/header-admin-toolbar/HeaderAdminToolbar",
  () => () => <div>Admin Toolbar</div>
);

jest.mock(
  "@/layouts/header/components/header-toolbar/header-shop-manager-toolbar/HeaderShopManagerToolbar",
  () => () => <div>Shop Manager Toolbar</div>
);

jest.mock(
  "@/layouts/header/components/header-toolbar/header-unauthorized-user-toolbar/HeaderUnauthorizedUserToolbar",
  () => () => <div>Unauthorized User Toolbar</div>
);

jest.mock(
  "@/layouts/header/components/header-toolbar/header-user-toolbar/HeaderUserToolbar",
  () => () => <div>User Toolbar</div>
);

jest.mock("@/store/slices/userSlice", () => ({
  useIsAuthLoadingSelector: jest.fn(),
  useIsAuthSelector: jest.fn(),
  useUserRoleSelector: jest.fn()
}));

type SetupMocks = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
};

const mockAndRender = ({
  isLoading = false,
  role = null
}: Partial<SetupMocks> = {}) => {
  (useIsAuthSelector as jest.Mock).mockReturnValue(Boolean(role));
  (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(isLoading);
  (useUserRoleSelector as jest.Mock).mockReturnValue(role);

  renderWithProviders(<HeaderToolbar />);
};

const testData = [
  { role: ROLES.ADMIN, text: "Admin Toolbar" },
  { role: ROLES.SHOP_MANAGER, text: "Shop Manager Toolbar" },
  { role: ROLES.USER, text: "User Toolbar" },
  { role: null, text: "Unauthorized User Toolbar" }
];

describe("Test HeaderToolbar", () => {
  test("Should render logo and search field", () => {
    mockAndRender();

    const logo = screen.getByAltText("App logo");
    const searchField = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(searchField).toBeInTheDocument();
  });

  test("Should render loaders when authenticatin loading is in progress", () => {
    mockAndRender({ isLoading: true });

    const loaders = screen.getAllByTestId("header-icon-loader");
    expect(loaders).toHaveLength(4);
  });

  test.each(testData)(
    "Should render propriate component when the role is $role",
    ({ role, text }) => {
      mockAndRender({ role });
      const toolbar = screen.getByText(text);
      expect(toolbar).toBeInTheDocument;
    }
  );
});
