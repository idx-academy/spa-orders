import { z } from "zod";

const DeliveryMethod = z.enum(["NOVA", "UKRPOSHTA"]);

export const PostAddressValidationScheme = z.object({
  deliveryMethod: DeliveryMethod.default("NOVA"),
  city: z.string().min(1),
  department: z.string().min(1)
});
