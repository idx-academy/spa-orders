import { render, screen } from "@testing-library/react";
import AppBanner from "@/layouts/app-banner/AppBanner";
import I18nProivider from "@/shared/i18n/I18nProvider";

describe("AppBanner", () => {
  test("should render AppBanner component", () => {
    render(
      <I18nProivider>
        <AppBanner/>
      </I18nProivider>
    );
    const headerText = screen.getByText("Welcome");
    expect(headerText).toBeInTheDocument();
  });
});
