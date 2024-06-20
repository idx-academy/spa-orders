import { render, screen } from "@testing-library/react";
import AppBanner from "@/layouts/app-banner/AppBanner";
import I18nProivider from "@/shared/i18n/I18nProvider";

jest.mock("@/assets/images/home-page/hero_section_img.jpg", () => {});

describe("AppBanner", () => {
  test("should render AppBanner component", () => {
    render(
      <I18nProivider>
        <AppBanner />
      </I18nProivider>
    );
    const headerText = screen.getByText(
      /Incredible Prices on All Your Favorite Items/i
    );
    expect(headerText).toBeInTheDocument();
  });
});
