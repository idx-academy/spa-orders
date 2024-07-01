import { render, screen } from "@testing-library/react";
import { item } from "@/layouts/order-item/OrderItem.constants";
import OrdersList from "./OrdersList";
import { orderStatuses } from "@/constants/orderStatuses";

describe("Test OrdersList", () => {
  test("Should render orders list", () => {
    render(<OrdersList />);

    const emailElements = screen.getAllByText(
      orderStatuses[item.content[0].orderStatus]
    );

    expect(emailElements).toHaveLength(item.content.length);
  });
});
