import { fireEvent, render, screen } from "@testing-library/react";

import CartDrawerItem from "@/containers/cart-drawer/cart-drawer-item/CartDrawerItem";

const mockCartItem = {
  productId: "2",
  name: "Product 2",
  productPrice: 20,
  quantity: 1,
  image: "some image",
  calculatedPrice: 20
};

describe("Test CartDrawerItem", () => {
  test("Should render CartDrawerItem component", () => {
    render(<CartDrawerItem {...mockCartItem} onRemove={() => {}} />);

    const imageElement = screen.getByRole("img");
    const nameElement = screen.getByText(mockCartItem.name);
    const priceElement = screen.getByText(/\$20.00/);

    expect(imageElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test("Should call onRemove when remove button is clicked", () => {
    const onRemove = jest.fn();
    render(<CartDrawerItem {...mockCartItem} onRemove={onRemove} />);

    const removeButton = screen.getByTestId("remove-item-from-cart-button");
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(mockCartItem);
  });
});
