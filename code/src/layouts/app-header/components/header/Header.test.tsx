import { FormattedMessage } from "react-intl";
import { render, screen } from "@testing-library/react";
import Header from "@/layouts/app-header/components/header/Header";

jest.mock("react-intl", () => ({
  FormattedMessage: jest.fn()
}));

describe("Header Component", () => {
  test("render the logo", () => {
    (FormattedMessage as jest.Mock).mockReturnValueOnce("Logo");

    render(<Header />);

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });
});
