import { AdminOrder } from "@/types/order.types";

export const tableColumns = [
  "ordersTable.columns.receiver",
  "ordersTable.columns.status",
  "ordersTable.columns.createdAt",
  "ordersTable.columns.deliveryMethod",
  "ordersTable.columns.totalPrice",
  "ordersTable.columns.isPaid",
  "ordersTable.columns.details"
];

export const mockOrders: AdminOrder[] = [
  {
    id: "1",
    isPaid: true,
    orderStatus: "IN_PROGRESS",
    createdAt: "2024-06-27T12:35:14.396Z",
    receiver: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com"
    },
    postAddress: {
      deliveryMethod: "NOVA",
      city: "New York",
      department: "123"
    },
    orderItems: [],
    total: 0
  }
];
