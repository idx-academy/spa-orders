type DeliveryMethod = "NOVA" | "UKRPOSHTA";

export type Receiver = {
  firstName: string;
  lastName: string;
  email: string;
};

export type PostAddress = {
  deliveryMethod: DeliveryMethod;
  city: string;
  department: string;
};
