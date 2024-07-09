import { render, screen } from "@testing-library/react";

import AppTooltip from "@/components/app-tooltip/AppTooltip";

describe("AppTooltip", () => {
  test("Should render tooltip with title text", () => {
    render(
      <AppTooltip titleTranslationKey="Tooltip">
        <span aria-label="Tooltip">Hover me</span>
      </AppTooltip>
    );
    const inputField = screen.getByLabelText("Tooltip");
    expect(inputField).toBeInTheDocument();
  });
});
