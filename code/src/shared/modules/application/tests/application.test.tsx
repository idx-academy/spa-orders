import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Application from "@/shared/modules/application/application";
import I18nProivider from "@/shared/i18n/I18nProvider";

import "@testing-library/jest-dom";

describe("Application", () => {
  test("should render", () => {
    render(
      <I18nProivider>
        <BrowserRouter>
          <Application>items</Application>
        </BrowserRouter>
      </I18nProivider>
    );

    expect(
      screen.getByText("Hello, React with Webpack!!!")
    ).toBeInTheDocument();
  });
});
