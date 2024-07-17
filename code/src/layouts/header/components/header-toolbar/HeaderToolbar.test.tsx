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

// import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockOpenDrawer = jest.fn();

jest.mock("@/context/drawer/DrawerContext", () => ({
  ...jest.requireActual("@/context/drawer/DrawerContext"),
  useDrawerContext: jest.fn(() => ({ openDrawer: mockOpenDrawer }))
}));

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  default: () => ({}),
  useIsAuthSelector: jest.fn(),
  useIsAuthLoadingSelector: jest.fn(),
  useUserRoleSelector: jest.fn(),
  useUserDetailsSelector: jest.fn(),
  logout: jest.fn()
}));

jest.mock("@/store/api/cartApi", () => ({
  __esModule: true,
  default: {
    util: {
      resetApiState: jest.fn()
    }
  }
}));

jest.mock("@/store/slices/localCart", () => ({
  endpoints: {
    getCartItems: {
      matchFulfilled: jest.fn()
    }
  },
  clearLocalCart: jest.fn()
}));

jest.mock("@/hooks/use-get-cart/useGetCart", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/containers/modals/auth/AuthModal", () => ({
  __esModule: true,
  default: () => "ModalContent"
}));

jest.mock("@/hooks/use-redux/useRedux", () => ({
  __esModule: true,
  useAppDispatch: jest.fn()
}));

const mockDispatch = jest.fn();
(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

const mockedRoles = [
  {
    role: ROLES.SHOP_MANAGER,
    shouldRenderDashboard: true,
    shouldRenderOrders: false,
    shouldRenderCart: false
  },
  {
    role: ROLES.ADMIN,
    shouldRenderDashboard: true,
    shouldRenderOrders: false,
    shouldRenderCart: false
  }
];

const mockCartItems = [
  {
    productId: "1",
    name: "Product 1",
    productPrice: 20,
    quantity: 99,
    image: "some image 1",
    calculatedPrice: 20
  },
  {
    productId: "2",
    name: "Product 2",
    productPrice: 20,
    quantity: 3,
    image: "some image 2",
    calculatedPrice: 60
  }
];

const cartItemsTestCases = [
  {
    name: "Renders quantity correctly when total quantity < 99",
    cartItems: [mockCartItems[0]],
    expectedContent: mockCartItems[0].quantity
  },
  {
    name: "Renders quantity correctly when total quantity equals 99",
    cartItems: [mockCartItems[1]],
    expectedContent: mockCartItems[1].quantity
  },
  {
    name: "Renders quantity correctly when total quantity > 99",
    cartItems: mockCartItems,
    expectedContent: "99+"
  }
];

type SetupMocks = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole;
  cartItems: CartItem[];
};

