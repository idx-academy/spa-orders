import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import DeliveryForm from "@/containers/forms/delivery-form/DeliveryForm";

import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/hooks/use-create-order/useCreateOrder", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/hooks/use-get-user-details/useGetUserDetails", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockCreateOrder = jest.fn();
const mockUserDetails = {
  id: 123,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com"
};

describe("DeliveryForm", () => {
  beforeEach(() => {
    (useCreateOrder as jest.Mock).mockReturnValue([
      mockCreateOrder,
      { isLoading: false }
    ]);
    (useGetUserDetails as jest.Mock).mockReturnValue(mockUserDetails);
    renderWithProviders(<DeliveryForm totalPrice={100} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the delivery form correctly", () => {
    const cityInput = screen.getByLabelText(/deliveryForm.city/);
    const departmentInput = screen.getByLabelText(/deliveryForm.department/);

    const submitButton = screen.getByRole("button");

    expect(cityInput).toBeInTheDocument();
    expect(departmentInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  test("select has the correct className from inputProps", () => {
    const select = screen.getByRole("combobox");

    expect(select).toHaveClass(
      "delivery-form__method-select-input"
    );
  });
  test("handles input changes and form submission", async () => {
    const cityInput = screen.getByLabelText(/deliveryForm.city/);
    const departmentInput = screen.getByLabelText(/deliveryForm.department/);

    const submitButton = screen.getByRole("button");

    await act(() => {
      fireEvent.change(cityInput, { target: { value: "New York" } });
      fireEvent.change(departmentInput, { target: { value: "123" } });
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateOrder).toHaveBeenCalledWith({
        city: "New York",
        deliveryMethod: "NOVA",
        department: "123",
        email: mockUserDetails.email,
        firstName: mockUserDetails.firstName,
        lastName: mockUserDetails.lastName,
        userId: mockUserDetails.id
      });
    });
  });
});
