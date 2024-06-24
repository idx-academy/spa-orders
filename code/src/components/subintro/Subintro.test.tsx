import { IntlProvider } from "react-intl";
import { render, screen } from "@testing-library/react";
import Subintro from "@/components/subintro/Subintro";
import paragraphs from "@/shared/modules/application/i18n/en.json";
import subintroElements from "@/components/subintro/Subintro.constants";

describe("Subintro section", () =>{
test("renders four subintro elements correctly", () => {
  render(
    <IntlProvider locale="en" messages={paragraphs}>
      <Subintro />
    </IntlProvider>
  );

  const subintroItems = screen.getAllByTestId("spa-subintro-item");
  expect(subintroItems).toHaveLength(subintroElements.length);
})});
