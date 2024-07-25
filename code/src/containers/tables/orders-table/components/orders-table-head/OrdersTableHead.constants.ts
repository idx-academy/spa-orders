import { SortOrder } from "@/types/common";

export const initialSortOrder: Record<string, SortOrder> = {
  createdAt: "desc",
  total: "desc",
  orderStatus: "desc",
  isPaid: "desc"
};


export const sortKeyMap: Record<string, string> = {
  "ordersTable.columns.createdAt": "createdAt",
  "ordersTable.columns.totalPrice": "total",
  "ordersTable.columns.status": "orderStatus",
  "ordersTable.columns.isPaid": "isPaid"
};
