import z from "zod";

export const checkOutSchema = z.object({
  details: z.string().nonempty("Street Adrees Is Required"),
  phone: z
    .string()
    .nonempty("Telephone Number Is Required")
    .regex(/^(01)[0125][0-9]{8}$/, "Egyptain Phone Is Invalid"),
  city: z.string().nonempty("City Is Required"),
});

export type shippingInfoValues = z.infer<typeof checkOutSchema>;
