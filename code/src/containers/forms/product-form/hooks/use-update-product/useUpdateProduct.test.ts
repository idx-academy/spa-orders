import { renderHook } from "@testing-library/react";

import useUpdateProduct from "@/containers/forms/product-form/hooks/use-update-product/useUpdateProduct";

const mockUnwrap = jest.fn();
const mockOpenSnackbarWithTimeout = jest.fn();
const mockUpdateProduct = jest.fn(() => ({ unwrap: mockUnwrap }));

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: () => ({
    openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
  })
}));

jest.mock("@/store/api/productsApi", () => ({
  useUpdateProductMutation: () => [mockUpdateProduct, {}]
}));

const successSnackbarConfig = {
  variant: "success",
  messageTranslationKey: "productForm.updation.success"
};

const errorSnackbarConfig = {
  variant: "error",
  messageTranslationKey: "productForm.updation.fail"
};

const testProductBody = { productId: "1" };

describe("Test useUpdateProduct hook", () => {
  test("Should return correct values", () => {
    const { result } = renderHook(() => useUpdateProduct());

    const [onSubmit, requestState] = result.current;

    expect(onSubmit).toBeTruthy();
    expect(requestState).toBeTruthy();
  });

  test("Should call update function with right parameters", () => {
    const { result } = renderHook(() => useUpdateProduct());

    const [onSubmit] = result.current;

    onSubmit(testProductBody);

    expect(mockUpdateProduct).toHaveBeenCalledWith(testProductBody);
  });

  test("Should call openSnackbarWithTimeout with success message and redirect if success", async () => {
    const { result } = renderHook(() => useUpdateProduct());

    const [onSubmit] = result.current;

    await onSubmit(testProductBody);

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      successSnackbarConfig
    );
  });

  test("Should call openSnackbarWithTimeout with error message if error", async () => {
    mockUnwrap.mockImplementationOnce(() => {
      throw new Error("Error");
    });

    const { result } = renderHook(() => useUpdateProduct());

    const [onSubmit] = result.current;

    await onSubmit(testProductBody);

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      errorSnackbarConfig
    );
  });
});
