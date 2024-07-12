import { screen } from "@testing-library/react";

import TabContainer from "@/containers/dashboard-tabs/components/tab-container/TabContainer";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("TabContainer", () => {
  test("renders with children", () => {
    renderWithProviders(
      <TabContainer>
        <div>children</div>
      </TabContainer>
    );

    const children = screen.getByText(/children/);
    expect(children).toBeInTheDocument();
  });
});
