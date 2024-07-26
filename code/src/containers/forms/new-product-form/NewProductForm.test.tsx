import { act, fireEvent, screen } from "@testing-library/react";

import NewProductForm from "@/containers/forms/new-product-form/NewProductForm";
import { defaultValues } from "@/containers/forms/new-product-form/NewProductForm.constants";

import routes from "@/constants/routes";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockUnwrap = jest.fn();

const mockCreateProductMutation = jest.fn(() => ({ unwrap: mockUnwrap }));
const mockShowSnackbar = jest.fn();
const mockNavigate = jest.fn();

jest.mock("@/store/api/productsApi", () => ({
  useCreateProductMutation: () => [
    mockCreateProductMutation,
    { isLoading: false }
  ]
}));

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: () => ({ openSnackbarWithTimeout: mockShowSnackbar })
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

const testData = {
  status: "HIDDEN",
  image: "https://example.com",
  quantity: 10,
  price: 100,
  tagIds: [3],
  productTranslations: [
    {
      name: "name",
      description: "description-description",
      languageCode: "en"
    }
  ]
};

const twoTranslationsTestData = {
  ...testData,
  productTranslations: [
    testData.productTranslations[0],
    { ...testData.productTranslations[0], languageCode: "uk" }
  ]
};

const getTagIn = <T extends keyof HTMLElementTagNameMap = "input">(
  testId: string,
  tag: T = "input" as T
) => {
  return screen
    .getByTestId(testId)
    .querySelector(tag)! as unknown as HTMLElementTagNameMap[T];
};

let imgUrlInput: HTMLInputElement;
let priceInput: HTMLInputElement;
let quantityInput: HTMLInputElement;
let categorySelect: HTMLSpanElement;
let nameInput: HTMLInputElement;
let descriptionInput: HTMLTextAreaElement;
let submitButton: HTMLButtonElement;
let statusInput: HTMLInputElement;

const render = () => {
  const result = renderWithProviders(<NewProductForm />);

  imgUrlInput = getTagIn("new-product-image-input");
  priceInput = getTagIn("new-product-price-input");
  quantityInput = getTagIn("new-product-quantity-input");
  categorySelect = screen.getByLabelText("productForm.inputLabel.category");
  nameInput = getTagIn(`new-product-name-input-en`);
  descriptionInput = getTagIn(`new-product-description-input-en`, "textarea");
  statusInput = getTagIn("new-product-status-checkbox");
  submitButton = screen.getByText("productForm.submit");

  return result;
};

const fillInTestData = async () => {
  await typeIntoInput(imgUrlInput, testData.image);
  await typeIntoInput(priceInput, testData.price);
  await typeIntoInput(quantityInput, testData.quantity);
  await typeIntoInput(nameInput, testData.productTranslations[0].name);
  await typeIntoInput(
    descriptionInput,
    testData.productTranslations[0].description
  );
};

const submit = async () => {
  await act(async () => {
    fireEvent.click(submitButton);
  });
};

const selectCategory = async () => {
  await act(async () => {
    fireEvent.mouseDown(categorySelect);
  });

  const categoryOption = screen.getByText("productsAll.computer");

  await act(async () => {
    fireEvent.click(categoryOption);
  });
};

const baseSteps = async () => {
  await fillInTestData();
  await selectCategory();
  await submit();
};

