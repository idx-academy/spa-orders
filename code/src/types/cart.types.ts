export type CartManagementParams = {
  productId: string;
  userId: number;
};

export type CartItem = {
  productId: string;
  image: string;
  name: string;
  productPrice: number;
  quantity: number;
  calculatedPrice: number;
};
