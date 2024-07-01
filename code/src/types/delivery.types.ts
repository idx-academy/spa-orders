type DeliveryMethod = "NOVA" | "UKRPOSHTA";

export type PostAddress = {
  deliveryMethod: DeliveryMethod;
  city: string;
  department: string;
};
