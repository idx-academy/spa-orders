import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import Header from "@/layouts/app-header/components/header/Header";

jest.mock("@/assets/images/logo.jpeg", () => {});
jest.mock("react-intl", () => ({
  ...jest.requireActual("react-intl"),
  FormattedMessage: ({ value }) => <span>{value}</span>
}));

describe("Header Component", () => {
  test("render the logo", () => {
    render(
      <IntlProvider locale="en">
        <Header />
      </IntlProvider>
    );
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });
});
