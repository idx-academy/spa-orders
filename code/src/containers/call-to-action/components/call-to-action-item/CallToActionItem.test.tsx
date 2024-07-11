import { screen } from "@testing-library/react";

import callToActionItems from "@/containers/call-to-action/CallToAction.constants";
import CallToActionItem from "@/containers/call-to-action/components/call-to-action-item/CallToActionItem";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockImageUrl =
  "https://www.softserveinc.com/cdn/img/icons/favicon-32x32.png";

describe("CallToActionItem", () => {
  beforeEach(() => {
    renderWithProviders(
      <CallToActionItem {...callToActionItems[0]} imageUrl={mockImageUrl} />
    );
  });

  test("renders correctly", () => {
    const title = screen.getByText("callToAction.mobiles.title");
    expect(title).toBeInTheDocument();
  });

  test("renders the correct image link", () => {
    const imgContainer = screen.getByText(
      callToActionItems[0].captionTranslationKey
    ).parentElement;

    expect(imgContainer).toHaveStyle(`backgroundImage: url(${mockImageUrl})`);
  });
});
