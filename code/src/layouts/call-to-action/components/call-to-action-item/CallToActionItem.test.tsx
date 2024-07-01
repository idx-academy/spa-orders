import { screen } from "@testing-library/react";
import CallToActionItem from "@/layouts/call-to-action/components/call-to-action-item/CallToActionItem";
import callToActionItems from "@/layouts/call-to-action/CallToAction.constants";
import { renderWithProviders } from "@/utils/test-utils";

const mockImageUrl =
  "https://www.softserveinc.com/cdn/img/icons/favicon-32x32.png";

describe("CallToActionItem", () => {
  beforeEach(() => {
    renderWithProviders(
      <CallToActionItem {...callToActionItems[0]} imageUrl={mockImageUrl} />
    );
  });

  test("renders correctly", () => {
    const title = screen.getByText("callToAction.phones.title");
    expect(title).toBeInTheDocument();
  });

  test("renders the correct image link", () => {
    const imgContainer = screen.getByText(
      callToActionItems[0].captionTranslationKey
    ).parentElement;

    expect(imgContainer).toHaveStyle(`backgroundImage: url(${mockImageUrl})`);
  });
});
