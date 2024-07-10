import { render, screen } from "@testing-library/react";

import AppInput from "@/components/app-input/AppInput";

describe("AppInput", () => {
  test("renders input field with label text", () => {
    render(<AppInput labelTranslationKey="Input" />);
    const inputField = screen.getByLabelText("Input");
    expect(inputField).toBeInTheDocument();
  });

  test("does not render label when labelTranslationKey is not passed", () => {
    render(<AppInput />);
    const inputField = screen.queryByLabelText("Input");
    expect(inputField).not.toBeInTheDocument();
  });
});
