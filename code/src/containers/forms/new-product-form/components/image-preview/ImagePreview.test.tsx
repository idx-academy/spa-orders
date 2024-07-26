import { fireEvent, render, screen } from "@testing-library/react";
import { UseFormRegisterReturn } from "react-hook-form";

import ImagePreview from "@/containers/forms/new-product-form/components/image-preview/ImagePreview";

const mockOnChange = jest.fn();

const renderImagePreview = () => {
  render(
    <ImagePreview
      imageInputProps={
        { onChange: mockOnChange } as unknown as UseFormRegisterReturn<"image">
      }
    />
  );
};

const typeIntoImageInput = (value: string) => {
  const imageInput = screen.getByRole("textbox");

  fireEvent.change(imageInput, {
    target: {
      value
    }
  });
};

describe("Test image preview", () => {
  test("should render input and image preview text", () => {
    renderImagePreview();

    const imageInput = screen.getByRole("textbox");
    const imagePreviewText = screen.getByText("productForm.image.preview");

    expect(imageInput).toBeInTheDocument();
    expect(imagePreviewText).toBeInTheDocument();
  });

  test("should render image preview when input is filled", () => {
    renderImagePreview();

    typeIntoImageInput(
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg"
    );

    const imagePreview = screen.getByRole("img");
    expect(imagePreview).toBeInTheDocument();
  });

  test("should render image loading error message if url is incorrect", () => {
    renderImagePreview();

    typeIntoImageInput("https://invalid-url.com");

    const imageElement = screen.getByRole("img");

    fireEvent.error(imageElement);

    const imageErrorMsg = screen.getByText("productForm.image.previewError");
    expect(imageErrorMsg).toBeInTheDocument();
  });

  test("should call passed onChange function", () => {
    renderImagePreview();

    typeIntoImageInput(
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg"
    );

    expect(mockOnChange).toHaveBeenCalled();
  });
});
