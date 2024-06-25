import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import CallToActionItem from "@/layouts/call-to-action-item/CallToActionItem";
import callToActionItems from "@/pages/home/components/call-to-action/CallToAction.constants";

describe("CallToActionItem", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <CallToActionItem {...callToActionItems[0]} />
      </MemoryRouter>
    );

    const title = screen.getByText("callToActionSection.phones.title");
    expect(title).toBeInTheDocument();
  });
});
