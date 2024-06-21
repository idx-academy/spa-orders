export type Status = "AVAILABLE";

export type Product = {
  id: string;
  name: string;
  description: string;
  status: Status;
  tags: string[];
  image: string;
  price: string;
};
