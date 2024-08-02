import { fireEvent, render, screen } from "@testing-library/react";
import { Controller, ControllerRenderProps } from "react-hook-form";

import {
  ProductFormControl,
  ProductFormFieldErrors,
  ProductFormRegisterFunction
} from "@/containers/forms/product-form/ProductForm.types";
import ImagePreview from "@/containers/forms/product-form/components/image/Image";

import getTagIn from "@/utils/get-tag-in/getTagIn";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

type MockControllerProps = {
  render: (props: { field: ControllerRenderProps }) => JSX.Element;
};

jest.mock("react-hook-form", () => ({
  Controller: jest.fn()
}));

const imageError = {
  image: {
    message: "Image error"
  }
} as unknown as ProductFormFieldErrors;

const controllerPropsWithValue = {
  value: "https://test.com/image.jpg"
} as ControllerRenderProps;

const registerFunction = (() => ({})) as unknown as ProductFormRegisterFunction;
const controlFunction = (() => ({})) as unknown as ProductFormControl;

const renderAndMock = (
  controllerRenderProps: ControllerRenderProps = {} as ControllerRenderProps,
  errors: ProductFormFieldErrors = {}
) => {
  (Controller as jest.Mock).mockImplementation(
    ({ render }: MockControllerProps) =>
      render({
        field: controllerRenderProps
      })
  );

  render(
    <ImagePreview
      register={registerFunction}
      errors={errors}
      control={controlFunction}
    />
  );
};

describe("Test Image", () => {
  test("should render input and image preview text", () => {
    renderAndMock();

    const imageInput = screen.getByRole("textbox");
    const imagePreviewText = screen.getByText("productForm.image.preview");

    expect(imageInput).toBeInTheDocument();
    expect(imagePreviewText).toBeInTheDocument();
  });

  test("Should render helper text and change styles when error", () => {
    renderAndMock(undefined, imageError);

    const imageHelperText = screen.getByText("Image error");
    const imageInput = getTagIn("product-form-image-input");

    expect(imageHelperText).toBeInTheDocument();
    expect(imageInput.closest(".Mui-error")).toBeTruthy();
  });

  test("Should not display error by default", () => {
    renderAndMock();

    const imageInput = getTagIn("product-form-image-input");

    expect(imageInput.closest(".Mui-error")).toBeFalsy();
  });

  test("Should show error if image is invalid and clear it when valid value provided", async () => {
    renderAndMock({
      value: "https://test.com/image.jpg",
      onChange: () => {}
    } as ControllerRenderProps);

    const image = screen.getByTestId("product-form-image-preview");
    fireEvent.error(image);

    const error = screen.getByText("productForm.image.previewError");
    expect(error).toBeInTheDocument();

    const imageInput = getTagIn("product-form-image-input");
    await typeIntoInput(imageInput, "https://test.com/example.jpg");

    const imageEl = screen.getByTestId("product-form-image-preview");
    expect(imageEl).toBeInTheDocument();
  });

  test("Should show image when image input is filled", async () => {
    renderAndMock(controllerPropsWithValue);

    const image = screen.getByTestId("product-form-image-preview");

    expect(image).toBeInTheDocument();
  });

  test("Should show default image text if image input is empty", () => {
    renderAndMock();

    const imageText = screen.getByText("productForm.image.preview");

    expect(imageText).toBeInTheDocument();
  });
});
