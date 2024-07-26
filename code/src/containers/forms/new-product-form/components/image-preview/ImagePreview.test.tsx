import { fireEvent, render, screen } from "@testing-library/react";
import { UseFormRegisterReturn } from "react-hook-form";

import ImagePreview from "@/containers/forms/new-product-form/components/image-preview/ImagePreview";

import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockOnChange = jest.fn();

describe("Test image preview", () => {
  let imageInput: HTMLInputElement;

  beforeEach(() => {
    render(
      <ImagePreview
        imageInputProps={
          {
            onChange: mockOnChange
          } as unknown as UseFormRegisterReturn<"image">
        }
      />
    );

    imageInput = screen.getByRole("textbox");
  });

  test("should render input and image preview text", () => {
    const imageInput = screen.getByRole("textbox");
    const imagePreviewText = screen.getByText("productForm.image.preview");

    expect(imageInput).toBeInTheDocument();
    expect(imagePreviewText).toBeInTheDocument();
  });

  test("should render image preview when input is filled", async () => {
    await typeIntoInput(
      imageInput,
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg"
    );

    const imagePreview = screen.getByRole("img");
    expect(imagePreview).toBeInTheDocument();
  });

  test("should render image loading error message if url is incorrect", async () => {
    await typeIntoInput(imageInput, "https://invalid-url.com");

    const imageElement = screen.getByRole("img");

    fireEvent.error(imageElement);

    const imageErrorMsg = screen.getByText("productForm.image.previewError");
    expect(imageErrorMsg).toBeInTheDocument();
  });

  test("should call passed onChange function", async () => {
    await typeIntoInput(
      imageInput,
      "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/computer_1-J0a7bI2jB5NozuSaXnzyMtxHyijWoD.jpg"
    );

    expect(mockOnChange).toHaveBeenCalled();
  });
});
