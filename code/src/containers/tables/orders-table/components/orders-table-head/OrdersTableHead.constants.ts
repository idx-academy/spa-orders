import { SortOrder } from "@/types/common";

export const initialSortOrder: Record<string, SortOrder> = {
  createdAt: "desc",
  total: "desc",
  orderStatus: "desc",
  isPaid: "desc"
};
