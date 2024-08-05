import { fireEvent, render, screen } from "@testing-library/react";

import {
  ProductFormFieldErrors,
  ProductFormRegisterFunction
} from "@/containers/forms/product-form/ProductForm.types";
import MainInfo from "@/containers/forms/product-form/components/main-info/MainInfo";

import getTagIn from "@/utils/get-tag-in/getTagIn";

const errors = {
  productTranslations: [
    {
      name: {
        message: "Name error message"
      },
      description: {
        message: "Description error message"
      }
    },
    {
      name: {
        message: "Name error message"
      },
      description: {
        message: "Description error message"
      }
    }
  ]
} as ProductFormFieldErrors;

const rootError = {
  productTranslations: {
    root: {
      message: "Root error message"
    }
  }
} as ProductFormFieldErrors;

const registerFunction = (() => ({})) as unknown as ProductFormRegisterFunction;

const renderMainInfo = (mockErrors: ProductFormFieldErrors = errors) => {
  return render(<MainInfo register={registerFunction} errors={mockErrors} />);
};

describe("Test MainInfo component", () => {
  test("Should display inputs", () => {
    renderMainInfo();

    const nameInput = getTagIn(`product-form-name-input`);
    const descriptionInput = getTagIn(
      `product-form-description-input`,
      "textarea"
    );

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    expect(descriptionInput).toHaveClass("product-form__description-input");
  });

  test("Should display language buttons", () => {
    renderMainInfo();

    const langButtons = screen.getAllByTestId("product-form-language-button");

    expect(langButtons).toHaveLength(2);
    expect(langButtons[0]).toHaveClass("product-form__language-button--active");
    expect(langButtons[1]).not.toHaveClass(
      "product-form__language-button--active"
    );
  });

  test("Should navigate between languages", () => {
    renderMainInfo();

    const mainInfoBlockEn = screen.getByTestId("main-info-en");
    expect(mainInfoBlockEn).toBeInTheDocument();

    const ukButton = screen.getAllByTestId("product-form-language-button")[1];
    fireEvent.click(ukButton);

    const mainInfoBlockUk = screen.getByTestId("main-info-uk");
    expect(mainInfoBlockUk).toBeInTheDocument();
  });

  test("Should not display errors by default", () => {
    render(<MainInfo register={registerFunction} errors={{}} />);

    const nameInput = getTagIn(`product-form-name-input`);
    const descriptionInput = getTagIn(
      `product-form-description-input`,
      "textarea"
    );

    expect(nameInput.closest(".Mui-error")).toBeFalsy();
    expect(descriptionInput.closest(".Mui-error")).toBeFalsy();
  });

  test("Should have different button styles for error and active", () => {
    renderMainInfo();

    const langButtons = screen.getAllByTestId("product-form-language-button");

    expect(langButtons[0]).toHaveClass("product-form__language-button--active");
    expect(langButtons[1]).toHaveClass("product-form__language-button--error");
  });

  test("Should display helper text and have propriate styles when error", () => {
    renderMainInfo();

    const nameHelperText = screen.getByText("Name error message");
    const descriptionHelperText = screen.getByText("Description error message");

    expect(nameHelperText).toBeInTheDocument();
    expect(descriptionHelperText).toBeInTheDocument();

    const nameInput = getTagIn(`product-form-name-input`);
    const descriptionInput = getTagIn(
      `product-form-description-input`,
      "textarea"
    );

    expect(nameInput.closest(".Mui-error")).toBeTruthy();
    expect(descriptionInput.closest(".Mui-error")).toBeTruthy();
  });

  test("Should display root error", () => {
    renderMainInfo(rootError);

    const helperText = screen.getAllByText("Root error message");

    expect(helperText.length).toBe(2);
  });
});
