import { fireEvent, screen } from "@testing-library/react";

import CartItem from "@/pages/cart/components/cart-item/CartItem";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockedItem = {
  productId: "8efbee82-8a0c-407a-a4c0-16bbad40a23e",
  image:
    "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_2-tTDYhyoyqsEkwPzySFdXflYCe7TkUb.jpg",
  name: "Iphone",
  productPrice: 100.45,
  quantity: 2,
  calculatedPrice: 200.9
};

const mockOnRemove = jest.fn();

describe("CartItem", () => {
  beforeEach(() => {
    renderWithProviders(<CartItem item={mockedItem} onRemove={mockOnRemove} />);
  });

  test("should render the CartItem component with correct data", () => {
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", mockedItem.image);

    const nameElement = screen.getByText(mockedItem.name);
    expect(nameElement).toBeInTheDocument();

    const quantityInputElement = screen.getByDisplayValue(
      mockedItem.quantity.toString()
    );
    expect(quantityInputElement).toBeInTheDocument();

    const removeIconElement = screen.getByTestId("RemoveCircleOutlineIcon");
    expect(removeIconElement).toBeInTheDocument();

    const addIconElement = screen.getByTestId("AddCircleOutlineIcon");
    expect(addIconElement).toBeInTheDocument();

    const deleteIconElement = screen.getByTestId("DeleteIcon");
    expect(deleteIconElement).toBeInTheDocument();
  });

  test("should remove item after click on button", () => {
    const deleteicon = screen.getByTestId("DeleteIcon");
    fireEvent.click(deleteicon);
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
