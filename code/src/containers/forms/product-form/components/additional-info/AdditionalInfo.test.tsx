import { render, screen } from "@testing-library/react";
import { ControllerRenderProps } from "react-hook-form";

import {
  ProductFormControl,
  ProductFormFieldErrors,
  ProductFormRegisterFunction
} from "@/containers/forms/product-form/ProductForm.types";
import AdditionalInfo from "@/containers/forms/product-form/components/additional-info/AdditionalInfo";

import getTagIn from "@/utils/get-tag-in/getTagIn";

type MockControllerProps = {
  render: (props: { field: ControllerRenderProps }) => JSX.Element;
};

jest.mock("react-hook-form", () => ({
  Controller: ({ render }: MockControllerProps) =>
    render({
      field: { value: 1 } as ControllerRenderProps
    })
}));

const categoryError = {
  category: { message: "Category error" }
} as ProductFormFieldErrors;

const registerFunction = (() => ({})) as unknown as ProductFormRegisterFunction;
const controlFunction = (() => ({})) as unknown as ProductFormControl;

const renderAdditionalInfo = (errors: ProductFormFieldErrors = {}) => {
  return render(
    <AdditionalInfo
      register={registerFunction}
      errors={errors}
      control={controlFunction}
    />
  );
};

describe("Test AdditionalInfo component", () => {
  test("Should render inputs", () => {
    renderAdditionalInfo();

    const categorySelect = screen.getByTestId("product-form-category-select");
    const priceInput = getTagIn("product-form-price-input");
    const quantityInput = getTagIn("product-form-quantity-input");

    expect(priceInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();
  });

  test("Inputs should have propriate attributes and classnames", () => {
    const { container } = renderAdditionalInfo();

    const selectInput = container.querySelector(
      ".product-form__category-select"
    );
    const priceInput = getTagIn("product-form-price-input");
    const quantityInput = getTagIn("product-form-quantity-input");

    expect(selectInput).toBeInTheDocument();
    expect(priceInput).toHaveAttribute("min", "0");
    expect(quantityInput).toHaveAttribute("min", "0");
  });

  test("Should not show error by default", () => {
    renderAdditionalInfo();

    const priceInput = screen.getByTestId("product-form-price-input");
    const quantityInput = screen.getByTestId("product-form-quantity-input");

    expect(priceInput.closest(".Mui-error")).toBeFalsy();
    expect(quantityInput.closest(".Mui-error")).toBeFalsy();
  });

  test("Should show error and have propriate error styles", () => {
    renderAdditionalInfo(categoryError);

    const categoryErrorElement = screen.getByText("Category error");
    const categorySelect = screen.getByTestId("product-form-category-select");

    expect(categoryErrorElement).toBeInTheDocument();
    expect(categorySelect.closest(".Mui-error")).toBeTruthy();
  });
});
