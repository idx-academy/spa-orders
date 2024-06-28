import { fireEvent, render, screen } from "@testing-library/react";
import AppInput from "@/components/app-input/AppInput";

describe("AppInput", () => {
  test("Should render input field", () => {
    render(<AppInput label="Input" />);
    const regularInputField = screen.getByLabelText("Input");
    expect(regularInputField).toBeInTheDocument();
  });
});
