import { CartItem } from "@/types/cart.types";
import calculateCartItemsCounter from "@/utils/calculate-cart-items-counter/calculateCartItemsCounter";

const generateCart = (length: number, increaseQuantity: boolean = false) => {
  return Array.from({ length }, (_, i) => ({
    quantity: increaseQuantity ? i + 1 : 1
  })) as unknown as CartItem[];
};

const testData = [
  { cart: generateCart(0), expected: 0 },
  { cart: generateCart(3, true), expected: 6 },
  { cart: generateCart(99), expected: 99 },
  { cart: generateCart(150), expected: "99+" }
];

describe("Test CalculateCartItemsCounter", () => {
  test.each(testData)(
    "Should return $expected when there is $cart.length items in the cart with different quantities",
    ({ cart, expected }) => {
      const result = calculateCartItemsCounter(cart);
      expect(result).toBe(expected);
    }
  );
});
