import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AppTooltip from "@/components/app-tooltip/AppTooltip";

describe("AppTooltip", () => {
  test("Should render tooltip with title text", () => {
    render(
      <AppTooltip titleTranslationKey="tooltip title">
        <span aria-label="Tooltip">Hover me</span>
      </AppTooltip>
    );
    const tooltipChildren = screen.getByLabelText("Tooltip");
    expect(tooltipChildren).toBeInTheDocument();

    waitFor(() => {
      fireEvent.mouseOver(tooltipChildren);
      const toolipTitle = screen.getByText("tooltip title");
      expect(toolipTitle).toBeInTheDocument();
    });
  });

  test("Should render tooltip without title text", () => {
    render(
      <AppTooltip>
        <span aria-label="Tooltip">Hover me</span>
      </AppTooltip>
    );
    const tooltipChildren = screen.getByLabelText("Tooltip");

    waitFor(() => {
      fireEvent.mouseOver(tooltipChildren);
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).not.toBeInTheDocument();
    });
  });
});
