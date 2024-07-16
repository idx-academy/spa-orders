import { act, renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import routes from "@/constants/routes";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useCreateOrderMutation } from "@/store/api/ordersApi";
import { OrderPostParams } from "@/types/order.types";

jest.mock("@/store/api/ordersApi");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

const mockCreateOrder = jest.fn();
const mockNavigate = jest.fn();
const mockOpenSnackbarWithTimeout = jest.fn();

const orderData: OrderPostParams = {
  userId: 123,
  firstName: "Doe",
  lastName: "Doe",
  email: "example@mail.com",
  deliveryMethod: "NOVA",
  city: "Lviv",
  department: "№1 Franka street, 7"
};

const setupWithMockCreateOrderReturnValue = async (returnValue: {
  error?: string;
  data?: Record<string, unknown>;
}) => {
  mockCreateOrder.mockResolvedValue(returnValue);

  const { result } = renderHook(() => useCreateOrder());

  await act(async () => {
    await result.current[0](orderData);
  });
};

describe("useCreateOrder", () => {
  beforeEach(() => {
    (useCreateOrderMutation as jest.Mock).mockReturnValue([
      mockCreateOrder,
      {}
    ]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSnackbar as jest.Mock).mockReturnValue({
      openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create order successfully and navigate to home", async () => {
    await setupWithMockCreateOrderReturnValue({ data: { id: 123 } });

    expect(mockCreateOrder).toHaveBeenCalledWith(orderData);
    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith({
      messageTranslationKey: "orders.create.success",
      variant: "success",
      autohideDuration: 5000
    });
    expect(mockNavigate).toHaveBeenCalledWith(routes.home.path, {
      replace: true
    });
  });

  test("should handle create order error without navigating", async () => {
    await setupWithMockCreateOrderReturnValue({ error: "Error" });

    expect(mockCreateOrder).toHaveBeenCalledWith(orderData);
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockOpenSnackbarWithTimeout).not.toHaveBeenCalled();
  });
});
