import { z } from "zod";

import { deliveryMethodValues } from "@/constants/deliveryMethods";

const DeliveryMethod = z.enum(deliveryMethodValues);

export const PostAddressValidationScheme = z.object({
  deliveryMethod: DeliveryMethod.default("NOVA"),
  city: z.string().min(1),
  department: z.string().min(1)
});
