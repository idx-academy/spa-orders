import { act, fireEvent, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import CreateProductForm from "@/containers/forms/product-form/components/create-product-form/CreateProductForm";

import getTagIn from "@/utils/get-tag-in/getTagIn";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockCreateProduct = jest.fn(() => {});

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

describe("Test CreateProductForm", () => {
  beforeEach(() => {
    renderWithProviders(<CreateProductForm />);
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

  test("Should call create function with filled values", async () => {
    const imgUrlInput = getTagIn("product-form-image-input");
    const priceInput = getTagIn("product-form-price-input");
    const quantityInput = getTagIn("product-form-quantity-input");
    const categorySelect = screen.getByLabelText(
      "productForm.inputLabel.category"
    );
    const nameInput = getTagIn(`product-form-name-input`);
    const descriptionInput = getTagIn(
      `product-form-description-input`,
      "textarea"
    );
    const statusInput = getTagIn("product-form-status-checkbox");
    const submitButton = screen.getByText("productForm.create.submit");

    await act(async () => fireEvent.click(statusInput));

    await act(async () => fireEvent.mouseDown(categorySelect));
    const categoryOption = screen.getByText("productsAll.computer");
    await act(async () => fireEvent.click(categoryOption));

    await typeIntoInput(nameInput, "name");
    await typeIntoInput(descriptionInput, "example description");
    await typeIntoInput(imgUrlInput, "https://example.com");
    await userEvent.type(priceInput, "100");
    await userEvent.type(quantityInput, "100");

    await act(async () => fireEvent.click(submitButton));

    expect(mockCreateProduct).toHaveBeenCalledWith(expectedBody);
  });
});
