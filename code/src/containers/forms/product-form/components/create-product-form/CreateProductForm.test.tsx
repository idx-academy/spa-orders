import { act, fireEvent, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import CreateProductForm from "@/containers/forms/product-form/components/create-product-form/CreateProductForm";

import getTagIn from "@/utils/get-tag-in/getTagIn";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockUnwrap = jest.fn();
const mockCreateProduct = jest.fn(() => ({ unwrap: mockUnwrap }));

jest.mock(
  "@/containers/forms/product-form/hooks/use-create-product/useCreateProduct",
  () => ({
    __esModule: true,
    default: () => [mockCreateProduct, { isLoading: false }]
  })
);

const expectedBody = {
  status: "VISIBLE",
  image: "https://example.com",
  quantity: 100,
  price: 100,
  tagIds: [3],
  productTranslations: [
    {
      name: "name",
      description: "example description",
      languageCode: "en"
    }
  ]
};

let imgUrlInput: HTMLInputElement;
let priceInput: HTMLInputElement;
let quantityInput: HTMLInputElement;
let categorySelect: HTMLSpanElement;
let nameInput: HTMLInputElement;
let descriptionInput: HTMLTextAreaElement;
let submitButton: HTMLButtonElement;
let statusInput: HTMLInputElement;

const submit = async () => await act(async () => fireEvent.click(submitButton));

const selectCategory = async () => {
  await act(async () => fireEvent.mouseDown(categorySelect));
  const categoryOption = screen.getByText("productsAll.computer");
  await act(async () => fireEvent.click(categoryOption));
};

describe("Test CreateProductForm", () => {
  beforeEach(() => {
    const result = renderWithProviders(<CreateProductForm />);

    imgUrlInput = getTagIn("product-form-image-input");
    priceInput = getTagIn("product-form-price-input");
    quantityInput = getTagIn("product-form-quantity-input");
    categorySelect = screen.getByLabelText("productForm.inputLabel.category");
    nameInput = getTagIn(`product-form-name-input`);
    descriptionInput = getTagIn(`product-form-description-input`, "textarea");
    statusInput = getTagIn("product-form-status-checkbox");
    submitButton = screen.getByText("productForm.create.submit");

    return result;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be rendered correctly", () => {
    const imageSectionTitle = screen.getByText(
      "productForm.section.image.title"
    );
    const mainInforEnSectionTitle = screen.getByText(
      "productForm.section.mainInformation.title"
    );
    const additionalInfoSectionTitle = screen.getByText(
      "productForm.section.additionalInformation.title"
    );

    expect(imageSectionTitle).toBeInTheDocument();
    expect(mainInforEnSectionTitle).toBeInTheDocument();
    expect(additionalInfoSectionTitle).toBeInTheDocument();
  });

  test("Should show helper texts if validation failed", async () => {
    await submit();

    const mainInfoHelperText = screen.getAllByText(
      "At least one translation must have non-empty name and description"
    )[0];
    const imageUrlHelperText = screen.getByText("Please provide a valid URL");
    const priceHelperText = screen.getByText("Invalid price");
    const quantityHelperText = screen.getByText("Invalid quantity");

    expect(mainInfoHelperText).toBeInTheDocument();
    expect(imageUrlHelperText).toBeInTheDocument();
    expect(priceHelperText).toBeInTheDocument();
    expect(quantityHelperText).toBeInTheDocument();
  });

  test("Should call create function with filled values", async () => {
    await act(async () => fireEvent.click(statusInput));
    await selectCategory();
    await typeIntoInput(nameInput, "name");
    await typeIntoInput(descriptionInput, "example description");
    await typeIntoInput(imgUrlInput, "https://example.com");
    await userEvent.type(priceInput, "100");
    await userEvent.type(quantityInput, "100");

    await submit();

    expect(mockCreateProduct).toHaveBeenCalledWith(expectedBody);
  });
});
