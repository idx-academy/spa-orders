import { screen } from "@testing-library/react";

import AppDrawer from "@/components/app-drawer/AppDrawer";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("AppDrawer", () => {
  test("renders correctly", () => {
    renderWithProviders(<AppDrawer isOpen>DrawerContent</AppDrawer>);

    const drawerContent = screen.getByText("DrawerContent");

    expect(drawerContent).toBeInTheDocument();
  });
});
