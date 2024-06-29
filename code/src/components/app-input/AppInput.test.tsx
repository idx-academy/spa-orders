import { render, screen } from "@testing-library/react";
import AppInput from "@/components/app-input/AppInput";

describe("AppInput", () => {
  test("Should render input field", () => {
    render(<AppInput label="Input" />);
    const inputField = screen.getByLabelText("Input");
    expect(inputField).toBeInTheDocument();
  });
});
