import HeaderOrdersButton from "@/layouts/header/components/header-buttons/header-orders-button/HeaderOrdersButton";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("Test HeaderOrdersButton", () => {
  test("renders HeaderOrdersButton component", () => {
    const { getByTestId } = renderWithProviders(<HeaderOrdersButton />);
    const headerOrdersButton = getByTestId("header-orders-button");
    expect(headerOrdersButton).toBeInTheDocument();
  });
});
