import { render, screen } from "@testing-library/react";

import TabContainer from "@/containers/dashboard-tabs/components/tab-container/TabContainer";

describe("TabContainer", () => {
  test("renders with children", () => {
    render(
      <TabContainer>
        <div>children</div>
      </TabContainer>
    );

    const children = screen.getByText(/children/);
    expect(children).toBeInTheDocument();
  });
});
