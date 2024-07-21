import { z } from "zod";

import { deliveryMethodValues } from "@/constants/deliveryMethods";

const DeliveryMethod = z.enum(deliveryMethodValues);

export const PostAddressValidationScheme = z.object({
  deliveryMethod: DeliveryMethod.default(deliveryMethodValues[0]),
  city: z.string().min(1),
  department: z.string().min(1)
});