const mockAndRender = ({
  isAuthenticated = false,
  isLoading = false,
  role,
  cartItems = []
}: Partial<SetupMocks> = {}) => {
  (useIsAuthSelector as jest.Mock).mockReturnValue(isAuthenticated);
  (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(isLoading);
  (useGetCart as jest.Mock).mockReturnValue({ data: { items: cartItems } });

  if (role) {
    (useUserRoleSelector as jest.Mock).mockReturnValue(role);
  }

  renderWithProviders(<HeaderToolbar />);
};

const doesNotRenderCartButtonTest = () => {
  test("does not render cart button", () => {
    const cartIcon = screen.queryByTestId("ShoppingCartIcon");
    expect(cartIcon).not.toBeInTheDocument();
  });
};

const doesNotRenderOrdersButtonTest = () => {
  test("does not render orders button", () => {
    const ordersButton = screen.queryByTestId("ListAltIcon");
    expect(ordersButton).not.toBeInTheDocument();
  });
};

describe("HeaderToolbar", () => {
  describe("for guest users", () => {
    describe("without cart items", () => {
      beforeEach(() => {
        mockAndRender();
      });

      test("renders the logo", () => {
        const logo = screen.getByAltText("App logo");
        expect(logo).toBeInTheDocument();
      });

      test("opens modal when login button is clicked", () => {
        const signInButton = screen.getByRole("button", {
          name: "signIn.label"
        });
        fireEvent.click(signInButton);

        const modalContent = screen.getByText("ModalContent");
        expect(modalContent).toBeInTheDocument();
      });

      test("renders the cart icon", () => {
        const cartIcon = screen.getByTestId("ShoppingCartIcon");
        expect(cartIcon).toBeInTheDocument();
      });

      test("opens the drawer when we click cart icon", () => {
        const cartIcon = screen.getByTestId("ShoppingCartIcon");
        fireEvent.click(cartIcon);
        expect(mockOpenDrawer).toHaveBeenCalled();
      });
    });

    describe("with cart items", () => {
      cartItemsTestCases.forEach((testCase) => {
        test(testCase.name, () => {
          mockAndRender({ cartItems: testCase.cartItems });

          const cartItemsCountBadge = screen.getByTestId("cart-items-count");
          expect(cartItemsCountBadge).toHaveTextContent(
            testCase.expectedContent.toString()
          );
        });
      });
    });
  });

  describe("loading states", () => {
    beforeEach(() => {
      mockAndRender({ isLoading: true });
    });

    doesNotRenderCartButtonTest();
    doesNotRenderOrdersButtonTest();

    test("does not render dashboard button", () => {
      const dashboardButton = screen.queryByTestId("DashboardCustomizeIcon");
      expect(dashboardButton).not.toBeInTheDocument();
    });
  });

  describe("for authenticated users", () => {
    let logoutButton: HTMLButtonElement;

    beforeEach(() => {
      mockAndRender({ isAuthenticated: true, role: ROLES.USER });
      logoutButton = screen
        .getByTestId("LogoutButton")
        .closest("button") as HTMLButtonElement;
    });

    test("renders logout button correctly", () => {
      expect(logoutButton).toBeInTheDocument();
    });

    test("triggers logout after clicking logout button", () => {
      fireEvent.click(logoutButton);
      expect(mockDispatch).toHaveBeenCalledWith(logout());
    });

    test("renders orders button", () => {
      const ordersButton = screen.getByTestId("ListAltIcon");
      expect(ordersButton).toBeInTheDocument();
    });
  });

  describe("HeaderToolbar for roles manager and admin", () => {
    mockedRoles.forEach(
      ({
        role,
        shouldRenderDashboard,
        shouldRenderOrders,
        shouldRenderCart
      }) => {
        describe(`for ${role}`, () => {
          beforeEach(() => {
            mockAndRender({ isAuthenticated: true, role });
          });

          if (shouldRenderDashboard) {
            test("renders dashboard button", () => {
              const dashboardButton = screen.getByTestId(
                "DashboardCustomizeIcon"
              );
              expect(dashboardButton).toBeInTheDocument();
            });
          }

          if (!shouldRenderCart) {
            doesNotRenderCartButtonTest();
          }

          if (!shouldRenderOrders) {
            doesNotRenderOrdersButtonTest();
          }
        });
      }
    );
  });

  // test("renders search field", () => {
  //   renderWithProviders(<HeaderToolbar />);

  //   const searchField = screen.getByPlaceholderText("Search...");
  //   expect(searchField).toBeInTheDocument();
  // });

  // test("changes input value", async () => {
  //   renderWithProviders(<HeaderToolbar />);

  //   const searchField = screen.getByPlaceholderText("Search...");
  //   expect(searchField).toBeInTheDocument();

  //   await typeIntoInput(searchField, "test");

  //   expect(searchField).toHaveValue("test");
  // });

  // test("clears input value when clear button is clicked", async () => {
  //   renderWithProviders(<HeaderToolbar />);

  //   const searchField = screen.getByPlaceholderText("Search...");
  //   expect(searchField).toBeInTheDocument();

  //   const clearButton = screen
  //     .getByTestId("ClearIcon")
  //     .closest("button") as HTMLButtonElement;

  //   await typeIntoInput(searchField, "Hello!");
  //   expect(searchField).toHaveValue("Hello!");

  //   fireEvent.click(clearButton);
  //   expect(searchField).toHaveValue("");
  // });
});