describe("Test NewProductForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be rendered correctly", () => {
    render();

    const imageSectionTitle = screen.getByText(
      "productForm.section.image.title"
    );
    const mainInforEnSectionTitle = screen.getByText(
      "productForm.section.mainInformation.title.en"
    );
    const mainInfoUkSectionTitle = screen.getByText(
      "productForm.section.mainInformation.title.uk"
    );
    const additionalInfoSectionTitle = screen.getByText(
      "productForm.section.additionalInformation.title"
    );

    expect(imageSectionTitle).toBeInTheDocument();
    expect(mainInforEnSectionTitle).toBeInTheDocument();
    expect(mainInfoUkSectionTitle).toBeInTheDocument();
    expect(additionalInfoSectionTitle).toBeInTheDocument();

    expect(priceInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    expect(imgUrlInput).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();

    defaultValues.productTranslations.forEach((item) => {
      const nameInput = screen.getByTestId(
        `new-product-name-input-${item.languageCode}`
      );
      const descriptionInput = screen.getByTestId(
        `new-product-description-input-${item.languageCode}`
      );

      expect(nameInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
    });

    expect(mockShowSnackbar).not.toHaveBeenCalled();
  });

  test("Should have proper styles and attributes by default", () => {
    const { container } = render();

    const selectInput = container.getElementsByClassName(
      "product-form__category-select"
    )[0];

    expect(selectInput).toBeInTheDocument();
    expect(descriptionInput).toHaveClass("product-form__description-input");

    expect(priceInput).toHaveAttribute("min", "0");
    expect(quantityInput).toHaveAttribute("min", "0");

    expect(nameInput.closest(".Mui-error")).toBeFalsy();
    expect(descriptionInput.closest(".Mui-error")).toBeFalsy();
    expect(imgUrlInput.closest(".Mui-error")).toBeFalsy();
    expect(priceInput.closest(".Mui-error")).toBeFalsy();
    expect(quantityInput.closest(".Mui-error")).toBeFalsy();
  });

  test("Should show helper texts and have propriate styles if validation failed", async () => {
    render();

    await typeIntoInput(nameInput, "a");
    await typeIntoInput(descriptionInput, "a");

    await submit();

    const nameHelperText = screen.getByText("Name is too short");
    const descriptionHelperText = screen.getByText("Description is too short");
    const imageUrlHelperText = screen.getByText("Please provide a valid URL");
    const priceHelperText = screen.getByText("Invalid price");
    const quantityHelperText = screen.getByText("Invalid quantity");
    const tagHelperText = screen.getByText("Select at least one tag");

    expect(nameHelperText).toBeInTheDocument();
    expect(descriptionHelperText).toBeInTheDocument();
    expect(imageUrlHelperText).toBeInTheDocument();
    expect(priceHelperText).toBeInTheDocument();
    expect(quantityHelperText).toBeInTheDocument();
    expect(tagHelperText).toBeInTheDocument();

    expect(nameInput.closest(".Mui-error")).toBeTruthy();
    expect(descriptionInput.closest(".Mui-error")).toBeTruthy();
    expect(imgUrlInput.closest(".Mui-error")).toBeTruthy();
    expect(priceInput.closest(".Mui-error")).toBeTruthy();
    expect(quantityInput.closest(".Mui-error")).toBeTruthy();
  });

  test("Should display message to fill in at least one translation, if none was filled", async () => {
    render();

    await typeIntoInput(imgUrlInput, testData.image);
    await typeIntoInput(priceInput, testData.price);
    await typeIntoInput(quantityInput, testData.quantity);

    await selectCategory();
    await submit();

    expect(mockShowSnackbar).toHaveBeenCalledWith({
      variant: "error",
      messageTranslationKey: "productForm.creation.translationError"
    });
  });

  test("Should show success message, redirect and send request if validation was passed", async () => {
    render();

    await baseSteps();

    expect(mockCreateProductMutation).toHaveBeenCalledWith(testData);
    expect(mockShowSnackbar).toHaveBeenCalledWith({
      variant: "success",
      messageTranslationKey: "productForm.creation.success"
    });
    expect(mockNavigate).toHaveBeenCalledWith(routes.dashboard.products.path);
  });

  test("Should change product status and send request with selected status", async () => {
    render();

    await act(async () => {
      fireEvent.click(statusInput);
    });

    await baseSteps();

    expect(mockCreateProductMutation).toHaveBeenCalledWith({
      ...testData,
      status: "VISIBLE"
    });
    expect(mockShowSnackbar).toHaveBeenCalledWith({
      variant: "success",
      messageTranslationKey: "productForm.creation.success"
    });
    expect(mockNavigate).toHaveBeenCalledWith(routes.dashboard.products.path);
  });

  test("Should send request with 2 translations if it was added by user", async () => {
    render();

    await fillInTestData();
    await selectCategory();

    const nameInputUk = getTagIn("new-product-name-input-uk");
    const descriptionInputUk = getTagIn(
      "new-product-description-input-uk",
      "textarea"
    );

    await typeIntoInput(nameInputUk, testData.productTranslations[0].name);
    await typeIntoInput(
      descriptionInputUk,
      testData.productTranslations[0].description
    );

    await submit();

    expect(mockCreateProductMutation).toHaveBeenCalledWith(
      twoTranslationsTestData
    );
  });

  test("Should show default error if the request error is not related to validation", async () => {
    mockUnwrap.mockImplementation(() => {
      throw { status: 500 };
    });

    render();

    await baseSteps();

    expect(mockShowSnackbar).toHaveBeenCalledWith({
      variant: "error",
      messageTranslationKey: "productForm.creation.fail"
    });
  });

  test("Should show validation error if the request error is related to validation", async () => {
    mockUnwrap.mockImplementation(() => {
      throw { status: 400 };
    });

    render();

    await baseSteps();

    expect(mockShowSnackbar).toHaveBeenCalledWith({
      variant: "error",
      messageTranslationKey: "productForm.creation.validationError"
    });
  });
});
